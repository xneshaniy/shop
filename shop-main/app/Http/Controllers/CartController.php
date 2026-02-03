<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = $request->session()->get('cart', []);
        return Inertia::render('cart/index', [
            'cart' => $cart,
        ]);
    }

    public function add(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);
        $quantity = $data['quantity'] ?? 1;
        $cart = $request->session()->get('cart', []);
        $existing = $cart[$product->id] ?? null;
        $newQty = ($existing['quantity'] ?? 0) + $quantity;
        $cart[$product->id] = [
            'product_id' => $product->id,
            'name' => $product->name,
            'price' => (float) $product->selling_price,
            'quantity' => $newQty,
            'thumbnail' => $product->thumbnail_path,
        ];
        $request->session()->put('cart', $cart);
        return back()->with('success', 'Added to cart');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] = $data['quantity'];
            $request->session()->put('cart', $cart);
        }
        return back()->with('success', 'Cart updated');
    }

    public function remove(Request $request, Product $product): RedirectResponse
    {
        $cart = $request->session()->get('cart', []);
        unset($cart[$product->id]);
        $request->session()->put('cart', $cart);
        return back()->with('success', 'Item removed');
    }

    public function applyCoupon(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string'],
        ]);
        $coupon = Coupon::where('code', $data['code'])
            ->where('is_active', true)
            ->where(function ($q) {
                $now = now();
                $q->whereNull('starts_at')->orWhere('starts_at', '<=', $now);
            })
            ->where(function ($q) {
                $now = now();
                $q->whereNull('expires_at')->orWhere('expires_at', '>=', $now);
            })
            ->first();

        if (! $coupon) {
            return back()->with('error', 'Invalid coupon');
        }

        $request->session()->put('coupon', $coupon->only(['code', 'type', 'value', 'min_order_amount']));
        return back()->with('success', 'Coupon applied');
    }
}


