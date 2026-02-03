import { Moon, Sun, Laptop } from 'lucide-react';
import { useAppearance, Appearance } from '@/hooks/use-appearance';
import { useState } from 'react';

export default function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();
    const [open, setOpen] = useState<boolean>(false);

    const modes: { key: Appearance; label: string; icon: JSX.Element }[] = [
        { key: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
        { key: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
        { key: 'system', label: 'System', icon: <Laptop className="h-4 w-4" /> },
    ];

    return (
        <div className="relative">
            <button
                aria-label="Toggle theme"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/40 px-3 text-xs font-medium text-gray-900 shadow-sm backdrop-blur transition hover:bg-white/60 dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/20"
                onClick={() => setOpen((v) => !v)}
            >
                {appearance === 'dark' ? <Moon className="h-4 w-4" /> : appearance === 'light' ? <Sun className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                <span className="hidden sm:block capitalize">{appearance}</span>
            </button>
            {open && (
                <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-black/5 bg-white/90 p-1 text-sm shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0f0f10]/90">
                    {modes.map((m) => (
                        <button
                            key={m.key}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition hover:bg-black/5 dark:hover:bg-white/5 ${appearance === m.key ? 'bg-black/5 dark:bg-white/5' : ''}`}
                            onClick={() => {
                                updateAppearance(m.key);
                                setOpen(false);
                            }}
                        >
                            {m.icon}
                            <span>{m.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


