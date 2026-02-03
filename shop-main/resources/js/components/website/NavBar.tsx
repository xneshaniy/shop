import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuViewport } from '@/components/ui/navigation-menu';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/website/ThemeToggle';

interface NavLink {
    name: string;
    href: string;
}

const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Cart', href: '/cart' },
];

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { props } = usePage();
    const cart = (props as any).cart || {};
    const cartCount = Object.values(cart).reduce((s: any, i: any) => s + (i as any).quantity, 0);

    return (
        <header className="fixed top-0 left-0 z-50 w-full">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/10 dark:from-white/0 dark:via-white/5 dark:to-white/10" />
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0f0f10]/70">
                {/* Logo */}
                <Link href="/" className="relative z-10 text-xl font-bold text-[#1b1b18] dark:text-white">
                    zaicomai
                </Link>

                {/* Desktop Menu */}
                <div className="relative z-10 hidden items-center gap-6 md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.name}>
                                    <NavigationMenuLink asChild>
                                        <Link href={link.href} className="group relative text-sm font-medium">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                        <NavigationMenuViewport />
                    </NavigationMenu>

                    <ThemeToggle />
                    <button onClick={() => window.dispatchEvent(new CustomEvent('cart:open' as any))} className="ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm text-white shadow transition hover:from-indigo-400 hover:to-fuchsia-400">
                        View Cart
                        {cartCount > 0 && <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{cartCount}</span>}
                    </button>
                </div>

                {/* Mobile toggle */}
                <button
                    className="relative z-10 text-[#1b1b18] md:hidden dark:text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/90 px-6 backdrop-blur md:hidden dark:bg-[#0f0f10]/90"
                    >
                        <div className="flex flex-col space-y-2 py-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="py-2 text-sm text-[#1b1b18] dark:text-gray-100"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="py-2">
                                <ThemeToggle />
                            </div>
                            <Link
                                href="/cart"
                                className="mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-center text-sm text-white"
                                onClick={() => setMobileOpen(false)}
                            >
                                View Cart
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default NavBar;
