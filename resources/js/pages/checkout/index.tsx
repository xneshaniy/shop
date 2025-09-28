import WebLayout from '@/layouts/website/web-layout';
import { Head, useForm } from '@inertiajs/react';
import CheckoutSteps from '@/components/website/CheckoutSteps';

export default function Checkout({ cart = [], coupon = null, addresses = [] }: any) {
    const form = useForm({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        shipping_address_line1: '',
        shipping_address_line2: '',
        shipping_city: '',
        shipping_state: '',
        shipping_postal_code: '',
        shipping_country: 'Pakistan',
        payment_method: 'cod',
    });
    const stepFromForm = form.data.customer_name && form.data.shipping_address_line1 ? (form.data.payment_method ? 3 : 2) : 1;

    function submit(e: any) {
        e.preventDefault();
        form.post(route('checkout.place'));
    }

    return (
        <WebLayout>
            <Head title="Checkout" />
            <form onSubmit={submit} className="w-full max-w-3xl space-y-3">
                <h1 className="text-2xl font-semibold">Checkout</h1>
                <CheckoutSteps step={stepFromForm} />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {addresses.length > 0 && (
                        <div className="md:col-span-2">
                            <label className="text-sm">Saved addresses</label>
                            <div className="mt-2 grid gap-2">
                                {addresses.map((a: any) => (
                                    <label key={a.id} className="flex cursor-pointer items-start gap-2 rounded border p-2">
                                        <input type="radio" name="addr" onChange={() => {
                                            form.setData('customer_name', a.name || '');
                                            form.setData('customer_phone', a.phone || '');
                                            form.setData('shipping_address_line1', a.line1 || '');
                                            form.setData('shipping_address_line2', a.line2 || '');
                                            form.setData('shipping_city', a.city || '');
                                            form.setData('shipping_state', a.state || '');
                                            form.setData('shipping_postal_code', a.postal_code || '');
                                            form.setData('shipping_country', a.country || 'Pakistan');
                                        }} />
                                        <div className="text-sm">
                                            <div className="font-medium">{a.name} {a.is_default ? '(Default)' : ''}</div>
                                            <div className="text-neutral-500">{[a.line1, a.line2, a.city, a.state, a.postal_code, a.country].filter(Boolean).join(', ')}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    <input className="rounded border p-2" placeholder="Full name" required onChange={(e) => form.setData('customer_name', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Phone" required onChange={(e) => form.setData('customer_phone', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Email" onChange={(e) => form.setData('customer_email', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Address line 1" required onChange={(e) => form.setData('shipping_address_line1', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Address line 2" onChange={(e) => form.setData('shipping_address_line2', e.target.value)} />
                    <input className="rounded border p-2" placeholder="City" required onChange={(e) => form.setData('shipping_city', e.target.value)} />
                    <input className="rounded border p-2" placeholder="State" onChange={(e) => form.setData('shipping_state', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Postal code" onChange={(e) => form.setData('shipping_postal_code', e.target.value)} />
                </div>
                <div>
                    <label className="mr-4"><input type="radio" name="pm" defaultChecked onChange={() => form.setData('payment_method', 'cod')} /> Cash on Delivery</label>
                    <label className="mr-4"><input type="radio" name="pm" onChange={() => form.setData('payment_method', 'jazzcash')} /> JazzCash</label>
                    <label><input type="radio" name="pm" onChange={() => form.setData('payment_method', 'easypaisa')} /> EasyPaisa</label>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-2xl border p-3 text-sm dark:border-white/10">
                    <div>
                        <div>Subtotal: <span className="font-semibold">Rs. {Object.values(cart).reduce((s: any, i: any) => s + (i as any).price * (i as any).quantity, 0).toFixed(0)}</span></div>
                        {coupon && <div className="text-green-600 dark:text-green-400">Coupon {coupon.code}: -Rs. {Number(coupon.discount || 0).toFixed(0)}</div>}
                    </div>
                    <div className="text-right">
                        <div className="text-sm">Total</div>
                        <div className="text-lg font-semibold">Rs. {(Object.values(cart).reduce((s: any, i: any) => s + (i as any).price * (i as any).quantity, 0) - Number(coupon?.discount || 0)).toFixed(0)}</div>
                    </div>
                </div>
                <button disabled={form.processing} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Place order</button>
            </form>
        </WebLayout>
    );
}


