<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Coupon;
use App\Models\Setting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'phone' => '+923001234567',
            ],
        );
        if (! $admin->hasRole('admin')) {
            $admin->assignRole($adminRole);
        }

        // Sample categories
        $categories = collect([
            ['name' => 'Skincare', 'slug' => 'skincare', 'description' => 'Cleansers, toners, moisturizers'],
            ['name' => 'Makeup', 'slug' => 'makeup', 'description' => 'Foundation, lipstick, mascara'],
            ['name' => 'Haircare', 'slug' => 'haircare', 'description' => 'Shampoo, conditioner, treatments'],
        ])->map(function ($c) {
            return Category::firstOrCreate(
                ['slug' => $c['slug']],
                [
                    'name' => $c['name'],
                    'description' => $c['description'],
                    'is_active' => true,
                ]
            );
        });

        // Sample products
        $productsSeed = [
            [
                'name' => 'Hydrating Face Cleanser',
                'category' => 'Skincare',
                'selling_price' => 1499,
                'cost_price' => 899,
                'featured' => true,
                'best_selling' => false,
                'new_arrival' => true,
            ],
            [
                'name' => 'Long-Wear Liquid Foundation',
                'category' => 'Makeup',
                'selling_price' => 2599,
                'cost_price' => 1499,
                'featured' => true,
                'best_selling' => true,
                'new_arrival' => false,
            ],
            [
                'name' => 'Nourishing Hair Mask',
                'category' => 'Haircare',
                'selling_price' => 1999,
                'cost_price' => 1199,
                'featured' => false,
                'best_selling' => true,
                'new_arrival' => false,
            ],
        ];

        foreach ($productsSeed as $ps) {
            /** @var \App\Models\Category|null $cat */
            $cat = $categories->firstWhere('name', $ps['category']);
            $slug = Str::slug($ps['name']);
            $product = Product::firstOrCreate(
                ['slug' => $slug],
                [
                    'category_id' => $cat?->id,
                    'name' => $ps['name'],
                    'description' => 'High-quality beauty product for daily use.',
                    'cost_price' => $ps['cost_price'],
                    'selling_price' => $ps['selling_price'],
                    'stock_quantity' => 100,
                    'featured' => $ps['featured'],
                    'best_selling' => $ps['best_selling'],
                    'new_arrival' => $ps['new_arrival'],
                    'thumbnail_path' => 'images/heroo1.jpg',
                    'seo_title' => $ps['name'].' | zaicomai',
                    'seo_description' => 'Buy '.$ps['name'].' online at best price in Pakistan.',
                    'seo_keywords' => 'beauty, skincare, makeup, haircare',
                ]
            );

            if ($product->images()->count() === 0) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'images/heroo2.jpg',
                    'sort_order' => 0,
                ]);
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => 'images/herro3.jpg',
                    'sort_order' => 1,
                ]);
            }
        }

        // Sample coupon
        Coupon::firstOrCreate(
            ['code' => 'WELCOME10'],
            [
                'type' => 'percentage',
                'value' => 10,
                'min_order_amount' => 1500,
                'is_active' => true,
                'starts_at' => now()->subDay(),
                'expires_at' => now()->addMonths(3),
            ]
        );

        // Default settings
        $defaultSettings = [
            'logo' => '/logo.svg',
            'banner_home' => '/images/heroo1.jpg',
            'contact_phone' => '+923001234567',
            'contact_email' => 'support@example.com',
            'footer_links' => json_encode([
                ['label' => 'Privacy Policy', 'url' => '/privacy'],
                ['label' => 'Terms of Service', 'url' => '/terms'],
            ]),
            'social_links' => json_encode([
                ['label' => 'Instagram', 'url' => 'https://instagram.com/yourbrand'],
                ['label' => 'Facebook', 'url' => 'https://facebook.com/yourbrand'],
            ]),
            'whatsapp_number' => '+923001234567',
            'seo_title' => 'zaicomai Store',
            'seo_description' => 'Premium beauty products in Pakistan',
            'seo_keywords' => 'beauty, skincare, makeup, haircare',
        ];
        foreach ($defaultSettings as $k => $v) {
            Setting::updateOrCreate(['key' => $k], ['value' => $v]);
        }
    }
}
