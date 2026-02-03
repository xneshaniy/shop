<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $ordersCount = Order::count();
        $sales = (float) Order::sum('total');
        $revenue = $sales;
        $profit = (float) DB::table('order_items')->selectRaw('SUM(line_total - (cost_price * quantity)) as p')->value('p') ?? 0;
        $recent = Order::latest()->take(10)->get();

        return \Inertia\Inertia::render('dashboard', [
            'kpis' => [
                'orders' => $ordersCount,
                'sales' => $sales,
                'revenue' => $revenue,
                'profit' => $profit,
            ],
            'recent' => $recent,
        ]);
    }
}


