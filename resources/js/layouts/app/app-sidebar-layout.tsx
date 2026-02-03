import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Toaster } from '@/components/ui/toaster';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <AnimatePresence mode="wait">
                    <motion.div key={(breadcrumbs.at(-1)?.href ?? '')} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                        {children}
                    </motion.div>
                </AnimatePresence>
            </AppContent>
            <Toaster />
        </AppShell>
    );
}
