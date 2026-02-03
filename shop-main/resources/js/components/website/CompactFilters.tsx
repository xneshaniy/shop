import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

type FilterOption = { label: string; value: string };

export default function CompactFilters({
    categories = [],
    brands = [],
    onChange,
}: {
    categories?: FilterOption[];
    brands?: FilterOption[];
    onChange?: (filters: { categories: string[]; brands: string[] }) => void;
}) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
        const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
        setArr(next);
        onChange?.({ categories: value in selectedBrands ? selectedCategories : next, brands: selectedBrands });
    };

    return (
        <aside className="space-y-4 rounded-xl border bg-card p-3">
            <div>
                <h4 className="text-sm font-semibold">Categories</h4>
                <div className="mt-2 space-y-2">
                    {categories.map((c) => (
                        <label key={c.value} className="flex items-center gap-2 text-sm">
                            <Checkbox checked={selectedCategories.includes(c.value)} onCheckedChange={() => toggle(selectedCategories, setSelectedCategories, c.value)} />
                            <span>{c.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            <Separator />
            <div>
                <h4 className="text-sm font-semibold">Brands</h4>
                <div className="mt-2 space-y-2">
                    {brands.map((b) => (
                        <label key={b.value} className="flex items-center gap-2 text-sm">
                            <Checkbox checked={selectedBrands.includes(b.value)} onCheckedChange={() => toggle(selectedBrands, setSelectedBrands, b.value)} />
                            <span>{b.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}


