import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useForm as useRHF } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/toaster';

export default function AdminCouponsCreate() {
    const inertiaForm = useForm({});
    const schema = z.object({
        code: z.string().min(2),
        type: z.enum(['percentage','fixed']),
        value: z.coerce.number().min(0.01),
        min_order_amount: z.coerce.number().min(0).optional().or(z.nan()),
        max_uses: z.coerce.number().min(0).optional().or(z.nan()),
        starts_at: z.string().optional().or(z.literal('')),
        expires_at: z.string().optional().or(z.literal('')),
        is_active: z.boolean().default(true),
    });
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useRHF({
        resolver: zodResolver(schema),
        defaultValues: { code: '', type: 'percentage', value: '', min_order_amount: '', max_uses: '', starts_at: '', expires_at: '', is_active: true },
    });
    function submit(values: any) {
        router.post(route('admin.coupons.store'), values, {
            onSuccess: () => toast({ title: 'Created', description: 'Coupon saved', variant: 'success' }),
            onError: () => toast({ title: 'Error', description: 'Fix form errors', variant: 'error' }),
        });
    }
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Coupons', href: route('admin.coupons.index') },
        { title: 'Add', href: route('admin.coupons.create') },
    ];
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Coupon" />
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Add Coupon</h1>
                    <Link href={route('admin.coupons.index')} className="text-sm underline">Back</Link>
                </div>
                <Card className="rounded-2xl p-4">
                    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Code</Label>
                            <Input placeholder="Code" {...register('code')} />
                            {errors.code && <p className="text-xs text-red-600">{String(errors.code.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select defaultValue={'percentage'} onValueChange={(v) => setValue('type', v as any)}>
                                <SelectTrigger className="h-10"><SelectValue placeholder="Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Value</Label>
                            <Input placeholder="Value" type="number" step="0.01" {...register('value')} />
                            {errors.value && <p className="text-xs text-red-600">{String(errors.value.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Min Order Amount</Label>
                            <Input placeholder="Min Order Amount" type="number" step="0.01" {...register('min_order_amount')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Uses</Label>
                            <Input placeholder="Max Uses" type="number" {...register('max_uses')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Starts at</Label>
                            <Input placeholder="YYYY-MM-DD" type="date" {...register('starts_at')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Expires at</Label>
                            <Input placeholder="YYYY-MM-DD" type="date" {...register('expires_at')} />
                        </div>
                        <div className="flex items-center gap-2 md:col-span-2">
                            <Checkbox defaultChecked onCheckedChange={(v) => setValue('is_active', !!v)} />
                            <Label>Active</Label>
                        </div>
                        <div className="md:col-span-2">
                            <Button disabled={isSubmitting || inertiaForm.processing} type="submit" className="rounded-2xl">Save</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}


