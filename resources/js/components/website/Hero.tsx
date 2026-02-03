import { AnimatedCarousel } from '@/components/ui/animated-carousel';

const slides = [
    {
        id: '1',
        title: 'Train Like a Champion',
        subtitle: 'Personalized coaching to level up your performance.',
        description: 'Elite programs for speed, strength, and skill. Built for progression.',
        image: '/images/heroo1.jpg',
        ctaText: 'Book Your Session',
        ctaLink: '/booking',
        gradient: 'gradient-primary',
    },
    {
        id: '2',
        title: 'Speed. Strength. Skill.',
        subtitle: 'Data-driven development for all ages.',
        description: 'From fundamentals to advanced drills, train with intention and clarity.',
        image: '/images/heroo2.jpg',
        ctaText: 'Explore Programs',
        ctaLink: '/products',
        gradient: 'gradient-secondary',
    },
    {
        id: '3',
        title: 'Join the Journey to Greatness',
        subtitle: 'Transform your game with expert guidance.',
        description: 'Track progress, stay consistent, and unlock your peak performance.',
        image: '/images/herro3.jpg',
        ctaText: 'Get Started',
        ctaLink: '/register',
        gradient: 'gradient-warm',
    },
];

export default function Hero() {
    return (
        <section className="relative w-full">
            <AnimatedCarousel slides={slides} autoPlay autoPlayInterval={6000} showControls showIndicators={false} />
        </section>
    );
}
