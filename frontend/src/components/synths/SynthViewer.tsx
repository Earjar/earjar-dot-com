import { motion } from "framer-motion";
import { CustomLoaders } from "../index.ts";

export type Synth = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    model?: string;
    specs: { label: string; value: string }[];
    price: string;
};
export const synths: Synth[] = [
    // {
    //     id: "octave-synthesizer",
    //     name: "STOG 1",
    //     tagline: "A proudly South African synth, used in all genres.",
    //     description:
    //         "A multi octave synthesizer that stacks octaves on every note played.",
    //     model: "/models/octave-synth.png",
    //     specs: [
    //         { label: "Type", value: "Synthesizer" },
    //         { label: "Voices", value: "8 voices" },
    //         { label: "Presets", value: "50+" },
    //         { label: "Synthesis", value: "Digital" },
    //     ],
    //     price: "TBA"
    // },
];
export const comingSoonSynths: Synth[] = [
    {
        id: "1",
        name: "STOG 1",
        tagline: "A proudly South African synth, used in all genres.",
        description:
            "A multi octave synthesizer that stacks octaves on every note played.",
        specs: [
            { label: "Type", value: "Synthesizer" },
            { label: "Voices", value: "8 voices" },
            { label: "Presets", value: "50+" },
            { label: "Synthesis", value: "Digital" },
        ],
        price: "TBA"
    },
];

const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const SynthViewer = () => {
    return (
        <motion.div {...reveal} className="grid grid-cols-1 gap-8">
            {synths.length > 0 && synths.map((synth: Synth) => (
                <section className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
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

                    <img src={synth.model} className="w-200 h-60 shadow-xs shadow-gray-600 rounded-lg" />

                </section>
            ))}
            {comingSoonSynths.length > 0 && comingSoonSynths.map((synth: Synth) => (
                <section className="w-full flex flex-col md:flex-row items-center items-start md:items-center justify-between gap-4">
                    <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
                        <span className="text-md font-light text-umnyama/55">
                            <h2 className="text-md text-umnyama font-bold">{synth.name}</h2>
                        </span>

                        <p className="text-xs text-umnyama/70">{synth.tagline}</p>

                        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                            {synth.specs.map((spec) => (
                                <div key={spec.label} className="border-t border-umnyama/15 pt-2">
                                    <dt className="text-xs uppercase tracking-widest text-umnyama/50">{spec.label}</dt>
                                    <dd className="text-xs text-umnyama">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    <CustomLoaders.TruckLoader />

                </section>
            ))}
        </motion.div>
    )
}
export default SynthViewer