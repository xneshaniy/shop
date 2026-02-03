import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const stories = [
    {
        name: 'David Thompson',
        role: 'U16 Midfielder',
        videoThumbnail: '/images/heroo1.jpg',
        videoUrl: '#', // Replace with actual video/player
        quote: 'Coach Sarah helped me improve my agility and decision-making on the field. I’ve never felt more confident!',
    },
    {
        name: 'Amelia Jones',
        role: 'U18 Goalkeeper',
        videoThumbnail: '/images/heroo2.jpg',
        videoUrl: '#',
        quote: 'Their sessions were a game-changer. I got scouted after just 3 months of focused training!',
    },
    {
        name: 'Noah Williams',
        role: 'College Forward',
        videoThumbnail: '/images/herro3.jpg',
        videoUrl: '#',
        quote: 'Highly professional and motivating. My speed and vision improved drastically.',
    },
    {
        name: 'Amelia Jones',
        role: 'U18 Goalkeeper',
        videoThumbnail: '/images/heroo2.jpg',
        videoUrl: '#',
        quote: 'Their sessions were a game-changer. I got scouted after just 3 months of focused training!',
    },
    {
        name: 'Noah Williams',
        role: 'College Forward',
        videoThumbnail: '/images/herro3.jpg',
        videoUrl: '#',
        quote: 'Highly professional and motivating. My speed and vision improved drastically.',
    },
    {
        name: 'Amelia Jones',
        role: 'U18 Goalkeeper',
        videoThumbnail: '/images/heroo2.jpg',
        videoUrl: '#',
        quote: 'Their sessions were a game-changer. I got scouted after just 3 months of focused training!',
    },
];

const StudentStories = () => {
    return (
        <section className="bg-[#fefefe] py-16 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-[#1b1b18] dark:text-white">What Client Says</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Real student stories from our training community.</p>
                    <p className="mx-auto mt-1 max-w-xl text-sm text-gray-500 dark:text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It’s been the industry's standard for years.
                    </p>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stories.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-[#111] dark:text-white"
                        >
                            <div className="relative h-48 w-full">
                                <img src={story.videoThumbnail} alt={`${story.name}'s story`} className="h-full w-full object-cover" />
                                <a
                                    href={story.videoUrl}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/60"
                                >
                                    <PlayCircle className="h-14 w-14 text-white transition duration-300 hover:scale-110" />
                                </a>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{story.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{story.role}</p>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">“{story.quote}”</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="/signup"
                        className="inline-block rounded-full bg-[#1b1b18] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#33332c]"
                    >
                        Sign Up Now!
                    </a>
                </div>
            </div>
        </section>
    );
};

export default StudentStories;
