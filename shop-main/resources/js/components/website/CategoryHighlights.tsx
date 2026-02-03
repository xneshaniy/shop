import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function CategoryHighlights({ categories = [] as any[] }) {
    const items = categories.slice(0, 4);
    return (
        <section className="relative">
            <div className="mb-5 flex items-end justify-between">
                <h2 className="text-2xl font-semibold sm:text-3xl">Categories</h2>
                <div className="ml-6 h-px flex-1 bg-gradient-to-r from-indigo-500/60 via-violet-500/60 to-fuchsia-500/60" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((c: any, idx: number) => (
                    <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative overflow-hidden rounded-2xl border bg-card p-6"
                    >
                        <div className="absolute inset-0 bg-aurora opacity-20" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold">{c.name}</h3>
                            {c.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>}
                            <Link href={route('store.products', { category: c.slug }) as any} className="mt-4 inline-block rounded-full bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                                Shop {c.name}
                            </Link>
                        </div>
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl dark:bg-indigo-500/20" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}


