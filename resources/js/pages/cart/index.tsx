import WebLayout from '@/layouts/website/web-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Cart({ cart = [] }: any) {
    const items = Object.values(cart) as any[];
    const subtotal = items.reduce((sum, i: any) => sum + i.price * i.quantity, 0);
    return (
        <WebLayout>
            <Head title="Cart" />
            <div className="w-full max-w-4xl">
                <h1 className="mb-4 text-2xl font-semibold">Your Cart</h1>
                <div className="space-y-3">
                    {items.length === 0 && <div>Your cart is empty.</div>}
                    {items.map((i: any) => (
                        <CartRow key={i.product_id} item={i} />
                    ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-lg">Subtotal: Rs. {subtotal.toFixed(0)}</div>
                    <Link href={route('checkout.index')} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Checkout</Link>
                </div>
            </div>
        </WebLayout>
    );
}

function CartRow({ item }: any) {
    const update = useForm({ quantity: item.quantity });
    const remove = useForm({});
    return (
        <div className="flex items-center justify-between rounded border p-3">
            <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">Rs. {item.price.toFixed(0)}</div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); update.post(route('cart.update', item.product_id)); }} className="flex items-center gap-2">
                <input type="number" min={1} defaultValue={item.quantity} className="w-20 rounded border p-1" />
                <button className="rounded bg-gray-800 px-3 py-1 text-white dark:bg-gray-200 dark:text-black">Update</button>
            </form>
            <form onSubmit={(e) => { e.preventDefault(); remove.post(route('cart.remove', item.product_id)); }}>
                <button className="rounded bg-red-600 px-3 py-1 text-white dark:bg-red-500">Remove</button>
            </form>
        </div>
    );
}


