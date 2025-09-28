import WebLayout from '@/layouts/website/web-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/website/ProductCard';
import Hero from '@/components/website/Hero';
import TabbedProducts from '@/components/website/TabbedProducts';
import Newsletter from '@/components/website/Newsletter';
import Testimonials from '@/components/website/Testimonials';
import CategoryHighlights from '@/components/website/CategoryHighlights';

export default function Home({ featured = [], bestSelling = [], newArrivals = [], categories = [] }: any) {
    const { props } = usePage();
    const settings: Record<string, any> = (props as any).settings || {};
    const title = settings.seo_title || 'Home';
    const description = settings.seo_description || 'Beauty products store';

    return (
        <WebLayout>
            <Head title={title}>
                <meta name="description" content={description} />
                {settings.seo_keywords && <meta name="keywords" content={settings.seo_keywords} />}
            </Head>

            <div className="w-full max-w-6xl space-y-12">
                <Hero />
                <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {categories.length === 0 && Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-16 animate-pulse rounded bg-black/5 dark:bg-white/10" />
                    ))}
                    {categories.map((c: any) => (
                        <Link key={c.id} href={route('store.products', { category: c.slug })} className="rounded bg-white p-4 shadow-md dark:bg-neutral-900">
                            <div className="text-sm font-medium">{c.name}</div>
                        </Link>
                    ))}
                </section>

                <TabbedProducts featured={featured} bestSelling={bestSelling} newArrivals={newArrivals} />

                <CategoryHighlights categories={categories} />

                <Newsletter />

                <Testimonials />
            </div>
        </WebLayout>
    );
}

function Section({ title, items }: any) {
    return (
        <section>
            <div className="mb-5 flex items-end justify-between">
                <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/60 via-violet-500/60 to-fuchsia-500/60 ml-6" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {items.length === 0 && Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-black/5 bg-white/80 p-4 dark:border-white/10 dark:bg-[#18181b]/80">
                        <div className="aspect-square w-full animate-pulse rounded-xl bg-black/5 dark:bg-white/10" />
                        <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                    </div>
                ))}
                {items.map((p: any, idx: number) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: idx * 0.04 }}>
                        <ProductCard product={p} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}


