<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        $settings = Setting::query()->pluck('value', 'key');
        return Inertia::render('admin/settings/edit', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'logo' => ['nullable', 'string'],
            'banner_home' => ['nullable', 'string'],
            'contact_phone' => ['nullable', 'string'],
            'contact_email' => ['nullable', 'email'],
            'footer_links' => ['nullable', 'array'],
            'social_links' => ['nullable', 'array'],
            'whatsapp_number' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
            'seo_keywords' => ['nullable', 'string'],
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => is_array($value) ? json_encode($value) : $value]);
        }

        return back()->with('success', 'Settings saved');
    }
}


