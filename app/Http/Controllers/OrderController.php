<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::with('items')->latest()->paginate(20)->withQueryString();
        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load('items.product', 'payments');
        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:Pending,Processing,Completed'],
        ]);
        $order->update(['status' => $data['status']]);
        return back()->with('success', 'Order status updated');
    }

    public function invoice(Order $order)
    {
        $order->load('items.product');
        $pdf = PDF::loadView('invoices.order', ['order' => $order]);
        $fileName = 'invoice-' . Str::slug($order->order_number) . '.pdf';
        return $pdf->download($fileName);
    }
}


