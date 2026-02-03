<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;

class JazzCashGateway implements PaymentGatewayInterface
{
    public function start(Order $order): string
    {
        return url('/payment/jazzcash/callback?order='.$order->id.'&success=1');
    }

    public function verify(Request $request): bool
    {
        return (string) $request->query('success', '0') === '1';
    }

    public function provider(): string
    {
        return 'jazzcash';
    }
}


