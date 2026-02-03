<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Setting;
use App\Models\Product;
use App\Observers\ProductObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('settings', function () {
            try {
                return Setting::query()->pluck('value', 'key');
            } catch (\Throwable $e) {
                return [];
            }
        });

        Product::observe(ProductObserver::class);
    }
}
