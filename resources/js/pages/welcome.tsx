import ClubLogos from '@/components/website/ClubLogos';
import Gallery from '@/components/website/Gallery';
import Hero from '@/components/website/Hero';
import StarCarousel from '@/components/website/StarOfTheMonth';
import StudentStories from '@/components/website/StudentStories';
import Testimonials from '@/components/website/Testimonials';
import PTPAmbassadors from '@/components/website/TPAmbassadors';
import WebLayout from '@/layouts/website/web-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    console.log("🚀 ~ Welcome ~ auth:", auth)

    return (
        <>
            <Head title="zaicomai">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <WebLayout>
                <Hero />
                <ClubLogos />
                <StarCarousel />
                <StudentStories />
                <Gallery />
                <Testimonials />
                <PTPAmbassadors />
            </WebLayout>
        </>
    );
}
