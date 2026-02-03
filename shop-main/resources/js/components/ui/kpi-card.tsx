import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface KpiCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: React.ComponentType<any>;
    className?: string;
}

export function KpiCard({ title, value, subtitle, icon: Icon, className }: KpiCardProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Card className={cn('rounded-2xl p-4 shadow-sm dark:shadow-none', className)}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">{title}</div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
                        {subtitle && <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{subtitle}</div>}
                    </div>
                    {Icon && (
                        <div className="rounded-xl bg-neutral-100 p-3 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
                            <Icon className="h-6 w-6" />
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}


