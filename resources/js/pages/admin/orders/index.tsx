import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
        Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
        Completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
    };
    return <span className={`rounded-full px-2 py-0.5 text-xs ${map[status] || ''}`}>{status}</span>;
}

export default function AdminOrdersIndex({ orders, current }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Orders" />
            <div className="mx-auto w-full max-w-6xl space-y-4">
                <h1 className="text-2xl font-semibold">Orders</h1>
                <Tabs defaultValue={current ?? 'All'}>
                    <TabsList>
                        {['All','Pending','Processing','Completed'].map((t) => (
                            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
                        ))}
                    </TabsList>
                    {['All','Pending','Processing','Completed'].map((t) => (
                        <TabsContent key={t} value={t}>
                            <Card className="overflow-hidden rounded-2xl">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 dark:bg-neutral-900">
                                        <tr>
                                            <th className="p-2">Order #</th>
                                            <th className="p-2">Customer</th>
                                            <th className="p-2">Status</th>
                                            <th className="p-2">Total</th>
                                            <th className="p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.data?.filter((o: any) => t === 'All' || o.status === t).map((o: any) => (
                                            <tr key={o.id} className="border-t">
                                                <td className="p-2">{o.order_number}</td>
                                                <td className="p-2">{o.customer_name}</td>
                                                <td className="p-2"><StatusBadge status={o.status} /></td>
                                                <td className="p-2">Rs. {Number(o.total).toFixed(0)}</td>
                                                <td className="p-2">
                                                    <Link href={route('admin.orders.show', o.id)} className="text-indigo-600">View</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </AppSidebarLayout>
    );
}


