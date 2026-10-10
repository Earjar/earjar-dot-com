import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MoveHorizontal } from "lucide-react";
import { DrumPad, HeaderTools, Footer, CustomUI, SceneCanvas, SynthViewer, EqualizerHero } from "../components/index.ts";
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

                <AboutHero />
                <AboutPillars />
                <SynthShowcase />
                <BrowserDemos />

                <Footer />
            </main>
        </>
    );
};

const AboutHero = () => (
    <section className="w-full min-h-[80vh] grid grid-cols-1 md:grid-cols-2 items-center gap-6 py-8">
        <motion.div {...reveal} className="flex flex-col gap-5 text-left">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-nguni">Earjar · Cape Town</span>
            <CustomUI.GlitchedHeader title="Fun music gear, made" glitchedWord="weird." />
            <p className="text-sm md:text-lg max-w-lg text-umnyama/80">
                At Earjar, our mission is simple. Bring back the weird and retro aesthetic of music gear.
                We're a startup based in Cape Town South Africa, trying to bring that idea to life.
            </p>
            <div className="flex flex-wrap items-center gap-4">
                <a
                    href="#synths"
                    className="flex items-center gap-2 px-5 py-2.5 bg-umnyama text-bone text-sm rounded-sm hover:bg-lush transition-colors"
                >
                    Explore the gear <ArrowDown size={16} />
                </a>
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

        {/* 3D equalizer, rendered by the shared SceneCanvas */}
        <div className="relative w-full h-[45vh] md:h-[65vh]">
            <EqualizerHero />
        </div>
    </section>
);

const pillars = [
    { title: "Browser instruments", body: "Playable demos built on our open source Audio Engine (TypeScript).", accent: "bg-lush" },
    { title: "VSTs", body: "Windows & Mac compatible digital gear, on the way.", accent: "bg-ambers" },
    { title: "Hardware", body: "Synthesizers and music gear with a retro soul.", accent: "bg-hazy" },
];
const AboutPillars = () => (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
            {...reveal}
            className="md:col-span-3 h-40 md:h-56 bg-[url('/images/synth-live.jpg')] bg-cover bg-center rounded-md overflow-hidden"
        >
            <div className="w-full h-full bg-nguni/50 flex items-end p-4 md:p-6">
                <h2 className="text-bone text-xl md:text-4xl font-light">Digital and physical music gear.</h2>
            </div>
        </motion.div>
        {pillars.map((pillar, i) => (
            <motion.div
                key={pillar.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
                className="flex flex-col gap-2 bg-bone/40 border border-ash/15 rounded-sm p-4"
            >
                <div className={`h-1 w-10 ${pillar.accent}`} />
                <h3 className="text-base md:text-lg text-umnyama">{pillar.title}</h3>
                <p className="text-xs md:text-sm text-umnyama/70">{pillar.body}</p>
            </motion.div>
        ))}
    </section>
);

const SynthShowcase = () => (
    <section id="synths" className="w-full flex flex-col pt-16 scroll-mt-4">
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

const accentBg: Record<Synth["accent"], string> = {
    lush: "bg-lush", ambers: "bg-ambers", hazy: "bg-hazy", oled: "bg-oled", nguni: "bg-nguni", khala: "bg-khala",
};
const SynthSection: React.FC<{ synth: Synth; index: number }> = ({ synth, index }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const flipped = index % 2 === 1;

    return (
        <section ref={sectionRef} className="w-full min-h-screen grid grid-cols-1 md:grid-cols-5 items-center gap-6 py-12">
            <motion.div {...reveal} className={`md:col-span-2 flex flex-col gap-4 ${flipped ? "md:order-2" : ""}`}>
                <span className="text-5xl md:text-7xl font-light text-umnyama/15">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <div className={`h-1 w-14 ${accentBg[synth.accent]}`} />
                <h2 className="text-2xl md:text-4xl text-umnyama">{synth.name}</h2>
                <p className="text-sm md:text-base text-nguni">{synth.tagline}</p>
                <p className="text-xs md:text-sm text-umnyama/75">{synth.description}</p>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                    {synth.specs.map((spec) => (
                        <div key={spec.label} className="border-t border-umnyama/15 pt-2">
                            <dt className="text-[10px] uppercase tracking-widest text-umnyama/50">{spec.label}</dt>
                            <dd className="text-sm text-umnyama">{spec.value}</dd>
                        </div>
                    ))}
                </dl>

                <span className="flex items-center gap-2 text-xs text-umnyama/50">
                    <MoveHorizontal size={14} /> Drag the model to spin it
                </span>
                {synth.credit && (
                    <p className="text-[10px] text-umnyama/50">
                        3D model "<a href={synth.credit.source} target="_blank" rel="noopener noreferrer" className="underline">{synth.credit.title}</a>"
                        {" "}by <a href={synth.credit.authorUrl} target="_blank" rel="noopener noreferrer" className="underline">{synth.credit.author}</a>,
                        {" "}licensed {synth.credit.license}.
                    </p>
                )}
            </motion.div>

            <div className={`md:col-span-3 w-full h-[50vh] md:h-[75vh] ${flipped ? "md:order-1" : ""}`}>
                <SynthViewer url={synth.model} accent={synth.accent} sectionRef={sectionRef} />
            </div>
        </section>
    );
};

type BrowserGear = {
    id: string;
    title: string;
    reactNode: React.ReactNode;
};
const browserGear: BrowserGear[] = [
    { id: "drum-pad", title: "Jam Pod", reactNode: <DrumPad /> },
];
const BrowserDemos = () => {
    const [gearIdx, setGearIdx] = useState<number>(0);
    const next = () => setGearIdx((i) => (i + 1) % browserGear.length);
    const prev = () => setGearIdx((i) => (i - 1 + browserGear.length) % browserGear.length);
    const gear = browserGear[gearIdx];

    return (
        <section className="w-full flex flex-col items-start gap-2 bg-bone/20 border border-ash/20 px-4 py-2 rounded-sm mt-8">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeaderDark title="Playable Browser Demos" />
                <CustomUI.SubHeader title="These are built on top of our Audio Engine (Typescript) library" />
            </div>
            <div className="w-full flex items-center justify-between p-2">
                <button onClick={prev} aria-label="Previous demo"><img src="/images/right-arrow.png" className="w-8 h-8 md:w-15 md:h-15 rotate-y-180" alt="" /></button>
                <div className="flex flex-col gap-2 p-1">
                    <CustomUI.SubHeader title={gear.title} />
                    {gear.reactNode}
                </div>
                <button onClick={next} aria-label="Next demo"><img src="/images/right-arrow.png" className="w-8 h-8 md:w-15 md:h-15" alt="" /></button>
            </div>
        </section>
    );
};
