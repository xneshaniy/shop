import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminShippingCreate() {
    const form = useForm({ name: '', cities: [''], rates: [{ min_total: 0, max_total: '', rate: 0, free_threshold: '', cod_allowed: true }] });
    function addRate() { form.setData('rates', [...(form.data.rates as any[]), { min_total: 0, max_total: '', rate: 0, free_threshold: '', cod_allowed: true }]); }
    function submit(e: any) { e.preventDefault(); form.post(route('admin.shipping.store')); }
    return (
        <AppSidebarLayout>
            <Head title="Add Shipping Zone" />
            <div className="mx-auto w-full max-w-3xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Shipping Zone</h1>
                    <Link href={route('admin.shipping.index')} className="text-sm underline">Back</Link>
                </div>
                <form onSubmit={submit} className="space-y-3">
                    <input className="w-full rounded border p-2" placeholder="Zone name" onChange={(e) => form.setData('name', e.target.value)} />
                    <div>
                        <label className="mb-1 block text-sm">Cities (comma separated)</label>
                        <input className="w-full rounded border p-2" placeholder="City1, City2" onChange={(e) => form.setData('cities', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                    </div>
                    <div className="space-y-2">
                        <div className="text-sm font-medium">Rates</div>
                        {(form.data.rates as any[]).map((r, i) => (
                            <div key={i} className="grid grid-cols-5 gap-2">
                                <input className="rounded border p-2" placeholder="Min total" type="number" step="0.01" onChange={(e) => updateRate(i, 'min_total', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Max total" type="number" step="0.01" onChange={(e) => updateRate(i, 'max_total', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Rate" type="number" step="0.01" onChange={(e) => updateRate(i, 'rate', e.target.value)} />
                                <input className="rounded border p-2" placeholder="Free threshold" type="number" step="0.01" onChange={(e) => updateRate(i, 'free_threshold', e.target.value)} />
                                <label className="flex items-center justify-center gap-2"><input type="checkbox" defaultChecked onChange={(e) => updateRate(i, 'cod_allowed', e.target.checked)} /> COD</label>
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


