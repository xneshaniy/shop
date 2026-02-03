export async function compressImage(file: File, opts?: { maxWidth?: number; maxHeight?: number; quality?: number; mimeType?: string }): Promise<File> {
    const { maxWidth = 1600, maxHeight = 1600, quality = 0.82, mimeType } = opts || {};
    const img = await fileToImage(file);
    const { width, height } = fitWithin(img.width, img.height, maxWidth, maxHeight);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);
    const type = mimeType || file.type || 'image/jpeg';
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.(png|jpg|jpeg|webp)$/i, '.jpg'), { type, lastModified: Date.now() });
}

function fitWithin(w: number, h: number, maxW: number, maxH: number): { width: number; height: number } {
    const ratio = Math.min(maxW / w, maxH / h, 1);
    return { width: Math.round(w * ratio), height: Math.round(h * ratio) };
}

function fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = String(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


