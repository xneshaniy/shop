<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function toggle(Request $request, Product $product): RedirectResponse
    {
        $user = $request->user();
        if (! $user) {
            return back()->with('error', 'Please log in to use wishlist');
        }

        $existing = Wishlist::where('user_id', $user->id)->where('product_id', $product->id)->first();
        if ($existing) {
            $existing->delete();
            return back()->with('success', 'Removed from wishlist');
        }

        Wishlist::create(['user_id' => $user->id, 'product_id' => $product->id]);
        return back()->with('success', 'Added to wishlist');
    }
}


