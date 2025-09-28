import * as React from 'react';

type Point = { x: number; y: number };

interface MiniAreaChartProps {
    data: number[];
    width?: number;
    height?: number;
    className?: string;
}

export function MiniAreaChart({ data, width = 600, height = 220, className = '' }: MiniAreaChartProps) {
    if (!data.length) return null;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const pad = 16;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;
    const stepX = innerW / (data.length - 1 || 1);
    const norm = (v: number) => (max === min ? 0.5 : (v - min) / (max - min));
    const points: Point[] = data.map((v, i) => ({ x: pad + i * stepX, y: pad + innerH - norm(v) * innerH }));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    const area = `${path} L ${pad + innerW} ${pad + innerH} L ${pad} ${pad + innerH} Z`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className={className}>
            <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>
            <g fill="none" stroke="currentColor" color="rgb(99,102,241)" className="dark:text-violet-400 text-indigo-500">
                <path d={area} fill="url(#areaGradient)" />
                <path d={path} strokeWidth="2" />
            </g>
        </svg>
    );
}


