import { useState } from 'react';

const ambassadors = [
    {
        name: 'Jordan Matthews',
        role: 'Senior Trainer',
        image: '/images/heroo1.jpg',
        tasks: 'Oversees athletic development programs and mentoring new trainers.',
        education: 'M.S. in Sports Science, University of Texas',
        details: 'Jordan brings 10+ years of experience in performance coaching, specializing in strength conditioning and injury prevention.',
    },
    {
        name: 'Alyssa Greene',
        role: 'Youth Engagement Lead',
        image: '/images/heroo2.jpg',
        tasks: 'Leads youth workshops, community fitness campaigns.',
        education: 'B.A. in Kinesiology, UCLA',
        details: 'Alyssa is passionate about youth sports and promoting physical literacy through community outreach.',
    },
    {
        name: 'Marcus Bennett',
        role: 'Technical Advisor',
        image: '/images/herro3.jpg',
        tasks: 'Provides technical expertise on training protocols.',
        education: 'PhD in Biomechanics, University of Florida',
        details: 'Marcus designs evidence-based programs that align with the latest sports science trends.',
    },
    {
        name: 'Alyssa Greene',
        role: 'Youth Engagement Lead',
        image: '/images/heroo2.jpg',
        tasks: 'Leads youth workshops, community fitness campaigns.',
        education: 'B.A. in Kinesiology, UCLA',
        details: 'Alyssa is passionate about youth sports and promoting physical literacy through community outreach.',
    },
    {
        name: 'Marcus Bennett',
        role: 'Technical Advisor',
        image: '/images/herro3.jpg',
        tasks: 'Provides technical expertise on training protocols.',
        education: 'PhD in Biomechanics, University of Florida',
        details: 'Marcus designs evidence-based programs that align with the latest sports science trends.',
    },
    {
        name: 'Marcus Bennett',
        role: 'Technical Advisor',
        image: '/images/herro3.jpg',
        tasks: 'Provides technical expertise on training protocols.',
        education: 'PhD in Biomechanics, University of Florida',
        details: 'Marcus designs evidence-based programs that align with the latest sports science trends.',
    },
];

const PTPAmbassadors = () => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleClose = () => setSelected(null);

    return (
        <section className="bg-white py-20 dark:bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <h2 className="mb-10 text-4xl font-bold text-gray-800 dark:text-white">Our PTP Ambassadors</h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {ambassadors.map((amb, index) => (
                        <div
                            key={index}
                            className="cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                            onClick={() => setSelected(index)}
                        >
                            <img src={amb.image} alt={amb.name} className="h-[360px] w-full object-cover" />
                            <div className="bg-white p-4 dark:bg-[#1b1b18]">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{amb.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{amb.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {selected !== null && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black px-4">
                        <div className="relative w-full max-w-lg rounded-xl bg-white p-6 dark:bg-[#1b1b18]">
                            <button onClick={handleClose} className="absolute top-3 right-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
                                &times;
                            </button>

                            <img
                                src={ambassadors[selected].image}
                                alt={ambassadors[selected].name}
                                className="mb-4 h-60 w-full rounded-lg object-cover"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{ambassadors[selected].name}</h3>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{ambassadors[selected].role}</p>

                            <div className="space-y-2 text-left text-sm text-gray-700 dark:text-gray-300">
                                <p>
                                    <strong>Tasks:</strong> {ambassadors[selected].tasks}
                                </p>
                                <p>
                                    <strong>Education:</strong> {ambassadors[selected].education}
                                </p>
                                <p>
                                    <strong>Details:</strong> {ambassadors[selected].details}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PTPAmbassadors;
