import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid3X3, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export default function ProductListToolbar({
    total = 0,
    initialQuery = '',
    initialSort = 'latest',
    onChange,
    defaultView = 'grid' as ViewMode,
}: {
    total?: number;
    initialQuery?: string;
    initialSort?: string;
    onChange?: (state: { query: string; sort: string; view: ViewMode }) => void;
    defaultView?: ViewMode;
}) {
    const [query, setQuery] = useState(initialQuery);
    const [sort, setSort] = useState(initialSort);
    const [view, setView] = useState<ViewMode>(defaultView);

    useEffect(() => {
        onChange?.({ query, sort, view });
    }, [query, sort, view]);

    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search products"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-9 w-56"
                />
                <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="h-9 w-40">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground sm:block">{total} items</span>
                <Button variant={view === 'grid' ? 'default' : 'outline'} size="icon" className="h-9 w-9" onClick={() => setView('grid')} aria-label="Grid view">
                    <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant={view === 'list' ? 'default' : 'outline'} size="icon" className="h-9 w-9" onClick={() => setView('list')} aria-label="List view">
                    <List className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}


