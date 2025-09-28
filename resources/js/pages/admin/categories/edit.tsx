import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminCategoriesEdit({ category }: any) {
    const form = useForm({ name: category.name || '', slug: category.slug || '', description: category.description || '', image_path: category.image_path || '', is_active: !!category.is_active, seo_title: category.seo_title || '', seo_description: category.seo_description || '', seo_keywords: category.seo_keywords || '' });
    function submit(e: any) { e.preventDefault(); form.transform((d) => ({ ...d, _method: 'put' })); form.post(route('admin.categories.update', category.id)); }
    return (
        <AppSidebarLayout>
            <Head title="Edit Category" />
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Edit Category</h1>
                    <Link href={route('admin.categories.index')} className="text-sm underline">Back</Link>
                </div>
                <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input className="rounded border p-2" placeholder="Name" required defaultValue={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Slug" required defaultValue={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                    <textarea className="col-span-1 rounded border p-2 md:col-span-2" placeholder="Description" defaultValue={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Image path (optional)" defaultValue={form.data.image_path} onChange={(e) => form.setData('image_path', e.target.value)} />
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked={form.data.is_active} onChange={(e) => form.setData('is_active', e.target.checked)} /> Active</label>
                    <input className="rounded border p-2" placeholder="SEO Title" defaultValue={form.data.seo_title} onChange={(e) => form.setData('seo_title', e.target.value)} />
                    <input className="rounded border p-2" placeholder="SEO Keywords" defaultValue={form.data.seo_keywords} onChange={(e) => form.setData('seo_keywords', e.target.value)} />
                    <textarea className="col-span-1 rounded border p-2 md:col-span-2" placeholder="SEO Description" defaultValue={form.data.seo_description} onChange={(e) => form.setData('seo_description', e.target.value)} />
                    <div className="col-span-1 md:col-span-2">
                        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Update</button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}


