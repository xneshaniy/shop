<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function startJazzCash(Order $order): RedirectResponse
    {
        $gateway = new \App\Services\Payments\JazzCashGateway();
        Payment::create([
            'order_id' => $order->id,
            'provider' => $gateway->provider(),
            'status' => 'initiated',
            'amount' => $order->total,
            'payload' => null,
        ]);
        return redirect()->away($gateway->start($order));
    }

    public function callbackJazzCash(Request $request)
    {
        $order = Order::findOrFail($request->integer('order'));
        $gateway = new \App\Services\Payments\JazzCashGateway();
        if ($gateway->verify($request)) {
            $order->update(['payment_status' => 'paid', 'status' => 'Processing']);
            $order->payments()->create([
                'provider' => $gateway->provider(),
                'status' => 'paid',
                'amount' => $order->total,
                'payload' => $request->all(),
            ]);
        } else {
            Log::warning('JazzCash payment failed', ['order_id' => $order->id, 'qs' => $request->all()]);
        }
        return redirect()->route('orders.thankyou', $order);
    }

    public function startEasyPaisa(Order $order): RedirectResponse
    {
        $gateway = new \App\Services\Payments\EasyPaisaGateway();
        Payment::create([
            'order_id' => $order->id,
            'provider' => $gateway->provider(),
            'status' => 'initiated',
            'amount' => $order->total,
            'payload' => null,
        ]);
        return redirect()->away($gateway->start($order));
    }

    public function callbackEasyPaisa(Request $request)
    {
        $order = Order::findOrFail($request->integer('order'));
        $gateway = new \App\Services\Payments\EasyPaisaGateway();
        if ($gateway->verify($request)) {
            $order->update(['payment_status' => 'paid', 'status' => 'Processing']);
            $order->payments()->create([
                'provider' => $gateway->provider(),
                'status' => 'paid',
                'amount' => $order->total,
                'payload' => $request->all(),
            ]);
        } else {
            Log::warning('EasyPaisa payment failed', ['order_id' => $order->id, 'qs' => $request->all()]);
        }
        return redirect()->route('orders.thankyou', $order);
    }
}


