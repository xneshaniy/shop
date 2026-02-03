<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'cost_price',
        'selling_price',
        'stock_quantity',
        'featured',
        'best_selling',
        'new_arrival',
        'thumbnail_path',
        'seo_title',
        'seo_description',
        'seo_keywords',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'best_selling' => 'boolean',
        'new_arrival' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}


