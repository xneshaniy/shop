import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Toast = { id: string; title?: string; description?: string; variant?: 'success' | 'error' | 'warning' };

export function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const handler = (e: CustomEvent<Toast>) => {
            setToasts((prev) => [...prev, { id: crypto.randomUUID(), ...e.detail }]);
            setTimeout(() => setToasts((prev) => prev.slice(1)), 3500);
        };
        window.addEventListener('app:toast' as any, handler as any);
        return () => window.removeEventListener('app:toast' as any, handler as any);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-full max-w-md flex-col gap-2 px-4">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn('pointer-events-auto rounded-2xl p-4 shadow-lg',
                            t.variant === 'success' && 'bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200',
                            t.variant === 'error' && 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200',
                            t.variant === 'warning' && 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
                            !t.variant && 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
                        )}
                    >
                        {t.title && <div className="text-sm font-semibold">{t.title}</div>}
                        {t.description && <div className="text-sm opacity-90">{t.description}</div>}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export function toast(payload: Omit<Toast, 'id'>) {
    window.dispatchEvent(new CustomEvent('app:toast', { detail: payload } as any));
}


