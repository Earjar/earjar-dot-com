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
                <motion.div {...reveal} className="flex flex-col gap-5 text-left">
                    <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-nguni">Earjar Pty Ltd· South Africa</span>
                    <CustomUI.GlitchedHeader title="Proudly South African audio tech." />
                    <p className="text-sm md:text-lg max-w-lg text-umnyama/80">
                        At Earjar, our mission is simple. Bring back the weird and retro aesthetic of music gear.<br></br>
                        We're a startup based in South Africa, trying to bring that idea to life.
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

                <div className="relative w-full ">
                    <SynthShowcase />
                </div>
            </section>

            <Footer />
        </main>
    );
};

const SynthShowcase = () => (
    <section id="synths" className="w-full flex flex-col scroll-mt-4 gap-4">
        <motion.div {...reveal} className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.3em] text-nguni">The collection</span>
            <CustomUI.MainHeaderDark title="Synths & drum machines in 3D" />
            <CustomUI.SubHeader title="Scroll to turn them, drag to spin them." />
        </motion.div>

        <SynthViewer />
    </section>
);