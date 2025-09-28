import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    return (
        <section className="relative overflow-hidden rounded-2xl p-[1px] gradient-secondary">
            <div className="relative rounded-2xl bg-white/80 p-8 dark:bg-[#0f0f10]/80">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/40 blur-3xl dark:bg-indigo-500/20" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-semibold sm:text-3xl">Stay in the loop</h3>
                    <p className="mt-2 text-black/70 dark:text-gray-300">Get product news, drops, and training tips.</p>
                    <form
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!email) return;
                            window.dispatchEvent(new CustomEvent('newsletter:submit' as any, { detail: { email } }));
                            setEmail('');
                        }}
                    >
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            type="email"
                            className="bg-white/70 backdrop-blur placeholder:text-gray-500 dark:bg-white/5"
                            required
                        />
                        <Button type="submit" className="btn-glow gradient-primary text-white">Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}


