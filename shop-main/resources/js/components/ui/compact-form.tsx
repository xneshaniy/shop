import * as React from 'react';

export function CompactForm({ children }: { children: React.ReactNode }) {
    return <form className="space-y-3 [&_.form-row]:grid [&_.form-row]:grid-cols-4 [&_.form-row]:items-center [&_.form-row]:gap-2">{children}</form>;
}

export function FormRow({ label, field, hint }: { label: React.ReactNode; field: React.ReactNode; hint?: React.ReactNode }) {
    return (
        <div className="form-row">
            <label className="col-span-1 text-sm text-muted-foreground">{label}</label>
            <div className="col-span-3">
                {field}
                {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
            </div>
        </div>
    );
}


