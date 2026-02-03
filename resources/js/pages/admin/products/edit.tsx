import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { compressImage } from '@/lib/image';

export default function AdminProductsEdit({ product, categories = [] }: any) {
    const form = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        cost_price: product.cost_price || '',
        selling_price: product.selling_price || '',
        stock_quantity: product.stock_quantity || 0,
        featured: !!product.featured,
        best_selling: !!product.best_selling,
        new_arrival: !!product.new_arrival,
        seo_title: product.seo_title || '',
        seo_description: product.seo_description || '',
        seo_keywords: product.seo_keywords || '',
        thumbnail: null as File | null,
        images: [] as File[],
        delete_image_ids: [] as number[],
    });

    function submit(e: any) {
        e.preventDefault();
        form.transform((data) => ({ ...data, _method: 'put' }));
        form.post(route('admin.products.update', product.id), { forceFormData: true });
    }

    function toggleDelete(id: number, checked: boolean) {
        const set = new Set(form.data.delete_image_ids);
        if (checked) set.add(id); else set.delete(id);
        form.setData('delete_image_ids', Array.from(set));
    }

    // Reorder existing images (simple up/down controls)
    const [order, setOrder] = useState<any[]>(() => (product.images || []).map((img: any, idx: number) => ({ id: img.id, sort_order: img.sort_order ?? idx })));
    useEffect(() => { form.setData('reorder', order); }, [order]);
    function move(id: number, delta: number) {
        const idx = order.findIndex((o) => o.id === id);
        if (idx < 0) return;
        const newOrder = [...order];
        const target = idx + delta;
        if (target < 0 || target >= newOrder.length) return;
        const tmp = newOrder[idx];
        newOrder[idx] = newOrder[target];
        newOrder[target] = tmp;
        // recompute sort_order sequentially
        setOrder(newOrder.map((o, i) => ({ ...o, sort_order: i })));
    }

    return (
        <AppSidebarLayout>
            <Head title="Edit Product" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Product</h1>
                    <Link href={route('admin.products.index')} className="text-sm underline">Back</Link>
                </div>
                <Card className="rounded-2xl p-4">
                    <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Category</Label>
                            <Select defaultValue={form.data.category_id ? String(form.data.category_id) : 'none'} onValueChange={(v) => form.setData('category_id', v === 'none' ? '' : v)}>
                                <SelectTrigger className="h-10"><SelectValue placeholder="No Category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Category</SelectItem>
                                    {categories.map((c: any) => (<SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input placeholder="Name" required defaultValue={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input placeholder="Slug" required defaultValue={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </div>
                        <div>
                            <Label>Cost price</Label>
                            <Input placeholder="Cost price" type="number" step="0.01" defaultValue={form.data.cost_price} onChange={(e) => form.setData('cost_price', e.target.value)} />
                        </div>
                        <div>
                            <Label>Selling price</Label>
                            <Input placeholder="Selling price" type="number" step="0.01" required defaultValue={form.data.selling_price} onChange={(e) => form.setData('selling_price', e.target.value)} />
                        </div>
                        <div>
                            <Label>Stock</Label>
                            <Input placeholder="Stock" type="number" min={0} required defaultValue={form.data.stock_quantity} onChange={(e) => form.setData('stock_quantity', Number(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-4 md:col-span-2">
                            <label className="flex items-center gap-2"><Checkbox defaultChecked={form.data.featured} onCheckedChange={(v) => form.setData('featured', !!v)} /> Featured</label>
                            <label className="flex items-center gap-2"><Checkbox defaultChecked={form.data.best_selling} onCheckedChange={(v) => form.setData('best_selling', !!v)} /> Best Selling</label>
                            <label className="flex items-center gap-2"><Checkbox defaultChecked={form.data.new_arrival} onCheckedChange={(v) => form.setData('new_arrival', !!v)} /> New Arrival</label>
                        </div>
                        <div className="md:col-span-2">
                            <Label>Description</Label>
                            <textarea className="w-full rounded-2xl border p-2" placeholder="Description" defaultValue={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                            </div>
                        <div>
                            <Label>SEO title</Label>
                            <Input placeholder="SEO title" defaultValue={form.data.seo_title} onChange={(e) => form.setData('seo_title', e.target.value)} />
                        </div>
                        <div>
                            <Label>SEO keywords</Label>
                            <Input placeholder="SEO keywords" defaultValue={form.data.seo_keywords} onChange={(e) => form.setData('seo_keywords', e.target.value)} />
                    </div>
                        <div className="md:col-span-2">
                            <Label>SEO description</Label>
                            <textarea className="w-full rounded-2xl border p-2" placeholder="SEO description" defaultValue={form.data.seo_description} onChange={(e) => form.setData('seo_description', e.target.value)} />
                    </div>

                        <ImagePickers form={form} existing={product.images || []} onToggleDelete={toggleDelete} />

                        <div className="md:col-span-2">
                            <Button disabled={form.processing} className="rounded-2xl">Update</Button>
                    </div>
                </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}

function ImagePickers({ form, existing = [], onToggleDelete }: any) {
    const [thumbPreview, setThumbPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const onThumbChange = async (file: File | null) => {
        if (!file) { form.setData('thumbnail', null); setThumbPreview(null); return; }
        const compressed = await compressImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
        form.setData('thumbnail', compressed);
        setThumbPreview(URL.createObjectURL(compressed));
    };

    const onGalleryChange = async (files: File[]) => {
        const compressed: File[] = [];
        for (const f of files) {
            compressed.push(await compressImage(f, { maxWidth: 1600, maxHeight: 1600, quality: 0.8 }));
        }
        form.setData('images', compressed);
        setGalleryPreviews(compressed.map((f) => URL.createObjectURL(f)));
    };

    return (
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            <div>
                <Label>Replace Thumbnail</Label>
                <input type="file" accept="image/*" onChange={(e) => onThumbChange(e.target.files?.[0] || null)} />
                {(thumbPreview || form?.thumbnail_path) && (
                    <div className="mt-2 overflow-hidden rounded-2xl border">
                        <img src={thumbPreview || form.thumbnail_path} alt="Preview" className="h-40 w-full object-cover" />
                    </div>
                )}
            </div>
            <div>
                <Label>Add Gallery Images</Label>
                <input multiple type="file" accept="image/*" onChange={(e) => onGalleryChange(Array.from(e.target.files || []))} />
                {galleryPreviews.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        {galleryPreviews.map((src, i) => (
                            <div key={i} className="space-y-1">
                                <div className="overflow-hidden rounded-2xl border">
                                    <img src={src} alt={`Preview ${i + 1}`} className="h-24 w-full object-cover" />
                                </div>
                                <Input placeholder="Alt text" onChange={(e) => {
                                    const key = `images_alt.${i}`;
                                    // @ts-ignore
                                    form.setData(key, e.target.value);
                                }} />
                            </div>
                        ))}
                    </div>
                )}
                {existing.length > 0 && (
                    <div className="mt-3">
                        <div className="mb-1 text-sm font-medium">Existing Images</div>
                        <div className="grid grid-cols-3 gap-2">
                            {order.map((o, i) => {
                                const img = existing.find((e: any) => e.id === o.id) || {};
                                return (
                                    <div key={o.id} className="space-y-1">
                                        <label className="relative block overflow-hidden rounded-2xl border">
                                            <img src={img.image_path} className="h-24 w-full object-cover" alt={img.alt_text || ''} />
                                            <input type="checkbox" className="absolute left-2 top-2 h-4 w-4" onChange={(e) => onToggleDelete(o.id, e.target.checked)} />
                                            <div className="absolute right-2 top-2 flex gap-1">
                                                <button type="button" className="rounded bg-white/80 px-1 text-xs dark:bg-black/60" onClick={() => move(o.id, -1)}>↑</button>
                                                <button type="button" className="rounded bg-white/80 px-1 text-xs dark:bg.black/60" onClick={() => move(o.id, 1)}>↓</button>
                                            </div>
                                        </label>
                                        <Input defaultValue={img.alt_text || ''} placeholder="Alt text" readOnly />
                                        <div className="text-xs text-neutral-500">Order: {i + 1}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


