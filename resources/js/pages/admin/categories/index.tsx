import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';

export default function AdminCategoriesIndex({ categories }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Categories" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Categories</h1>
                    <Link href={route('admin.categories.create')} className="rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black">Add Category</Link>
                </div>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Slug</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.data?.map((c: any) => (
                                <tr key={c.id} className="border-t">
                                    <td className="p-2">{c.name}</td>
                                    <td className="p-2">{c.slug}</td>
                                    <td className="p-2">
                                        <Link href={route('admin.categories.edit', c.id)} className="text-blue-600">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


