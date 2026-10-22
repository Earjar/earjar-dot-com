import { useRef } from "react";
import { motion } from "framer-motion";
import { HeaderTools, Footer, CustomUI, SceneCanvas, SynthViewer } from "../components/index.ts";
import { useGLTF } from "@react-three/drei";
import { synths, type Synth } from "../data/synths.ts";

synths.forEach((synth) => useGLTF.preload(synth.model));

const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Home() {
    return (
        <>
            <SceneCanvas />
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
        </>
    );
};

const SynthShowcase = () => (
    <section id="synths" className="w-full flex flex-col scroll-mt-4 gap-4">
        <motion.div {...reveal} className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.3em] text-nguni">The collection</span>
            <CustomUI.MainHeaderDark title="Synths & drum machines in 3D" />
            <CustomUI.SubHeader title="Scroll to turn them, drag to spin them." />
        </motion.div>

        {synths.map((synth, i) => (
            <SynthSection key={synth.id} synth={synth} index={i} />
        ))}
    </section>
);
const SynthSection: React.FC<{ synth: Synth; index: number }> = ({ synth, index }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const flipped = index % 2 === 1;

    return (
        <section ref={sectionRef} className="w-full grid grid-cols-1 md:grid-cols-5 items-center gap-6 py-2">
            <motion.div {...reveal} className={`md:col-span-2 flex flex-col gap-2 ${flipped ? "md:order-2" : ""}`}>
                <span className="text-md font-light text-umnyama/55">
                    <span className="text-md text-umnyama/60 font-bold">{synth.price}</span>
                    <h2 className="text-md text-umnyama font-bold">{synth.name}</h2>
                </span>
                
                <p className="text-xs text-umnyama/70">{synth.tagline}</p>

                <p className="text-xs text-umnyama/70">{synth.description}</p>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                    {synth.specs.map((spec) => (
                        <div key={spec.label} className="border-t border-umnyama/15 pt-2">
                            <dt className="text-xs uppercase tracking-widest text-umnyama/50">{spec.label}</dt>
                            <dd className="text-xs text-umnyama">{spec.value}</dd>
                        </div>
                    ))}
                </dl>
            </motion.div>

            <div className={`md:col-span-3 w-full h-[50vh] md:h-full ${flipped ? "md:order-1" : ""}`}>
                <SynthViewer url={synth.model} sectionRef={sectionRef} />
            </div>
        </section>
    );
};