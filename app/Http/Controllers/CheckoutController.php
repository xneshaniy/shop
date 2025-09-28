<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\UserAddress;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);
        $coupon = $request->session()->get('coupon');
        $addresses = $request->user() ? UserAddress::where('user_id', $request->user()->id)->orderByDesc('is_default')->get() : [];
        return Inertia::render('checkout/index', [
            'cart' => $cart,
            'coupon' => $coupon,
            'addresses' => $addresses,
        ]);
    }

    public function placeOrder(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:50'],
            'customer_email' => ['nullable', 'email'],
            'shipping_address_line1' => ['required', 'string', 'max:255'],
            'shipping_address_line2' => ['nullable', 'string', 'max:255'],
            'shipping_city' => ['required', 'string', 'max:100'],
            'shipping_state' => ['nullable', 'string', 'max:100'],
            'shipping_postal_code' => ['nullable', 'string', 'max:20'],
            'shipping_country' => ['nullable', 'string', 'max:100'],
            'payment_method' => ['required', 'in:cod,jazzcash,easypaisa'],
        ]);

        $cart = $request->session()->get('cart', []);
        if (empty($cart)) {
            return back()->with('error', 'Cart is empty');
        }

        $subtotal = 0;
        foreach ($cart as $line) {
            $subtotal += $line['price'] * $line['quantity'];
        }

        $discount = 0;
        $couponData = $request->session()->get('coupon');
        $couponCode = null;
        if ($couponData) {
            if (($couponData['min_order_amount'] ?? 0) <= $subtotal) {
                if ($couponData['type'] === 'percentage') {
                    $discount = round($subtotal * ((float) $couponData['value'] / 100), 2);
                } else {
                    $discount = min($subtotal, (float) $couponData['value']);
                }
                $couponCode = $couponData['code'];
            }
        }

        // Compute shipping based on city and total using shipping zones
        $shipping = 0;
        $destCity = (string) ($data['shipping_city'] ?? '');
        $zone = \App\Models\ShippingZone::query()
            ->whereJsonContains('cities', $destCity)
            ->with('rates')
            ->first();
        if ($zone) {
            $rate = $zone->rates
                ->first(function ($r) use ($subtotal) {
                    $minOk = $subtotal >= (float) $r->min_total;
                    $maxOk = is_null($r->max_total) || $subtotal <= (float) $r->max_total;
                    return $minOk && $maxOk;
                });
            if ($rate) {
                if ($rate->free_threshold && $subtotal >= (float) $rate->free_threshold) {
                    $shipping = 0;
                } else {
                    $shipping = (float) $rate->rate;
                }
                // Enforce COD availability
                if ($data['payment_method'] === 'cod' && ! $rate->cod_allowed) {
                    return back()->with('error', 'Cash on Delivery not available for your area');
                }
            }
        }
        $total = max(0, $subtotal - $discount + $shipping);

        $order = Order::create([
            'user_id' => $request->user()->id ?? null,
            'order_number' => strtoupper(Str::random(10)),
            'status' => 'Pending',
            'subtotal' => $subtotal,
            'discount' => $discount,
            'shipping' => $shipping,
            'total' => $total,
            'payment_method' => $data['payment_method'],
            'payment_status' => $data['payment_method'] === 'cod' ? 'unpaid' : 'pending',
            'coupon_code' => $couponCode,
            'customer_name' => $data['customer_name'],
            'customer_phone' => $data['customer_phone'],
            'customer_email' => $data['customer_email'] ?? null,
            'shipping_address_line1' => $data['shipping_address_line1'],
            'shipping_address_line2' => $data['shipping_address_line2'] ?? null,
            'shipping_city' => $data['shipping_city'],
            'shipping_state' => $data['shipping_state'] ?? null,
            'shipping_postal_code' => $data['shipping_postal_code'] ?? null,
            'shipping_country' => $data['shipping_country'] ?? 'Pakistan',
        ]);

        foreach ($cart as $productId => $line) {
            /** @var Product $product */
            $product = Product::find($productId);
            if (! $product) { continue; }
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'unit_price' => (float) $product->selling_price,
                'cost_price' => (float) $product->cost_price,
                'quantity' => (int) $line['quantity'],
                'line_total' => (float) $product->selling_price * (int) $line['quantity'],
            ]);
            // decrement stock
            $product->decrement('stock_quantity', (int) $line['quantity']);
        }

        // Initialize payment record (for non-COD, integrate provider later)
        Payment::create([
            'order_id' => $order->id,
            'provider' => $data['payment_method'],
            'status' => $data['payment_method'] === 'cod' ? 'pending' : 'initiated',
            'amount' => $total,
            'payload' => null,
        ]);

        // Clear cart
        $request->session()->forget(['cart', 'coupon']);

        return redirect()->route('orders.thankyou', $order)->with('success', 'Order placed');
    }

    public function thankyou(Order $order): Response
    {
        $order->load('items');
        return Inertia::render('checkout/thankyou', [
            'order' => $order,
        ]);
    }
}


