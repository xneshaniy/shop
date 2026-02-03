<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function home(): Response
    {
        $featured = Product::where('featured', true)->latest()->take(8)->get();
        $bestSelling = Product::where('best_selling', true)->latest()->take(8)->get();
        $newArrivals = Product::where('new_arrival', true)->latest()->take(8)->get();
        $categories = Category::where('is_active', true)->orderBy('name')->take(8)->get();

        return Inertia::render('website/home', [
            'featured' => $featured,
            'bestSelling' => $bestSelling,
            'newArrivals' => $newArrivals,
            'categories' => $categories,
        ]);
    }

    public function products(Request $request): Response
    {
        $query = Product::query()->with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->string('category'));
            });
        }
        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }
        if ($request->boolean('best_selling')) {
            $query->where('best_selling', true);
        }
        if ($request->boolean('new_arrival')) {
            $query->where('new_arrival', true);
        }
        if ($request->filled('price_min')) {
            $query->where('selling_price', '>=', (float) $request->input('price_min'));
        }
        if ($request->filled('price_max')) {
            $query->where('selling_price', '<=', (float) $request->input('price_max'));
        }

        $products = $query->latest()->paginate(24)->withQueryString();
        $categories = Category::where('is_active', true)->orderBy('name')->get(['id','name','slug']);

        return Inertia::render('website/products/index', [
            'products' => $products,
            'filters' => $request->only(['category','featured','best_selling','new_arrival','price_min','price_max']),
            'categories' => $categories,
        ]);
    }

    public function showProduct(string $slug): Response
    {
        $product = Product::with(['images' => function($q){ $q->orderBy('sort_order'); },'category','reviews' => function($q){ $q->where('is_approved', true)->orderByDesc('id'); }])->where('slug', $slug)->firstOrFail();
        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('website/products/show', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}


