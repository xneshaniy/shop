import Footer from '@/components/website/Footer';
import FuturisticNav from '@/components/website/FuturisticNav';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import CartDrawer from '@/components/website/CartDrawer';

export default function WebLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const settings: Record<string, any> = (props as any).settings || {};
    const whatsapp = settings.whatsapp_number;
    return (
        <div className="flex min-h-screen flex-col bg-[#ffffff] text-[#111827] dark:bg-[#0f0f10] dark:text-[#f9fafb]">
            <FuturisticNav categories={(props as any).categories || []} />
            <AnimatePresence mode="wait">
                <motion.main
                    key={(props as any).component ?? ''}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-1 flex-col items-center justify-center p-6 pt-24 lg:p-8 lg:pt-28"
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <Footer />
            <Toaster />
            {((props as any).component !== 'Website/Cart/Index') && <CartDrawer />}
            <div className="fixed inset-x-0 bottom-0 z-40 mx-auto block w-full p-4 sm:hidden">
                <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur dark:border-white/10 dark:bg-[#0f0f10]/90">
                    <span>Ready to checkout?</span>
                    <a href={route('checkout.index') as any} className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-white">Checkout</a>
                </div>
            </div>
            {whatsapp && (
                <a
                    href={`https://wa.me/${encodeURIComponent(whatsapp)}?text=${encodeURIComponent('Hello I need help')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition hover:bg-green-600"
                >
                    <span className="relative inline-flex items-center">
                        WhatsApp
                        <span className="absolute -z-10 -inset-2 animate-pulse rounded-full bg-green-500/40 blur-md" />
                    </span>
                </a>
            )}
        </div>
    );
}
