import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminUsersIndex({ users, filters }: any) {
    const form = useForm({ q: filters?.q ?? '', blocked: filters?.blocked ?? '' });
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    function submitSearch(e: any) {
        e.preventDefault();
        form.get(route('admin.users.index'));
    }

    return (
        <AppSidebarLayout>
            <Head title="Users" />
            <div className="mx-auto w-full max-w-5xl space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Users</h1>
                </div>
                <form onSubmit={submitSearch} className="flex flex-wrap items-end gap-2">
                    <div className="flex flex-col">
                        <label className="text-sm">Search</label>
                        <Input value={form.data.q as any} onChange={(e) => form.setData('q', e.target.value)} className="h-9 rounded-2xl" placeholder="name, email, phone" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm">Blocked</label>
                        <select value={form.data.blocked as any} onChange={(e) => form.setData('blocked', e.target.value)} className="rounded border p-2">
                            <option value="">Any</option>
                            <option value="1">Blocked</option>
                            <option value="0">Active</option>
                        </select>
                    </div>
                    <button className="rounded border px-3 py-2">Filter</button>
                </form>

                <div className="overflow-hidden rounded-2xl border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">User</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">Status</th>
                                <th className="p-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((u: any) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8 rounded-xl"><AvatarFallback>{(u.name || '?').slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                                            <div>
                                                <div className="font-medium">{u.name}</div>
                                                <div className="text-xs text-neutral-500">#{u.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">{u.phone ?? '-'}</td>
                                    <td className="p-2">{u.is_blocked ? 'Blocked' : 'Active'}</td>
                                    <td className="p-2 text-right">
                                        <Button variant="secondary" size="sm" className="mr-2 rounded-2xl" onClick={() => { setSelected(u); setOpen(true); }}>Profile</Button>
                                        <Link as="button" method="post" href={route('admin.users.toggle', u.id)} className="rounded-2xl border px-3 py-1">
                                            {u.is_blocked ? 'Unblock' : 'Block'}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="rounded-2xl sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>User Profile</DialogTitle>
                        </DialogHeader>
                        {selected && (
                            <div className="space-y-2 text-sm">
                                <div className="font-medium">{selected.name}</div>
                                <div>{selected.email}</div>
                                <div>{selected.phone ?? '-'}</div>
                                <div className="text-neutral-500">{[selected.address_line1, selected.city, selected.country].filter(Boolean).join(', ')}</div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                <div className="flex items-center gap-2">
                    {users.links?.map((l: any, i: number) => (
                        <Link key={i} href={l.url || '#'} className={`px-2 py-1 ${l.active ? 'font-semibold underline' : ''}`} dangerouslySetInnerHTML={{ __html: l.label }} />
                    ))}
                </div>
            </div>
        </AppSidebarLayout>
    );
}


