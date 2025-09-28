import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminProductsIndex({ products, filters, categories }: any) {
    const safeRoute = (name: string, params?: any, fallback?: string) => {
        try {
            // @ts-ignore
            if (typeof route === 'function') {
                // @ts-ignore
                return route(name, params) as unknown as string;
            }
        } catch {}
        return fallback ?? '#';
    };
    const searchForm = useForm({
        q: filters?.q ?? '',
        category: filters?.category ?? 'none',
        featured: filters?.featured ?? '',
        best_selling: filters?.best_selling ?? '',
        new_arrival: filters?.new_arrival ?? '',
        stock: filters?.stock ?? '',
        price_min: filters?.price_min ?? '',
        price_max: filters?.price_max ?? '',
        sort: filters?.sort ?? 'latest',
    });
    const [open, setOpen] = useState(false);
    return (
        <AppSidebarLayout>
            <Head title="Products" />
            <div className="mx-auto w-full max-w-6xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    <div className="flex items-center gap-2">
                        <form onSubmit={(e) => { e.preventDefault(); searchForm.get(safeRoute('admin.products.index', undefined, '/admin/products')); }} className="hidden items-center gap-2 md:flex">
                            <Input value={searchForm.data.q as any} onChange={(e) => searchForm.setData('q', e.target.value)} placeholder="Search products..." className="h-9 w-48 rounded-2xl" />
                            <Select value={String(searchForm.data.category || 'none')} onValueChange={(v) => searchForm.setData('category', v)}>
                                <SelectTrigger className="h-9 w-40 rounded-2xl"><SelectValue placeholder="Category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">All Categories</SelectItem>
                                    {categories?.map((c: any) => (
                                        <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={String(searchForm.data.sort || 'latest')} onValueChange={(v) => searchForm.setData('sort', v)}>
                                <SelectTrigger className="h-9 w-36 rounded-2xl"><SelectValue placeholder="Sort" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="latest">Newest</SelectItem>
                                    <SelectItem value="price_asc">Price ↑</SelectItem>
                                    <SelectItem value="price_desc">Price ↓</SelectItem>
                                    <SelectItem value="stock_desc">Stock</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" variant="secondary" className="h-9 rounded-2xl">Apply</Button>
                            <Button type="button" variant="ghost" className="h-9 rounded-2xl" onClick={() => window.location.href = safeRoute('admin.products.export', undefined, '/admin/products/export')}>Export CSV</Button>
                        </form>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="rounded-2xl">Add Product</Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-2xl sm:max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add Product</DialogTitle>
                                </DialogHeader>
                                <div className="text-sm text-neutral-500">Use the create page for now.</div>
                                <div className="flex justify-end">
                                    <Link href={safeRoute('admin.products.create', undefined, '/admin/products/create')} className="text-indigo-600">Go to full create form →</Link>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card className="rounded-2xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Flags</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.data?.map((p: any) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell>Rs. {Number(p.selling_price).toFixed(0)}</TableCell>
                                    <TableCell>{p.stock_quantity}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {p.featured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">Featured</span>}
                                            {p.best_selling && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">Best</span>}
                                            {p.new_arrival && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">New</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={safeRoute('admin.products.edit', p.id, `/admin/products/${p.id}/edit`)} className="text-indigo-600">Edit</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
                <div className="flex items-center gap-2">
                    {products.links?.map((l: any, i: number) => (
                        <Link key={i} href={l.url || '#'} className={`px-2 py-1 ${l.active ? 'font-semibold underline' : ''}`} dangerouslySetInnerHTML={{ __html: l.label }} />
                    ))}
                </div>
            </div>
        </AppSidebarLayout>
    );
}


