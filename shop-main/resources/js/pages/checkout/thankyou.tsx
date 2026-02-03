import WebLayout from '@/layouts/website/web-layout';
import { Head, Link } from '@inertiajs/react';

export default function ThankYou({ order }: any) {
    return (
        <WebLayout>
            <Head title="Thank you" />
            <div className="w-full max-w-2xl text-center">
                <h1 className="text-2xl font-semibold">Thank you for your order!</h1>
                <p className="mt-2">Order number: <strong>{order.order_number}</strong></p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <a href={route('admin.orders.invoice', order.id)} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Download Invoice</a>
                    <Link href={route('home')} className="rounded border px-4 py-2">Continue Shopping</Link>
                </div>
            </div>
        </WebLayout>
    );
}


