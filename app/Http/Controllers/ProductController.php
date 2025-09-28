<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query()->with('category');

        // Text search by name or slug
        if ($request->filled('q')) {
            $q = (string) $request->query('q');
            $query->where(function ($qq) use ($q) {
                $qq->where('name', 'like', "%$q%")
                    ->orWhere('slug', 'like', "%$q%");
            });
        }

        // Category filter by slug or id
        if ($request->filled('category')) {
            $cat = (string) $request->query('category');
            $query->whereHas('category', function ($cq) use ($cat) {
                $cq->where('slug', $cat)->orWhere('id', $cat);
            });
        }

        // Flags
        foreach (['featured', 'best_selling', 'new_arrival'] as $flag) {
            if ($request->boolean($flag)) {
                $query->where($flag, true);
            }
        }

        // Stock status
        if ($request->filled('stock')) {
            $stock = (string) $request->query('stock');
            if ($stock === 'in') { $query->where('stock_quantity', '>', 0); }
            if ($stock === 'out') { $query->where('stock_quantity', '<=', 0); }
        }

        // Price range
        if ($request->filled('price_min')) {
            $query->where('selling_price', '>=', (float) $request->query('price_min'));
        }
        if ($request->filled('price_max')) {
            $query->where('selling_price', '<=', (float) $request->query('price_max'));
        }

        // Sorting
        $sort = (string) $request->query('sort', 'latest');
        match ($sort) {
            'price_asc' => $query->orderBy('selling_price', 'asc'),
            'price_desc' => $query->orderBy('selling_price', 'desc'),
            'stock_desc' => $query->orderBy('stock_quantity', 'desc'),
            default => $query->latest(),
        };

        $products = $query->paginate(20)->withQueryString();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => \App\Models\Category::orderBy('name')->get(['id','name','slug']),
            'filters' => $request->only(['q','category','featured','best_selling','new_arrival','stock','price_min','price_max','sort']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'description' => ['nullable', 'string'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'featured' => ['boolean'],
            'best_selling' => ['boolean'],
            'new_arrival' => ['boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image'],
            'images.*' => ['nullable', 'image'],
            'images_alt.*' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $request->file('thumbnail')->store('products/thumbnails', 'public');
        }

        $product = Product::create($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products/gallery', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'alt_text' => $request->input("images_alt.$index"),
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created');
    }

    public function edit(Product $product): Response
    {
        $product->load('images');

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug,' . $product->id],
            'description' => ['nullable', 'string'],
            'cost_price' => ['nullable', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'featured' => ['boolean'],
            'best_selling' => ['boolean'],
            'new_arrival' => ['boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image'],
            'images.*' => ['nullable', 'image'],
            'images_alt.*' => ['nullable', 'string', 'max:255'],
            'delete_image_ids' => ['array'],
            'reorder' => ['array'],
            'reorder.*.id' => ['integer'],
            'reorder.*.sort_order' => ['integer'],
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($product->thumbnail_path) {
                Storage::disk('public')->delete($product->thumbnail_path);
            }
            $data['thumbnail_path'] = $request->file('thumbnail')->store('products/thumbnails', 'public');
        }

        $product->update($data);

        if ($request->filled('delete_image_ids')) {
            $images = ProductImage::whereIn('id', $request->input('delete_image_ids'))
                ->where('product_id', $product->id)
                ->get();
            foreach ($images as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }
        }

        // Apply sort order updates for existing images
        if ($request->filled('reorder')) {
            foreach ($request->input('reorder') as $row) {
                if (! isset($row['id'])) { continue; }
                \App\Models\ProductImage::where('product_id', $product->id)
                    ->where('id', (int) $row['id'])
                    ->update(['sort_order' => (int) ($row['sort_order'] ?? 0)]);
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products/gallery', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $path,
                    'alt_text' => $request->input("images_alt.$index"),
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->thumbnail_path) {
            Storage::disk('public')->delete($product->thumbnail_path);
        }
        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->image_path);
        }
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted');
    }

    public function bulk(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:products,id'],
            'action' => ['required', 'in:delete,set_featured,set_best_selling,set_new_arrival,unset_featured,unset_best_selling,unset_new_arrival'],
        ]);

        $ids = $data['ids'];
        $action = $data['action'];

        if ($action === 'delete') {
            Product::whereIn('id', $ids)->delete();
        } elseif (str_starts_with($action, 'set_')) {
            $field = str_replace('set_', '', $action);
            Product::whereIn('id', $ids)->update([$field => true]);
        } elseif (str_starts_with($action, 'unset_')) {
            $field = str_replace('unset_', '', $action);
            Product::whereIn('id', $ids)->update([$field => false]);
        }

        return back()->with('success', 'Bulk action applied');
    }
}


