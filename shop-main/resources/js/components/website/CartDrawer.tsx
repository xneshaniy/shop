import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, usePage, useForm } from '@inertiajs/react';
import { toast } from '@/components/ui/toaster';

type CartItem = { id: number; name: string; price: number; qty: number; image?: string };

export default function CartDrawer() {
    const [open, setOpen] = useState<boolean>(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const { props } = usePage();
    const serverCart = (props as any).cart || {};
    const coupon = (props as any).applied_coupon || null;

    const justUpdatedRef = useRef<number>(0);

    useEffect(() => {
        const handler = (e: CustomEvent<any>) => {
            setOpen(true);
            localStorage.setItem('cartDrawerOpen', '1');
        };
        window.addEventListener('cart:open' as any, handler as any);
        return () => window.removeEventListener('cart:open' as any, handler as any);
    }, []);

    useEffect(() => {
        const handler = (e: CustomEvent<CartItem>) => {
            setItems((prev) => {
                const idx = prev.findIndex((p) => p.id === e.detail.id);
                if (idx >= 0) {
                    const copy = [...prev];
                    copy[idx] = { ...copy[idx], qty: copy[idx].qty + e.detail.qty };
                    return copy;
                }
                return [...prev, e.detail];
            });
            setOpen(true);
            localStorage.setItem('cartDrawerOpen', '1');
            justUpdatedRef.current = Date.now();
        };
        window.addEventListener('cart:added' as any, handler as any);
        return () => window.removeEventListener('cart:added' as any, handler as any);
    }, []);

    useEffect(() => {
        const entries = Object.values(serverCart);
        const initial: CartItem[] = entries.map((i: any) => ({ id: i.product_id, name: i.name, price: i.price, qty: i.quantity, image: i.image_path }));
        const hasServerItems = entries.length > 0;
        const recentlyUpdated = Date.now() - justUpdatedRef.current < 800;
        if (hasServerItems || !recentlyUpdated) {
            setItems(initial);
        }
        const wasOpen = localStorage.getItem('cartDrawerOpen') === '1';
        if (wasOpen) setOpen(true);
    }, [serverCart]);

    const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-24 right-6 z-40 rounded-full bg-black px-4 py-2 text-sm text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
                Cart
            </button>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ x: 360 }}
                        animate={{ x: 0 }}
                        exit={{ x: 360 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-50 w-[340px] bg-white p-5 shadow-2xl dark:bg-[#0f0f10]"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <div className="text-lg font-semibold">Your Cart</div>
                            <button onClick={() => { setOpen(false); localStorage.removeItem('cartDrawerOpen'); }} className="rounded px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10">Close</button>
                        </div>
                        <div className="divide-y divide-black/5 overflow-auto">
                            {items.length === 0 && <div className="py-10 text-center text-sm text-black/60 dark:text-white/60">Cart is empty</div>}
                            {items.map((i) => (
                                <div key={i.id} className="flex items-center gap-3 py-3">
                                    <div className="h-14 w-14 overflow-hidden rounded bg-black/5 dark:bg-white/10">
                                        {i.image ? <img src={`/${i.image}`} alt={i.name} className="h-full w-full object-cover" /> : null}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{i.name}</div>
                                        <div className="text-xs text-black/60 dark:text-white/60">Rs. {i.price.toFixed(0)}</div>
                                    </div>
                                    <Quantity item={i} onChange={(qty) => setItems((prev) => prev.map((p) => (p.id === i.id ? { ...p, qty } : p)))} />
                                    <Remove id={i.id} onRemoved={() => setItems((prev) => prev.filter((p) => p.id !== i.id))} />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                            <CouponForm />
                            {coupon && (
                                <div className="mb-2 flex items-center justify-between text-xs text-green-600 dark:text-green-400">
                                    <span>Coupon {coupon.code} applied</span>
                                    <span>-Rs. {Number(coupon.discount || 0).toFixed(0)}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                                <div>Subtotal</div>
                                <div className="font-semibold">Rs. {subtotal.toFixed(0)}</div>
                            </div>
                            {coupon && (
                                <div className="mt-1 flex items-center justify-between text-sm">
                                    <div>Total</div>
                                    <div className="font-semibold">Rs. {(subtotal - Number(coupon.discount || 0)).toFixed(0)}</div>
                                </div>
                            )}
                            <div className="mt-4 flex gap-2">
                                <Link href={route('cart.index')} className="flex-1 rounded-full border px-4 py-2 text-center text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">View Cart</Link>
                                <Link href={route('checkout.index') as any} className="flex-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-center text-sm text-white">Checkout</Link>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

function Quantity({ item, onChange }: { item: CartItem; onChange: (qty: number) => void }) {
    const update = useForm({ quantity: item.qty });
    function submit(e: any) {
        e.preventDefault();
        update.post(route('cart.update', item.id), {
            onSuccess: () => onChange(Number((update.data as any).quantity) || item.qty),
        });
    }
    return (
        <form onSubmit={submit} className="flex items-center gap-1">
            <input
                type="number"
                min={1}
                defaultValue={item.qty}
                onChange={(e) => update.setData('quantity', Number(e.target.value))}
                className="w-16 rounded border px-2 py-1 text-sm"
            />
            <button disabled={update.processing} className="rounded bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black">Set</button>
        </form>
    );
}

function Remove({ id, onRemoved }: { id: number; onRemoved: () => void }) {
    const { post, processing } = useForm({});
    function submit(e: any) {
        e.preventDefault();
        post(route('cart.remove', id), { onSuccess: onRemoved });
    }
    return (
        <form onSubmit={submit}>
            <button disabled={processing} className="rounded bg-red-600 px-2 py-1 text-xs text-white dark:bg-red-500">Remove</button>
        </form>
    );
}

function CouponForm() {
    const form = useForm({ code: '' });
    function submit(e: any) {
        e.preventDefault();
        form.post(route('cart.coupon'), {
            onSuccess: () => toast({ title: 'Coupon applied', variant: 'success' }),
            onError: () => toast({ title: 'Invalid coupon', variant: 'error' }),
        });
    }
    return (
        <form onSubmit={submit} className="mb-3 flex gap-2">
            <input value={(form.data as any).code as any} onChange={(e) => form.setData('code', e.target.value)} placeholder="Coupon code" className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-[#18181b] dark:placeholder:text-gray-400" />
            <button disabled={form.processing} className="rounded-xl bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">Apply</button>
        </form>
    );
}


