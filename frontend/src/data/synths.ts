// Catalog of 3D synth models shown on the landing page.
// To add a model: drop the .glb into public/models and add an entry here.
export type Synth = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    model: string;
    specs: { label: string; value: string }[];
    accent: "lush" | "ambers" | "hazy" | "oled" | "nguni" | "khala";
    credit?: { title: string; author: string; authorUrl: string; source: string; license: string };
};

export const synths: Synth[] = [
    {
        id: "tr-909",
        name: "TR-909 Rhythm Composer",
        tagline: "The drum machine that built house and techno.",
        description:
            "A hybrid of analog circuits and sampled cymbals, the 909's punchy kick and crisp hats still define dance music. "
            + "Spin it around and get a closer look at the step sequencer that started it all.",
        model: "/models/tr-909_rhythm_composer.glb",
        specs: [
            { label: "Type", value: "Drum machine" },
            { label: "Voices", value: "11 instruments" },
            { label: "Sequencer", value: "16-step" },
            { label: "Synthesis", value: "Analog + PCM" },
        ],
        accent: "lush",
        credit: {
            title: "tr-909 rhythm composer",
            author: "kuszoid",
            authorUrl: "https://sketchfab.com/kuszoid",
            source: "https://sketchfab.com/3d-models/tr-909-rhythm-composer-291b1d94c3704cd082ca844d35c12ff7",
            license: "CC BY 4.0",
        },
    },
];
