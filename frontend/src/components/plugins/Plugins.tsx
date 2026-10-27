import { motion } from "framer-motion";
import { CustomLoaders, CustomUI } from "../index.ts";

export type Plugin = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    model?: string;
    specs: { label: string; value: string }[];
    price: string;
    available: boolean;
};
export const plugins: Plugin[] = [
    {
        id: "octave-synthesizer",
        name: "STOG 1",
        tagline: "A proudly South African synth, used in all genres.",
        description:
            "A multi octave synthesizer that stacks octaves on every note played.",
        model: "/models/octave-synth.png",
        specs: [
            { label: "Type", value: "Synthesizer" },
            { label: "Voices", value: "8 voices" },
            { label: "Presets", value: "50+" },
            { label: "Synthesis", value: "Digital" },
        ],
        price: "License Required",
        available: false
    },
];

const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

// for the homepage, simple plugin preview. i dont want too much noise
export const PluginsHomeSection = () => (
    <section id="synths" className="pl-4 w-full flex flex-col scroll-mt-4 gap-8">
        <motion.div {...reveal} className="flex flex-col gap-1">
            <CustomUI.MainHeaderDark title="Plugins & Vst's" />
        </motion.div>
        <PluginHomeListItems />
    </section>
);
export const PluginHomeListItems = () => {
    return (
        <motion.div {...reveal} className="grid grid-cols-1 gap-8">
            {plugins.length > 0 && plugins.map((plugin: Plugin) => (
                <section className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
                        <span className="text-md font-light text-umnyama/55">
                            <span className="text-md text-umnyama/60 font-bold">{plugin.price}</span>
                            <h2 className="text-md text-umnyama font-bold">{plugin.name}</h2>
                        </span>

                        <p className="text-xs text-umnyama/70">{plugin.tagline}</p>

                        <p className="text-xs text-umnyama/70">{plugin.description}</p>
                    </motion.div>

                    {plugin.available && <img src={plugin.model} className="w-200 h-60 shadow-xs shadow-gray-600 rounded-lg" />}
                    {!plugin.available && <CustomLoaders.TruckLoader />}

                </section>
            ))}
        </motion.div>
    )
};

// for the shop page
export const PluginsShopSection = () => (
    <section id="synths" className="pl-4 w-full flex flex-col scroll-mt-4 gap-8">
        <motion.div {...reveal} className="flex flex-col gap-1">
            <CustomUI.MainHeaderDark title="Plugins & Vst's" />
        </motion.div>
        <PluginShopListItems />
    </section>
);
export const PluginShopListItems = () => {
    return (
        <motion.div {...reveal} className="grid grid-cols-1 gap-8">
            {plugins.length > 0 && plugins.map((plugin: Plugin) => (
                <section className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
                        <span className="text-md font-light text-umnyama/55">
                            <span className="text-md text-umnyama/60 font-bold">{plugin.price}</span>
                            <h2 className="text-md text-umnyama font-bold">{plugin.name}</h2>
                        </span>

                        <p className="text-xs text-umnyama/70">{plugin.tagline}</p>

                        <p className="text-xs text-umnyama/70">{plugin.description}</p>

                        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                            {plugin.specs.map((spec) => (
                                <div key={spec.label} className="border-t border-umnyama/15 pt-2">
                                    <dt className="text-xs uppercase tracking-widest text-umnyama/50">{spec.label}</dt>
                                    <dd className="text-xs text-umnyama">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <button className="text-chalk bg-lush px-2 py-1 rounded-sm">
                            Add to cart
                        </button>
                    </motion.div>

                    {plugin.available && <img src={plugin.model} className="w-200 h-60 shadow-xs shadow-gray-600 rounded-lg" />}
                    {!plugin.available && <CustomLoaders.TruckLoader />}

                </section>
            ))}
        </motion.div>
    )
};