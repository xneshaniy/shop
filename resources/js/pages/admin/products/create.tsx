import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { CompactForm, FormRow } from '@/components/ui/compact-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { compressImage } from '@/lib/image';

export default function AdminProductsCreate({ categories = [] }: any) {
    const form = useForm({
        category_id: '',
        name: '',
        slug: '',
        description: '',
        cost_price: '',
        selling_price: '',
        stock_quantity: 0,
        featured: false as boolean,
        best_selling: false as boolean,
        new_arrival: false as boolean,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        thumbnail: null as File | null,
        images: [] as File[]
    });

    function submit(e: any) {
        e.preventDefault();
        form.post(route('admin.products.store'), { forceFormData: true });
    }

    return (
        <AppSidebarLayout>
            <Head title="Add Product" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Product</h1>
                    <Link href={route('admin.products.index')} className="text-sm underline">Back</Link>
                </div>
                <Card className="rounded-2xl p-4">
                    <CompactForm>
                        <input type="hidden" name="_form" value="product-create" />
                    </CompactForm>
                    <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={(v) => form.setData('category_id', v === 'none' ? '' : v)}>
                                <SelectTrigger className="h-10"><SelectValue placeholder="No Category" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Category</SelectItem>
                                    {categories.map((c: any) => (<SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Input placeholder="Name" required onChange={(e) => form.setData('name', e.target.value)} />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input placeholder="Slug" required onChange={(e) => form.setData('slug', e.target.value)} />
                        </div>
                        <div>
                            <Label>Cost price</Label>
                            <Input placeholder="Cost price" type="number" step="0.01" onChange={(e) => form.setData('cost_price', e.target.value)} />
                        </div>
                        <div>
                            <Label>Selling price</Label>
                            <Input placeholder="Selling price" type="number" step="0.01" required onChange={(e) => form.setData('selling_price', e.target.value)} />
                        </div>
                        <div>
                            <Label>Stock</Label>
                            <Input placeholder="Stock" type="number" min={0} required onChange={(e) => form.setData('stock_quantity', Number(e.target.value))} />
                        </div>
                        <div className="flex items-center gap-4 md:col-span-2">
                            <label className="flex items-center gap-2"><Checkbox onCheckedChange={(v) => form.setData('featured', !!v)} /> Featured</label>
                            <label className="flex items-center gap-2"><Checkbox onCheckedChange={(v) => form.setData('best_selling', !!v)} /> Best Selling</label>
                            <label className="flex items-center gap-2"><Checkbox onCheckedChange={(v) => form.setData('new_arrival', !!v)} /> New Arrival</label>
                        </div>
                        <div className="md:col-span-2">
                            <Label>Description</Label>
                            <textarea className="w-full rounded-2xl border p-2" placeholder="Description" onChange={(e) => form.setData('description', e.target.value)} />
                        </div>
                        <div>
                            <Label>SEO title</Label>
                            <Input placeholder="SEO title" onChange={(e) => form.setData('seo_title', e.target.value)} />
                        </div>
                        <div>
                            <Label>SEO keywords</Label>
                            <Input placeholder="SEO keywords" onChange={(e) => form.setData('seo_keywords', e.target.value)} />
                        </div>
                        <div className="md:col-span-2">
                            <Label>SEO description</Label>
                            <textarea className="w-full rounded-2xl border p-2" placeholder="SEO description" onChange={(e) => form.setData('seo_description', e.target.value)} />
                        </div>

                        <ImagePickers form={form} />

                        <div className="md:col-span-2">
                            <Button disabled={form.processing} className="rounded-2xl">Save</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}

function ImagePickers({ form }: any) {
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
                <Label>Thumbnail</Label>
                <input type="file" accept="image/*" onChange={(e) => onThumbChange(e.target.files?.[0] || null)} />
                {thumbPreview && (
                    <div className="mt-2 overflow-hidden rounded-2xl border">
                        <img src={thumbPreview} alt="Preview" className="h-40 w-full object-cover" />
                    </div>
                )}
            </div>
            <div>
                <Label>Gallery Images</Label>
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
            </div>
        </div>
    );
}


