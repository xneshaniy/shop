import WebLayout from '@/layouts/website/web-layout';
import { Head } from '@inertiajs/react';
import { KpiCard } from '@/components/ui/dashboard-cards';
import { DataTable, type Column } from '@/components/ui/data-table';

type Order = { id: number; number: string; customer: string; total: string; status: string };

export default function AdminDashboard({ kpis = {}, recentOrders = [] as Order[] }: any) {
    const columns: Column<Order>[] = [
        { key: 'number', header: 'Order #' },
        { key: 'customer', header: 'Customer' },
        { key: 'total', header: 'Total' },
        { key: 'status', header: 'Status' },
    ];

    return (
        <WebLayout>
            <Head title="Admin Dashboard" />
            <div className="w-full max-w-6xl space-y-6">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    <KpiCard title="Revenue" value={kpis.revenue ?? '$0'} delta={kpis.revenue_delta ?? '+0%'} />
                    <KpiCard title="Orders" value={kpis.orders ?? '0'} delta={kpis.orders_delta ?? '+0%'} />
                    <KpiCard title="Customers" value={kpis.customers ?? '0'} delta={kpis.customers_delta ?? '+0%'} />
                    <KpiCard title="Avg. Order" value={kpis.aov ?? '$0'} />
                </div>

                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <DataTable columns={columns} data={recentOrders} />
                </div>
            </div>
        </WebLayout>
    );
}


