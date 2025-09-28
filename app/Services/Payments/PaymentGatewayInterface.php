<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;

interface PaymentGatewayInterface
{
    public function start(Order $order): string; // return redirect URL

    public function verify(Request $request): bool; // synchronous verify after redirect/callback

    public function provider(): string; // identifier
}


