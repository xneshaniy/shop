<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string'],
        ]);

        Review::create([
            'user_id' => $request->user()->id ?? null,
            'product_id' => $product->id,
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
            'is_approved' => true,
        ]);

        return back()->with('success', 'Review submitted');
    }

    public function indexAdmin()
    {
        $reviews = Review::with('product', 'user')->orderByDesc('id')->paginate(30)->withQueryString();
        $breakdown = Review::selectRaw('rating, COUNT(*) as c')->groupBy('rating')->pluck('c', 'rating');
        return \Inertia\Inertia::render('admin/reviews/index', [ 'reviews' => $reviews, 'breakdown' => $breakdown ]);
    }

    public function toggleApproval(Review $review): RedirectResponse
    {
        $review->update(['is_approved' => ! $review->is_approved]);
        return back()->with('success', 'Review updated');
    }

    public function flag(Request $request, Review $review): RedirectResponse
    {
        $data = $request->validate([
            'reason' => ['nullable', 'string', 'max:255'],
        ]);
        $review->update(['is_flagged' => true, 'flag_reason' => $data['reason'] ?? null]);
        return back()->with('success', 'Review flagged');
    }

    public function reply(Request $request, Review $review): RedirectResponse
    {
        $data = $request->validate([
            'comment' => ['required', 'string'],
        ]);
        Review::create([
            'user_id' => $request->user()->id ?? null,
            'product_id' => $review->product_id,
            'rating' => 5,
            'comment' => $data['comment'],
            'is_approved' => true,
            'parent_id' => $review->id,
        ]);
        return back()->with('success', 'Reply posted');
    }
}


