import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function AdminOrdersShow({ order }: any) {
    const { props } = usePage();
    const settings: Record<string, any> = (props as any).settings || {};
    const whatsapp = settings.whatsapp_number as string | undefined;
    const statusForm = useForm({ status: order.status });
    function updateStatus(e: any) {
        e.preventDefault();
        statusForm.post(route('admin.orders.status', order.id));
    }
    return (
        <AppSidebarLayout>
            <Head title={`Order ${order.order_number}`} />
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Order #{order.order_number}</h1>
                    <div className="flex items-center gap-3">
                        <a href={route('admin.orders.invoice', order.id)} className="rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black">Invoice</a>
                        {whatsapp && (
                            <a
                                href={`https://wa.me/${encodeURIComponent(whatsapp)}?text=${encodeURIComponent('Hello, regarding order ' + order.order_number)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600"
                            >
                                WhatsApp
                            </a>
                        )}
                        <Link href={route('admin.orders.index')} className="text-sm underline">Back</Link>
                    </div>
                </div>
                <form onSubmit={updateStatus} className="flex items-center gap-2">
                    <select defaultValue={statusForm.data.status} onChange={(e) => statusForm.setData('status', e.target.value)} className="rounded border p-2">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Completed</option>
                    </select>
                    <button className="rounded border px-3 py-2">Update Status</button>
                </form>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Product</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Unit</th>
                                <th className="p-2">Line</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((i: any) => (
                                <tr key={i.id} className="border-t">
                                    <td className="p-2">{i.product_name}</td>
                                    <td className="p-2">{i.quantity}</td>
                                    <td className="p-2">{Number(i.unit_price).toFixed(0)}</td>
                                    <td className="p-2">{Number(i.line_total).toFixed(0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


