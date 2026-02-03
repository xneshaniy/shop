<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\StoreController::class, 'home'])->name('home');
// Storefront
Route::get('/products', [App\Http\Controllers\StoreController::class, 'products'])->name('store.products');
Route::get('/products/{slug}', [App\Http\Controllers\StoreController::class, 'showProduct'])->name('store.products.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // Admin: Products, Categories, Coupons, Orders, Settings
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('products', App\Http\Controllers\ProductController::class);
        Route::post('products-bulk', [App\Http\Controllers\ProductController::class, 'bulk'])->name('products.bulk');
        Route::get('products-export', function () {
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename=products.csv',
            ];
            $rows = \App\Models\Product::select('id','name','slug','selling_price','stock_quantity','featured','best_selling','new_arrival')->orderBy('id')->cursor();
            $callback = function () use ($rows) {
                $out = fopen('php://output', 'w');
                fputcsv($out, ['ID','Name','Slug','Price','Stock','Featured','Best Selling','New Arrival']);
                foreach ($rows as $p) {
                    fputcsv($out, [$p->id, $p->name, $p->slug, $p->selling_price, $p->stock_quantity, $p->featured ? '1' : '0', $p->best_selling ? '1' : '0', $p->new_arrival ? '1' : '0']);
                }
                fclose($out);
            };
            return response()->stream($callback, 200, $headers);
        })->name('admin.products.export');
        Route::resource('categories', App\Http\Controllers\CategoryController::class);
        Route::resource('coupons', App\Http\Controllers\CouponController::class)->except(['show']);
        Route::get('users', [App\Http\Controllers\UsersController::class, 'index'])->name('users.index');
        Route::post('users/{user}/toggle', [App\Http\Controllers\UsersController::class, 'toggleBlock'])->name('users.toggle');
        Route::get('orders', [App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
        Route::get('orders/{order}', [App\Http\Controllers\OrderController::class, 'show'])->name('orders.show');
        Route::post('orders/{order}/status', [App\Http\Controllers\OrderController::class, 'updateStatus'])->name('orders.status');
        Route::get('orders/{order}/invoice', [App\Http\Controllers\OrderController::class, 'invoice'])->name('orders.invoice');
        Route::get('payments', [App\Http\Controllers\PaymentsAdminController::class, 'index'])->name('payments.index');
        Route::get('settings', [App\Http\Controllers\SettingController::class, 'edit'])->name('settings.edit');
        Route::post('settings', [App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');

        // Shipping zones & rates
        Route::get('shipping', [App\Http\Controllers\ShippingController::class, 'index'])->name('shipping.index');
        Route::get('shipping/create', [App\Http\Controllers\ShippingController::class, 'create'])->name('shipping.create');
        Route::post('shipping', [App\Http\Controllers\ShippingController::class, 'store'])->name('shipping.store');
        Route::get('shipping/{zone}/edit', [App\Http\Controllers\ShippingController::class, 'edit'])->name('shipping.edit');
        Route::put('shipping/{zone}', [App\Http\Controllers\ShippingController::class, 'update'])->name('shipping.update');
        Route::delete('shipping/{zone}', [App\Http\Controllers\ShippingController::class, 'destroy'])->name('shipping.destroy');

        // Reviews moderation
        Route::get('reviews', [App\Http\Controllers\ReviewController::class, 'indexAdmin'])->name('reviews.index');
        Route::post('reviews/{review}/toggle', [App\Http\Controllers\ReviewController::class, 'toggleApproval'])->name('reviews.toggle');
        Route::post('reviews/{review}/flag', [App\Http\Controllers\ReviewController::class, 'flag'])->name('reviews.flag');
        Route::post('reviews/{review}/reply', [App\Http\Controllers\ReviewController::class, 'reply'])->name('reviews.reply');
    });
});

// Public Cart & Checkout
Route::get('/cart', [App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add/{product}', [App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
Route::post('/cart/update/{product}', [App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove/{product}', [App\Http\Controllers\CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/coupon', [App\Http\Controllers\CartController::class, 'applyCoupon'])->name('cart.coupon');

Route::get('/checkout', [App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout/place-order', [App\Http\Controllers\CheckoutController::class, 'placeOrder'])->name('checkout.place');
Route::get('/orders/{order}/thank-you', [App\Http\Controllers\CheckoutController::class, 'thankyou'])->name('orders.thankyou');

// Payments (mocked flows for now)
Route::get('/payment/jazzcash/start/{order}', [App\Http\Controllers\PaymentController::class, 'startJazzCash'])->name('payment.jazzcash.start');
Route::get('/payment/jazzcash/callback', [App\Http\Controllers\PaymentController::class, 'callbackJazzCash'])->name('payment.jazzcash.callback');
Route::get('/payment/easypaisa/start/{order}', [App\Http\Controllers\PaymentController::class, 'startEasyPaisa'])->name('payment.easypaisa.start');
Route::get('/payment/easypaisa/callback', [App\Http\Controllers\PaymentController::class, 'callbackEasyPaisa'])->name('payment.easypaisa.callback');

// Reviews
Route::post('/products/{product}/reviews', [App\Http\Controllers\ReviewController::class, 'store'])->name('store.reviews.store');

// Wishlist
Route::post('/products/{product}/wishlist', [App\Http\Controllers\WishlistController::class, 'toggle'])->middleware('auth')->name('store.wishlist.toggle');

// Back in stock notifications
Route::post('/products/{product}/stock/subscribe', [App\Http\Controllers\StockNotificationController::class, 'subscribe'])->name('store.stock.subscribe');

// Search & sitemap
Route::get('/search', function (\Illuminate\Http\Request $request) {
    $q = (string) $request->query('q', '');
    $products = \App\Models\Product::when($q, fn($qq) => $qq->where('name', 'like', "%$q%"))->latest()->paginate(24)->withQueryString();
    return Inertia::render('website/products/index', [ 'products' => $products, 'filters' => ['q' => $q], 'categories' => \App\Models\Category::where('is_active', true)->get(['id','name','slug']) ]);
})->name('search');

Route::get('/sitemap.xml', function () {
    $urls = [ url('/') ];
    foreach (\App\Models\Product::select('slug')->latest()->get() as $p) { $urls[] = url('/products/'.$p->slug); }
    return response()->view('sitemap', ['urls' => $urls])->header('Content-Type', 'application/xml');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
