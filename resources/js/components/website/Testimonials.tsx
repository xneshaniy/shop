import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
    {
        name: 'Emily Carter',
        role: 'Student Athlete',
        image: '/images/heroo1.jpg',
        feedback: 'Training at zaicomai has taken my game to the next level. The coaches are knowledgeable and push you to be your best!',
    },
    {
        name: 'James Lee',
        role: 'Youth Player',
        image: '/images/heroo2.jpg',
        feedback: 'I love how the sessions are tailored for me. It’s fun and challenging at the same time. Highly recommended!',
    },
    {
        name: 'Sophia Moore',
        role: 'Parent of Trainee',
        image: '/images/herro3.jpg',
        feedback: 'My son has grown tremendously in skill and confidence. The team genuinely cares about development on and off the field.',
    },
    {
        name: 'Mason Brown',
        role: 'High School Coach',
        image: '/images/heroo1.jpg',
        feedback: 'Professional, focused, and inspiring. The best coaching experience I’ve ever partnered with.',
    },
    {
        name: 'Lily Smith',
        role: 'Youth Athlete',
        image: '/images/heroo2.jpg',
        feedback: 'Every session is motivating and personalized. I’ve improved in just weeks!',
    },
];

const Testimonials = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = direction === 'left' ? -320 : 320;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-gray-50 py-20 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <motion.h2
                    className="mb-3 text-4xl font-bold text-[#1b1b18] dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    What Clients Say
                </motion.h2>
                <motion.p
                    className="mx-auto mb-12 max-w-2xl text-base text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Real stories from real students and families sharing their journey with our training.
                </motion.p>

                <div className="relative">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md dark:bg-[#1b1b18]"
                        aria-label="Scroll testimonials left"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="no-scrollbar flex snap-x gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {testimonials.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className="max-w-sm min-w-[300px] snap-start rounded-2xl bg-white p-6 text-left shadow-lg transition-all duration-300 hover:scale-[1.02] dark:bg-[#1b1b18] dark:text-white"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-14 w-14 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">“{item.feedback}”</p>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md dark:bg-[#1b1b18]"
                        aria-label="Scroll testimonials right"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
