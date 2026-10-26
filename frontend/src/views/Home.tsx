import { motion } from "framer-motion";
import { HeaderTools, Footer, CustomUI, SynthViewer } from "../components/index.ts";

const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Home() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-start gap-6 py-8">
                <AboutSection />
                <div className="relative w-full flex flex-col items-start gap-4">
                    <CustomUI.MainHeader title="The Collection" />
                    <SynthSection />
                </div>
            </section>

            <Footer />
        </main>
    );
};

const AboutSection = () => {
    return (
        <motion.div {...reveal} className="flex flex-col gap-5 text-left">
            <CustomUI.GlitchedHeader title="Bringing the funk back to music." />
            <p className="text-sm md:text-lg max-w-lg text-umnyama/80">
                At Earjar, our mission is simple. Bring back the weird, funky retro aesthetic to music.
            </p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-umnyama/70">Reach out:</span>
                    <a href="mailto:earjaraudio@gmail.com" aria-label="Email Earjar">
                        <img src="/images/gmail.png" className="w-5 h-5" alt="" />
                    </a>
                    <a href="https://www.linkedin.com/company/144578070" aria-label="Earjar on LinkedIn">
                        <img src="/images/linkedin.png" className="w-5 h-5" alt="" />
                    </a>
                </div>
            </div>
        </motion.div>
    )
};
const SynthSection = () => (
    <section id="synths" className="pl-4 w-full flex flex-col scroll-mt-4 gap-8">
        <motion.div {...reveal} className="flex flex-col gap-1">
            <CustomUI.MainHeaderDark title="Plugins & Vst's" />
        </motion.div>
        <SynthViewer />
    </section>
);