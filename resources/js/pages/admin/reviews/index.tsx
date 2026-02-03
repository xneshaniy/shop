import { Card } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';

export default function AdminReviewsIndex({ reviews, breakdown }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Reviews" />
            <div className="mx-auto w-full max-w-6xl space-y-4">
                <h1 className="text-2xl font-semibold">Reviews</h1>
                <Card className="rounded-2xl p-4">
                    <div className="grid gap-2 md:grid-cols-5">
                        {[5,4,3,2,1].map((star) => {
                            const count = Number(breakdown?.[star] ?? 0);
                            const total = Object.values(breakdown || {}).reduce((a: number, b: any) => a + Number(b), 0) || 0;
                            const pct = total ? Math.round((count / total) * 100) : 0;
                            return (
                                <div key={star} className="space-y-1">
                                    <div className="text-sm font-medium">{star}★</div>
                                    <div className="h-2 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800">
                                        <div className="h-2 bg-emerald-500" style={{ width: `${pct}%` }} />
                                    </div>
                                    <div className="text-xs text-neutral-500">{pct}%</div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
                <div className="overflow-hidden rounded border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900">
                            <tr>
                                <th className="p-2">Product</th>
                                <th className="p-2">User</th>
                                <th className="p-2">Rating</th>
                                <th className="p-2">Approved</th>
                                <th className="p-2">Flagged</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.data?.map((r: any) => (
                                <Row key={r.id} r={r} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

function Row({ r }: any) {
    const f = useForm({});
    return (
        <tr className="border-t">
            <td className="p-2">{r.product?.name}</td>
            <td className="p-2">{r.user?.name || 'Guest'}</td>
            <td className="p-2">{r.rating}</td>
            <td className="p-2">{r.is_approved ? 'Yes' : 'No'}</td>
            <td className="p-2">{r.is_flagged ? (r.flag_reason || 'Yes') : 'No'}</td>
            <td className="p-2">
                <form onSubmit={(e) => { e.preventDefault(); f.post(route('admin.reviews.toggle', r.id)); }}>
                    <button className="rounded border px-2 py-1">Toggle</button>
                </form>
                <form onSubmit={(e) => { e.preventDefault(); f.post(route('admin.reviews.flag', r.id), { data: { reason: 'inappropriate' } }); }}>
                    <button className="ml-2 rounded border px-2 py-1">Flag</button>
                </form>
            </td>
        </tr>
    );
}


