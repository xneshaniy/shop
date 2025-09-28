import { motion, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

const logos = ['/images/heroo1.jpg', '/images/heroo2.jpg', '/images/herro3.jpg', '/images/heroo1.jpg', '/images/heroo2.jpg', '/images/herro3.jpg'];

const ClubLogos = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useAnimationFrame(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        container.scrollLeft += 0.5;

        if (container.scrollLeft >= inner.scrollWidth / 2) {
            container.scrollLeft = 0;
        }
    });

    return (
        <section className="relative overflow-hidden bg-white py-12 dark:bg-[#0a0a0a]">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#1b1b18] dark:text-white">Trusted by Clubs & Academies</h2>

            <div ref={containerRef} className="relative w-full overflow-hidden">
                <motion.div ref={innerRef} className="flex w-max gap-10 px-6 py-4">
                    {[...logos, ...logos].map((src, index) => (
                        <motion.div
                            key={index}
                            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-[#111]"
                            whileHover={{ scale: 1.1 }}
                        >
                            <img src={src} alt={`Club logo ${index}`} className="h-full w-full object-cover" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClubLogos;
