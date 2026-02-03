import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const trainers = [
    {
        name: 'Sarah Fox',
        role: 'Football Coach',
        description: 'Outstanding dedication and inspiring energy that transformed our training sessions.',
        image: '/images/heroo1.jpg',
    },
    {
        name: 'Liam Carter',
        role: 'Strength Coach',
        description: 'Led innovative fitness plans and demonstrated leadership throughout the month.',
        image: '/images/heroo2.jpg',
    },
    {
        name: 'Emily Dawson',
        role: 'Youth Trainer',
        description: 'Passionate mentoring of young athletes and excellent training results.',
        image: '/images/herro3.jpg',
    },
    {
        name: 'Liam Carter',
        role: 'Strength Coach',
        description: 'Led innovative fitness plans and demonstrated leadership throughout the month.',
        image: '/images/heroo2.jpg',
    },
    {
        name: 'Emily Dawson',
        role: 'Youth Trainer',
        description: 'Passionate mentoring of young athletes and excellent training results.',
        image: '/images/herro3.jpg',
    },
    {
        name: 'Liam Carter',
        role: 'Strength Coach',
        description: 'Led innovative fitness plans and demonstrated leadership throughout the month.',
        image: '/images/heroo2.jpg',
    },
];

const StarCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = scrollRef.current.offsetWidth * 0.6;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="relative bg-[#f9f9f9] py-16 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-2 flex justify-center text-yellow-500">
                            <Award className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#1b1b18] dark:text-white">🌟 Star of the Month</h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Celebrating our outstanding trainers</p>
                    </motion.div>
                </div>

                {/* Scroll Buttons */}
                <div className="relative">
                    <button
                        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 md:-left-6 dark:bg-[#111] dark:hover:bg-[#222]"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>
                    <button
                        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 md:-right-6 dark:bg-[#111] dark:hover:bg-[#222]"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
                    </button>

                    {/* Cards */}
                    <div ref={scrollRef} className="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-1 pt-2 pb-4">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={index}
                                className="min-w-[280px] flex-shrink-0 rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl dark:bg-[#111] dark:text-white"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="mx-auto mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-yellow-400"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/fallback-avatar.png';
                                    }}
                                />
                                <h3 className="text-lg font-semibold">{trainer.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{trainer.role}</p>
                                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{trainer.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StarCarousel;
