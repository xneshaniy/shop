import { Breadcrumbs } from '@/components/breadcrumbs';
import AppearanceDropdown from '@/components/appearance-dropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                <div className="relative hidden items-center md:flex">
                    <Search className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400" />
                    <Input
                        placeholder="Search..."
                        className={cn('h-9 w-64 rounded-2xl pl-9', 'bg-neutral-50 focus-visible:ring-neutral-300 dark:bg-neutral-900 dark:focus-visible:ring-neutral-700')}
                    />
                </div>
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                </motion.div>
                <AppearanceDropdown />
            </div>
        </header>
    );
}
