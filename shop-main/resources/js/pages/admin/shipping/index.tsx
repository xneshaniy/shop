import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

export default function AdminShippingIndex({ zones }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Shipping" />
            <div className="mx-auto w-full max-w-6xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Shipping Zones</h1>
                    <Link href={route('admin.shipping.create')} className="rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black">Add Zone</Link>
                </div>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Cities</th>
                                <th className="p-2">Rates</th>
                                <th className="p-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zones.data.map((z: any) => (
                                <tr key={z.id} className="border-t">
                                    <td className="p-2">{z.name}</td>
                                    <td className="p-2">{(z.cities || []).join(', ')}</td>
                                    <td className="p-2">{z.rates?.length || 0}</td>
                                    <td className="p-2 text-right">
                                        <Link href={route('admin.shipping.edit', z.id)} className="text-indigo-600">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


