import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toaster';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useRHF } from 'react-hook-form';
import { z } from 'zod';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';

export default function AdminSettingsEdit({ settings = {} }: any) {
    const inertiaForm = useForm({});

    const schema = z.object({
        logo: z.string().url().or(z.literal('')).optional(),
        banner_home: z.string().url().or(z.literal('')).optional(),
        contact_phone: z.string().max(50).or(z.literal('')).optional(),
        contact_email: z.string().email().or(z.literal('')).optional(),
        whatsapp_number: z.string().max(50).or(z.literal('')).optional(),
        seo_title: z.string().max(255).or(z.literal('')).optional(),
        seo_description: z.string().or(z.literal('')).optional(),
        seo_keywords: z.string().or(z.literal('')).optional(),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useRHF({
        resolver: zodResolver(schema),
        defaultValues: {
            logo: settings.logo || '',
            banner_home: settings.banner_home || '',
            contact_phone: settings.contact_phone || '',
            contact_email: settings.contact_email || '',
            whatsapp_number: settings.whatsapp_number || '',
            seo_title: settings.seo_title || '',
            seo_description: settings.seo_description || '',
            seo_keywords: settings.seo_keywords || '',
        },
    });

    function submit(values: any) {
        router.post(route('admin.settings.update'), values, {
            onSuccess: () => toast({ title: 'Saved', description: 'Settings updated', variant: 'success' }),
            onError: () => toast({ title: 'Error', description: 'Please review errors', variant: 'error' }),
        });
    }
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Settings', href: route('admin.settings.edit') },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <Card className="mx-auto w-full max-w-3xl rounded-2xl p-4">
                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4">
                    <h1 className="text-2xl font-semibold">Store Settings</h1>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Logo URL</Label>
                            <Input placeholder="Logo URL" {...register('logo')} />
                            {errors.logo && <p className="text-xs text-red-600">{String(errors.logo.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Home banner URL</Label>
                            <Input placeholder="Home banner URL" {...register('banner_home')} />
                            {errors.banner_home && <p className="text-xs text-red-600">{String(errors.banner_home.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Contact phone</Label>
                            <Input placeholder="Contact phone" {...register('contact_phone')} />
                        </div>
                        <div className="space-y-2">
                            <Label>Contact email</Label>
                            <Input placeholder="Contact email" {...register('contact_email')} />
                            {errors.contact_email && <p className="text-xs text-red-600">{String(errors.contact_email.message)}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>WhatsApp number</Label>
                            <Input placeholder="WhatsApp number" {...register('whatsapp_number')} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>SEO title</Label>
                        <Input placeholder="SEO title" {...register('seo_title')} />
                    </div>
                    <div className="space-y-2">
                        <Label>SEO keywords</Label>
                        <Input placeholder="SEO keywords" {...register('seo_keywords')} />
                    </div>
                    <div className="space-y-2">
                        <Label>SEO description</Label>
                        <textarea className="rounded-2xl border p-2" placeholder="SEO description" {...register('seo_description')} />
                    </div>
                    <div>
                        <Button disabled={isSubmitting || inertiaForm.processing} type="submit" className="rounded-2xl">Save</Button>
                    </div>
                </form>
            </Card>
        </AppSidebarLayout>
    );
}


