import { KpiCard } from '@/components/ui/kpi-card';
import { Card } from '@/components/ui/card';
import { MiniAreaChart } from '@/components/ui/mini-area-chart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart3, Package, ShoppingBag, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ kpis, recent }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <KpiCard title="Orders" value={kpis?.orders ?? 0} icon={ShoppingBag} />
                    <KpiCard title="Revenue" value={`Rs. ${Number(kpis?.sales ?? 0).toFixed(0)}`} icon={BarChart3} />
                    <KpiCard title="Profit" value={`Rs. ${Number(kpis?.profit ?? 0).toFixed(0)}`} />
                    <KpiCard title="Products" value={kpis?.products ?? '-'} icon={Package} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="rounded-2xl p-4">
                        <div className="mb-3 text-lg font-semibold">Sales Overview</div>
                        <MiniAreaChart data={[12,18,15,22,30,28,35,40,38,42,48,55]} height={200} />
                    </Card>

                    <Card className="rounded-2xl p-4">
                        <div className="mb-3 text-lg font-semibold">Latest Orders</div>
                        <div className="overflow-hidden rounded-xl border">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-neutral-900">
                                    <tr>
                                        <th className="p-2">Order #</th>
                                        <th className="p-2">Customer</th>
                                        <th className="p-2">Total</th>
                                        <th className="p-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent?.map((o: any) => (
                                        <tr key={o.id} className="border-t">
                                            <td className="p-2">{o.order_number}</td>
                                            <td className="p-2">{o.customer_name}</td>
                                            <td className="p-2">Rs. {Number(o.total).toFixed(0)}</td>
                                            <td className="p-2">
                                                <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-900">{o.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
