<?php

namespace App\Http\Controllers;

use App\Models\ShippingRate;
use App\Models\ShippingZone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShippingController extends Controller
{
    public function index(): Response
    {
        $zones = ShippingZone::with('rates')->orderBy('name')->paginate(20)->withQueryString();
        return Inertia::render('admin/shipping/index', [ 'zones' => $zones ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/shipping/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'cities' => ['array'],
            'cities.*' => ['string','max:255'],
            'rates' => ['array'],
            'rates.*.min_total' => ['nullable','numeric','min:0'],
            'rates.*.max_total' => ['nullable','numeric','min:0'],
            'rates.*.rate' => ['required','numeric','min:0'],
            'rates.*.free_threshold' => ['nullable','numeric','min:0'],
            'rates.*.cod_allowed' => ['boolean'],
        ]);

        $zone = ShippingZone::create([
            'name' => $data['name'],
            'cities' => $data['cities'] ?? [],
        ]);

        foreach (($data['rates'] ?? []) as $r) {
            ShippingRate::create([
                'zone_id' => $zone->id,
                'min_total' => $r['min_total'] ?? 0,
                'max_total' => $r['max_total'] ?? null,
                'rate' => $r['rate'],
                'free_threshold' => $r['free_threshold'] ?? null,
                'cod_allowed' => $r['cod_allowed'] ?? true,
            ]);
        }

        return redirect()->route('admin.shipping.index')->with('success', 'Zone created');
    }

    public function edit(ShippingZone $zone): Response
    {
        $zone->load('rates');
        return Inertia::render('admin/shipping/edit', [ 'zone' => $zone ]);
    }

    public function update(Request $request, ShippingZone $zone): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'cities' => ['array'],
            'cities.*' => ['string','max:255'],
            'rates' => ['array'],
            'rates.*.min_total' => ['nullable','numeric','min:0'],
            'rates.*.max_total' => ['nullable','numeric','min:0'],
            'rates.*.rate' => ['required','numeric','min:0'],
            'rates.*.free_threshold' => ['nullable','numeric','min:0'],
            'rates.*.cod_allowed' => ['boolean'],
        ]);

        $zone->update([
            'name' => $data['name'],
            'cities' => $data['cities'] ?? [],
        ]);

        // Simple sync: delete and recreate
        $zone->rates()->delete();
        foreach (($data['rates'] ?? []) as $r) {
            ShippingRate::create([
                'zone_id' => $zone->id,
                'min_total' => $r['min_total'] ?? 0,
                'max_total' => $r['max_total'] ?? null,
                'rate' => $r['rate'],
                'free_threshold' => $r['free_threshold'] ?? null,
                'cod_allowed' => $r['cod_allowed'] ?? true,
            ]);
        }

        return redirect()->route('admin.shipping.index')->with('success', 'Zone updated');
    }

    public function destroy(ShippingZone $zone): RedirectResponse
    {
        $zone->delete();
        return back()->with('success', 'Zone deleted');
    }
}


