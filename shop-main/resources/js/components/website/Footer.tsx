import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0f0f10]">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 text-[#1b1b18] sm:grid-cols-2 md:grid-cols-4 dark:text-white">
                <div>
                    <h2 className="mb-3 text-2xl font-bold">zaicomai</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Personalized football training from certified professionals. Train hard, play smart, and reach your peak.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">Certified Coaches</span>
                        <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-indigo-700 dark:text-indigo-300">Data-Driven</span>
                        <span className="rounded-full bg-fuchsia-500/15 px-2 py-0.5 text-fuchsia-700 dark:text-fuchsia-300">Community</span>
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-base font-semibold uppercase">Navigation</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:underline">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/booking" className="hover:underline">
                                Booking
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-3 text-base font-semibold uppercase">Train With Us</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>1-on-1 Coaching</li>
                        <li>Speed & Agility</li>
                        <li>Position Drills</li>
                        <li>Off-Season Programs</li>
                        <li>Team Clinics</li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-3 text-base font-semibold uppercase">Connect</h3>
                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">support@zaicomai.com</p>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="h-6 w-6 hover:text-blue-600" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter className="h-6 w-6 hover:text-sky-500" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="h-6 w-6 hover:text-pink-500" />
                        </a>
                        <a href="mailto:support@zaicomai.com" aria-label="Email">
                            <Mail className="h-6 w-6 hover:text-green-600" />
                        </a>
                    </div>
                    <form className="mt-6 flex max-w-sm items-center gap-2">
                        <input type="email" required placeholder="Your email" className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-[#18181b] dark:placeholder:text-gray-400" />
                        <button type="submit" className="btn-glow rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm text-white">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-5 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                &copy; {currentYear} zaicomai. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
