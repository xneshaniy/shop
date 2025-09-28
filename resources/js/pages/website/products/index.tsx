import WebLayout from '@/layouts/website/web-layout';
import { Head, Link } from '@inertiajs/react';
import ProductListToolbar, { type ViewMode } from '@/components/website/ProductListToolbar';
import CompactFilters from '@/components/website/CompactFilters';
import ProductCard from '@/components/website/ProductCard';
import { useMemo, useState } from 'react';

export default function ProductsIndex({ products, categories, filters }: any) {
    const [view, setView] = useState<ViewMode>('grid');
    const [query, setQuery] = useState<string>(filters.search || '');
    const [sort, setSort] = useState<string>(filters.sort || 'latest');

    const onToolbarChange = (state: { query: string; sort: string; view: ViewMode }) => {
        setView(state.view);
        setQuery(state.query);
        setSort(state.sort);
        const url = new URL(window.location.href);
        url.searchParams.set('search', state.query);
        url.searchParams.set('sort', state.sort);
        window.history.replaceState({}, '', url.toString());
    };
    return (
        <WebLayout>
            <Head title="Products" />
            <div className="w-full max-w-6xl space-y-4">
                <ProductListToolbar
                    total={products.total}
                    initialQuery={query}
                    initialSort={sort}
                    defaultView={view}
                    onChange={onToolbarChange}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <aside className="md:col-span-1">
                        <CompactFilters
                            categories={categories.map((c: any) => ({ label: c.name, value: c.slug }))}
                            brands={[]}
                        />
                    </aside>
                    <section className={`md:col-span-3 ${view === 'grid' ? 'grid grid-cols-2 gap-4 md:grid-cols-3' : 'space-y-2'}`}>
                        {products.data.map((p: any) => (
                            view === 'grid' ? (
                                <ProductCard key={p.id} product={p} />
                            ) : (
                                <Link key={p.id} href={route('store.products.show', p.slug)} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                                    <div className="aspect-square h-16 w-16 overflow-hidden rounded bg-gray-100" />
                                    <div className="flex flex-1 items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium">{p.name}</div>
                                            <div className="text-xs text-muted-foreground">SKU: {p.sku ?? 'N/A'}</div>
                                        </div>
                                        <div className="text-sm">Rs. {Number(p.selling_price).toFixed(0)}</div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </section>
                </div>
            </div>
        </WebLayout>
    );
}


