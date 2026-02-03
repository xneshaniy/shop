import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export type Column<T> = {
    key: keyof T | string;
    header: React.ReactNode;
    cell?: (row: T) => React.ReactNode;
    className?: string;
};

export function DataTable<T extends { id?: string | number }>({ columns, data, emptyText = 'No data' }: { columns: Column<T>[]; data: T[]; emptyText?: string }) {
    return (
        <div className="overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, idx) => (
                            <TableHead key={idx} className={col.className}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                                {emptyText}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rIdx) => (
                            <TableRow key={(row as any).id ?? rIdx}>
                                {columns.map((col, cIdx) => (
                                    <TableCell key={cIdx} className={col.className}>
                                        {col.cell ? col.cell(row) : (row as any)[col.key as any]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}


