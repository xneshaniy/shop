<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;

class EasyPaisaGateway implements PaymentGatewayInterface
{
    public function start(Order $order): string
    {
        return url('/payment/easypaisa/callback?order='.$order->id.'&success=1');
    }

    public function verify(Request $request): bool
    {
        return (string) $request->query('success', '0') === '1';
    }

    public function provider(): string
    {
        return 'easypaisa';
    }
}


