import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';

export default function AdminSettingsIndex({ settings }: any) {
    return (
        <AppSidebarLayout>
            <Head title="Settings" />
            <div className="mx-auto w-full max-w-4xl">
                <h1 className="mb-4 text-2xl font-semibold">Settings</h1>
                <p>Use the Settings page in the app to update global settings.</p>
            </div>
        </AppSidebarLayout>
    );
}


