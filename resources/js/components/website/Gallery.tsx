import { motion } from 'framer-motion';

const galleryItems = [
    { src: '/images/heroo1.jpg', type: 'image', size: 'vertical' },
    { src: '/images/heroo2.jpg', type: 'image', size: 'horizontal' },
    { src: '/images/herro3.jpg', type: 'video', size: 'vertical' },
    { src: '/images/heroo1.jpg', type: 'image', size: 'horizontal' },
    { src: '/images/heroo2.jpg', type: 'image', size: 'vertical' },
    { src: '/images/herro3.jpg', type: 'video', size: 'horizontal' },
    { src: '/images/heroo2.jpg', type: 'image', size: 'vertical' },
];

const Gallery = () => {
    return (
        <section className="bg-white py-14 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-10 text-center text-3xl font-bold text-[#1b1b18] dark:text-white">Our Gallery</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative overflow-hidden rounded-2xl shadow-md ${
                                item.size === 'horizontal' ? 'col-span-2 row-span-1' : 'row-span-2'
                            }`}
                        >
                            <img
                                src={item.src}
                                alt={`Gallery item ${index}`}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="rounded-full border-2 border-white p-3 text-white">▶</div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
