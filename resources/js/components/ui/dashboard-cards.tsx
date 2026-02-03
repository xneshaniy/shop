import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function KpiCard({ title, value, delta, hint }: { title: string; value: string; delta?: string; hint?: string }) {
    return (
        <Card className="card-3d">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-semibold">{value}</div>
                {delta && <div className="mt-1 text-xs text-emerald-600">{delta}</div>}
                {hint && <div className="mt-2 text-xs text-muted-foreground">{hint}</div>}
            </CardContent>
        </Card>
    );
}


