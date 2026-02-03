<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Inertia\Inertia;
use Inertia\Response;

class PaymentsAdminController extends Controller
{
    public function index(): Response
    {
        $payments = Payment::with('order')->latest()->paginate(30)->withQueryString();
        return Inertia::render('admin/payments/index', [ 'payments' => $payments ]);
    }
}


