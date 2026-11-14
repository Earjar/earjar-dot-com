import { motion } from "framer-motion";
import { Footer } from "../components/index.ts";
import { COMPANY } from "../constants/company.ts";

/*
 * Holding page shown while Home, Shop and Checkout are hidden behind
 * SHOW_WIP_PAGES (see constants/features.ts).
 */
export default function Landing() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-between gap-4 px-4">
            <motion.section
                className="w-full flex-1 flex flex-col items-center justify-center gap-6 py-24 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <img src="/images/logo.png" alt="Earjar" className="w-28 h-28 md:w-36 md:h-36 animate-breathe" />

                <h1 className="text-2xl md:text-4xl font-light text-umnyama">
                    Products are coming soon :)
                </h1>

                <p className="max-w-md text-sm md:text-base font-light text-umnyama/70">
                    Earjar is building plugins, VSTs and tools for producers, engineers and music enthusiasts.
                </p>

                <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-sm text-hazy underline decoration-umnyama/30 hover:decoration-umnyama"
                >
                    {COMPANY.email}
                </a>
            </motion.section>

            <Footer />
        </main>
    );
};
