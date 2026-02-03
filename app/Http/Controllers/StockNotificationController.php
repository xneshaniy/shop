<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StockNotificationController extends Controller
{
    public function subscribe(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'email' => ['required_without:user', 'email'],
        ]);

        $email = $data['email'] ?? $request->user()?->email;
        if (! $email) {
            return back()->with('error', 'Email required');
        }

        StockNotification::firstOrCreate([
            'product_id' => $product->id,
            'email' => $email,
        ], [
            'user_id' => $request->user()?->id,
        ]);

        return back()->with('success', 'We will notify you when available');
    }
}


