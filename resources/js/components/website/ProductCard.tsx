import { Link, useForm } from '@inertiajs/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { toast } from '@/components/ui/toaster';

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { post, processing } = useForm({ quantity: 1 });

    function addToCart(e: React.MouseEvent) {
        e.preventDefault();
        post(route('cart.add', product.id), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            only: ['cart', 'applied_coupon'],
            onSuccess: () => {
                window.dispatchEvent(new CustomEvent('cart:added', { detail: { id: product.id, name: product.name, price: Number(product.selling_price), qty: 1 } } as any));
                window.dispatchEvent(new CustomEvent('cart:open' as any));
                localStorage.setItem('cartDrawerOpen', '1');
                toast({ title: 'Added to cart', description: product.name, variant: 'success' });
            },
            onError: () => toast({ title: 'Could not add to cart', variant: 'error' }),
        });
    }
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const glow = useTransform(rotateY, [-15, 15], ['0%', '100%']);

    function handleMouseMove(e: React.MouseEvent) {
        const card = e.currentTarget.getBoundingClientRect();
        const centerX = card.left + card.width / 2;
        const centerY = card.top + card.height / 2;
        const percentX = (e.clientX - centerX) / (card.width / 2);
        const percentY = (e.clientY - centerY) / (card.height / 2);
        rotateX.set(-percentY * 8);
        rotateY.set(percentX * 8);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' as any }}
            className="group relative rounded-2xl border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:shadow-xl dark:border-white/10 dark:bg-[#18181b]/80"
        >
            <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(90deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) ${glow.get()}, rgba(236,72,153,0.15) 100%)` }} />
            <Link href={route('store.products.show', product.slug)} className="relative block" style={{ transform: 'translateZ(30px)' }}>
                <motion.div layoutId={`product-image-${product.id}`} className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
                    {product.images?.[0]?.image_path ? (
                        <motion.img
                            initial={{ scale: 1.02, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            src={`/${product.images[0].image_path}`}
                            alt={product.images[0].alt_text || product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 animate-pulse bg-black/5 dark:bg-white/10" />
                    )}
                </motion.div>
                <div className="mt-3 flex items-center justify-between">
                    <div>
                        <motion.div layoutId={`product-title-${product.id}`} className="text-sm font-medium">{product.name}</motion.div>
                        <motion.div layoutId={`product-price-${product.id}`} className="text-xs text-gray-600 dark:text-gray-400">Rs. {Number(product.selling_price).toFixed(0)}</motion.div>
                    </div>
                    <button onClick={addToCart} disabled={processing} className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200">{processing ? 'Adding…' : 'Add'}</button>
                </div>
            </Link>
        </motion.div>
    );
}


