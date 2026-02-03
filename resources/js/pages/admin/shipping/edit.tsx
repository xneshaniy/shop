import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminShippingEdit({ zone }: any) {
    const form = useForm({ name: zone.name, cities: zone.cities || [], rates: zone.rates || [] });
    function addRate() { form.setData('rates', [...(form.data.rates as any[]), { min_total: 0, max_total: '', rate: 0, free_threshold: '', cod_allowed: true }]); }
    function submit(e: any) { e.preventDefault(); form.transform((d) => ({ ...d, _method: 'put' })); form.post(route('admin.shipping.update', zone.id)); }
    return (
        <AppSidebarLayout>
            <Head title="Edit Shipping Zone" />
            <div className="mx-auto w-full max-w-3xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Shipping Zone</h1>
                    <Link href={route('admin.shipping.index')} className="text-sm underline">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-3">
                    <input className="w-full rounded border p-2" placeholder="Zone name" defaultValue={form.data.name as any} onChange={(e) => form.setData('name', e.target.value)} />
                    <div>
                        <label className="mb-1 block text-sm">Cities (comma separated)</label>
                        <input className="w-full rounded border p-2" defaultValue={(zone.cities || []).join(', ')} onChange={(e) => form.setData('cities', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Rates</div>
                        {(form.data.rates as any[]).map((r, i) => (
                            <div key={i} className="grid grid-cols-5 gap-2">
                                <input className="rounded border p-2" placeholder="Min total" type="number" step="0.01" defaultValue={r.min_total} onChange={(e) => updateRate(i, 'min_total', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Max total" type="number" step="0.01" defaultValue={r.max_total ?? ''} onChange={(e) => updateRate(i, 'max_total', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Rate" type="number" step="0.01" defaultValue={r.rate} onChange={(e) => updateRate(i, 'rate', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Free threshold" type="number" step="0.01" defaultValue={r.free_threshold ?? ''} onChange={(e) => updateRate(i, 'free_threshold', e.target.value)} />
                                <label className="flex items-center justify-center gap-2"><input type="checkbox" defaultChecked={!!r.cod_allowed} onChange={(e) => updateRate(i, 'cod_allowed', e.target.checked)} /> COD</label>
                            </div>
                        ))}
                        <button type="button" onClick={addRate} className="rounded border px-2 py-1">+ Add rate</button>
                    </div>
                    <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Save</button>
                </form>
            </div>
        </AppSidebarLayout>
    );

    function updateRate(i: number, key: string, value: any) {
        const next = [...(form.data.rates as any[])];
        next[i] = { ...next[i], [key]: value };
        form.setData('rates', next);
    }
}


