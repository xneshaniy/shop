import React from 'react';

type ResponsiveImageProps = {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    sizes?: string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'sync' | 'auto';
    priority?: boolean;
};

export default function ResponsiveImage({
    src,
    alt,
    className = '',
    width,
    height,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px',
    loading = 'lazy',
    decoding = 'async',
    priority = false,
}: ResponsiveImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={priority ? 'eager' : loading}
            decoding={decoding}
            sizes={sizes}
            srcSet={[
                `${src} 640w`,
                `${src} 768w`,
                `${src} 1024w`,
                `${src} 1280w`,
                `${src} 1536w`,
            ].join(', ')}
        />
    );
}


