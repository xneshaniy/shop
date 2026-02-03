import { motion } from 'framer-motion';

interface CheckoutStepsProps {
    step: number; // 1..4
}

const steps = ['Cart', 'Details', 'Payment', 'Review'];

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
    return (
        <div className="mb-4 w-full max-w-4xl">
            <div className="relative">
                <div className="absolute left-0 right-0 top-4 h-0.5 bg-black/10 dark:bg-white/10" />
                <div className="relative z-10 grid grid-cols-4">
                    {steps.map((label, idx) => {
                        const current = idx + 1;
                        const active = current <= step;
                        return (
                            <div key={label} className="flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0.7 }}
                                    animate={{ scale: active ? 1 : 0.95, opacity: 1 }}
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold sm:h-8 sm:w-8 sm:text-xs ${active ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white' : 'bg-black/5 text-black/70 dark:bg-white/10 dark:text-white/70'}`}
                                >
                                    {current}
                                </motion.div>
                                <div className="ml-2 hidden text-xs font-medium sm:block sm:text-sm">{label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


