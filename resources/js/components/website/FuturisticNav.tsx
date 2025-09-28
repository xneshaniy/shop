import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/website/ThemeToggle';

type Category = { id: number; name: string; slug: string };

export default function FuturisticNav({ categories = [] as Category[] }) {
    const { props } = usePage();
    const cart = (props as any).cart || {};
    const cartCount: number = useMemo(() => {
        try {
            return (Object.values(cart) as any[]).reduce((sum: number, item: any) => sum + (item?.quantity ?? 0), 0);
        } catch {
            return 0;
        }
    }, [cart]);
    const [query, setQuery] = useState('');

    const safeRoute = (name: string, params?: Record<string, any>, fallback?: string): string => {
        try {
            // @ts-ignore
            if (typeof route === 'function') {
                // @ts-ignore
                return route(name, params) as unknown as string;
            }
        } catch {}
        return fallback ?? '/';
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/10 dark:from-white/0 dark:via-white/5 dark:to-white/10" />
            <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
                <div className="glass rounded-2xl bg-white/60 px-3 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:glass-dark dark:bg-[#0f0f10]/60">
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Left: Brand + Categories */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80">
                                    <SheetHeader>
                                        <SheetTitle>Browse</SheetTitle>
                                    </SheetHeader>
                                    <nav className="mt-4 space-y-1">
                                        <Link href="/" className="block rounded px-3 py-2 hover:bg-accent">Home</Link>
                                        <Link href="/products" className="block rounded px-3 py-2 hover:bg-accent">Shop</Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex w-full items-center justify-between rounded px-3 py-2 hover:bg-accent">
                                                    <span>Categories</span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="max-h-80 w-72 overflow-auto">
                                                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {categories.map((c) => (
                                                    <DropdownMenuItem key={c.id} asChild>
                                                        <Link href={safeRoute('store.products', { category: c.slug }, `/products?category=${encodeURIComponent(c.slug)}`)}>{c.name}</Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            <Link href="/" className="text-base font-bold md:text-lg">
                                zaicomai
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="hidden items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-accent md:flex">
                                        <span>Categories</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="max-h-96 w-96 overflow-auto">
                                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="grid grid-cols-2 gap-1">
                                        {categories.map((c) => (
                                            <DropdownMenuItem key={c.id} asChild>
                                                <Link href={safeRoute('store.products', { category: c.slug }, `/products?category=${encodeURIComponent(c.slug)}`)}>{c.name}</Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Center: Search */}
                        <div className="flex flex-1 items-center">
                            <div className="relative hidden w-full max-w-xl md:block">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products, articles..."
                                    className="pl-9"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && query.trim()) {
                                            window.location.href = `/products?search=${encodeURIComponent(query.trim())}`;
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="ml-auto flex items-center gap-1 md:gap-2">
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => window.dispatchEvent(new CustomEvent('search:open' as any))}>
                                <Search className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon" asChild>
                                <Link href={safeRoute('wishlist.index', undefined, '/wishlist')} aria-label="Wishlist">
                                    <Heart className="h-5 w-5" />
                                </Link>
                            </Button>

                            <Button variant="ghost" size="icon" asChild>
                                <Link href={safeRoute('store.account', undefined, '/account')} aria-label="Account">
                                    <User className="h-5 w-5" />
                                </Link>
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => window.dispatchEvent(new CustomEvent('cart:open' as any))} aria-label="Cart" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 ? (
                                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                                        {String(cartCount)}
                                    </span>
                                ) : null}
                            </Button>

                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}


