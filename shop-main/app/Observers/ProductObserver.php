<?php

namespace App\Observers;

use App\Jobs\SendBackInStockEmail;
use App\Models\Product;

class ProductObserver
{
    public function updated(Product $product): void
    {
        if ($product->isDirty('stock_quantity')) {
            $original = $product->getOriginal('stock_quantity');
            if ((int) $original <= 0 && (int) $product->stock_quantity > 0) {
                SendBackInStockEmail::dispatch($product);
            }
        }
    }
}


