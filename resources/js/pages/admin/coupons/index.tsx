import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

export default function AdminCouponsIndex({ coupons }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Coupons" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Coupons</h1>
                    <Link href={route('admin.coupons.create')} className="rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black">Add Coupon</Link>
                </div>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Code</th>
                                <th className="p-2">Type</th>
                                <th className="p-2">Value</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons?.data?.map((c: any) => (
                                <tr key={c.id} className="border-t">
                                    <td className="p-2">{c.code}</td>
                                    <td className="p-2">{c.type}</td>
                                    <td className="p-2">{c.value}</td>
                                    <td className="p-2">
                                        <Link href={route('admin.coupons.edit', c.id)} className="text-blue-600">Edit</Link>
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


