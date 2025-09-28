<?php

namespace App\Jobs;

use App\Models\Product;
use App\Models\StockNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBackInStockEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Product $product)
    {
        $this->onQueue('emails');
    }

    public function handle(): void
    {
        $subs = StockNotification::where('product_id', $this->product->id)->whereNull('notified_at')->get();
        foreach ($subs as $s) {
            try {
                Mail::raw('Good news! '.$this->product->name.' is back in stock.', function ($m) use ($s) {
                    $m->to($s->email)->subject('Back in stock');
                });
                $s->update(['notified_at' => now()]);
            } catch (\Throwable $e) {
                // swallow and continue
            }
        }
    }
}


