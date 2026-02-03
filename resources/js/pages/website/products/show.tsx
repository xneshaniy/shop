import WebLayout from '@/layouts/website/web-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ProductShow({ product, related }: any) {
    const { post, processing } = useForm({ quantity: 1 });
    const reviewForm = useForm({ rating: 5, comment: '' });

    function addToCart(e: any) {
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
            },
        });
    }

    function submitReview(e: any) {
        e.preventDefault();
        reviewForm.post(route('store.reviews.store', product.id));
    }

    return (
        <WebLayout>
            <Head title={product.seo_title || product.name}>
                {product.seo_description && <meta name="description" content={product.seo_description} />}
                {product.seo_keywords && <meta name="keywords" content={product.seo_keywords} />}
            </Head>
            <div className="w-full max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <motion.div layoutId={`product-image-${product.id}`} className="aspect-square w-full overflow-hidden rounded bg-gray-100 dark:bg-neutral-800">
                        {product.images?.[0] && (
                            <img src={`/${product.images[0].image_path}`} alt={product.images[0].alt_text || product.name} className="h-full w-full object-cover" />
                        )}
                    </motion.div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                        {product.images?.slice(1).map((img: any) => (
                            <div key={img.id} className="aspect-square overflow-hidden rounded bg-gray-100">
                                <img src={`/${img.image_path}`} alt={img.alt_text || product.name} className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <motion.h1 layoutId={`product-title-${product.id}`} className="text-2xl font-semibold">{product.name}</motion.h1>
                    <motion.div layoutId={`product-price-${product.id}`} className="mt-1 text-gray-600">Rs. {Number(product.selling_price).toFixed(0)}</motion.div>
                    <div className="mt-2 text-sm">{product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}</div>
                    <p className="prose mt-4 max-w-none">{product.description}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <input name="quantity" type="number" min={1} defaultValue={1} className="w-24 rounded border p-2" />
                        <button onClick={addToCart} disabled={processing} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Add to cart</button>
                        <form method="post" onSubmit={(e) => { e.preventDefault(); reviewForm.post(route('store.wishlist.toggle', product.id)); }}>
                            <button className="rounded border px-3 py-2">❤ Wishlist</button>
                        </form>
                        {product.stock_quantity <= 0 && (
                            <form method="post" onSubmit={(e) => { e.preventDefault(); reviewForm.post(route('store.stock.subscribe', product.id), { data: { email: '' } }); }}>
                                <input name="email" type="email" placeholder="Email for stock alert" className="w-56 rounded border p-2" />
                                <button className="ml-2 rounded border px-3 py-2">Notify me</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mt-10">
                <h2 className="mb-3 text-xl font-semibold">Related products</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {related.map((p: any) => (
                        <Link key={p.id} href={route('store.products.show', p.slug)} className="rounded bg-white p-4 shadow-md dark:bg-neutral-900">
                            <div className="aspect-square w-full overflow-hidden rounded bg-gray-100" />
                            <div className="mt-2 text-sm font-medium">{p.name}</div>
                            <div className="text-xs text-gray-500">Rs. {Number(p.selling_price).toFixed(0)}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </WebLayout>
    );
}


