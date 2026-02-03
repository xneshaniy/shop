import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

export default function AdminPaymentsIndex({ payments }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Payments" />
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="mb-4 text-2xl font-semibold">Payments</h1>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Order #</th>
                                <th className="p-2">Provider</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.data?.map((p: any) => (
                                <tr key={p.id} className="border-t">
                                    <td className="p-2"><Link href={route('admin.orders.show', p.order_id)} className="text-indigo-600">{p.order?.order_number || p.order_id}</Link></td>
                                    <td className="p-2">{p.provider}</td>
                                    <td className="p-2">Rs. {Number(p.amount).toFixed(0)}</td>
                                    <td className="p-2">{p.status}</td>
                                    <td className="p-2">{p.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


