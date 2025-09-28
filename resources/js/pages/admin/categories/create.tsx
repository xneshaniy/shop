import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminCategoriesCreate() {
    const form = useForm({ name: '', slug: '', description: '', image_path: '', is_active: true, seo_title: '', seo_description: '', seo_keywords: '' });
    function submit(e: any) { e.preventDefault(); form.post(route('admin.categories.store')); }
    return (
        <AppSidebarLayout>
            <Head title="Add Category" />
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Category</h1>
                    <Link href={route('admin.categories.index')} className="text-sm underline">Back</Link>
                </div>
                <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input className="rounded border p-2" placeholder="Name" required onChange={(e) => form.setData('name', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Slug" required onChange={(e) => form.setData('slug', e.target.value)} />
                    <textarea className="col-span-1 rounded border p-2 md:col-span-2" placeholder="Description" onChange={(e) => form.setData('description', e.target.value)} />
                    <input className="rounded border p-2" placeholder="Image path (optional)" onChange={(e) => form.setData('image_path', e.target.value)} />
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked onChange={(e) => form.setData('is_active', e.target.checked)} /> Active</label>
                    <input className="rounded border p-2" placeholder="SEO Title" onChange={(e) => form.setData('seo_title', e.target.value)} />
                    <input className="rounded border p-2" placeholder="SEO Keywords" onChange={(e) => form.setData('seo_keywords', e.target.value)} />
                    <textarea className="col-span-1 rounded border p-2 md:col-span-2" placeholder="SEO Description" onChange={(e) => form.setData('seo_description', e.target.value)} />
                    <div className="col-span-1 md:col-span-2">
                        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Save</button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}


