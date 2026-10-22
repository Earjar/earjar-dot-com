// Catalog of 3D synth models shown on the landing page.
// To add a model: drop the .glb into public/models and add an entry here.
export type Synth = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    model: string;
    specs: { label: string; value: string }[];
    price: string;
};

export const synths: Synth[] = [
    {
        id: "octave-synthesizer",
        name: "Octave Synthesizer",
        tagline: "A proudly South African synth, used in all genres.",
        description:
            "A multi octave synthesizer that stacks octaves on every note played.",
        model: "/models/octave-synth.glb",
        specs: [
            { label: "Type", value: "Synthesizer" },
            { label: "Voices", value: "8 voices" },
            { label: "Presets", value: "50+" },
            { label: "Synthesis", value: "Digital" },
        ],
        price: "R150.00"
    },
];
