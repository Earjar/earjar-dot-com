export type Specs = {
    type: string;
    voices: string;
    presets: string;
    synthesis: string;
};

export type Plugin = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    cover?: string;
    specs: Specs[];
    price: string;
    available: boolean;
};

export type ShopItem = {
    id: string | number;
    name: string;
    price: number;
    specs: Specs[];
    cover: string;
};

export interface ShopProps
{
    shopItems: ShopItem[];
    addShopItem: (payload: ShopItem) => void;
    removeShopItem: (payload: ShopItem) => void;
    clearShopItems: () => void;
};

// dummy data
export const plugins: Plugin[] = [
    {
        id: "octave-synthesizer",
        name: "STOG 1",
        tagline: "A proudly South African synth, used in all genres.",
        description:
            "A multi octave synthesizer that stacks octaves on every note played.",
        cover: "/images/placeholder.png", ///models/octave-synth.png
        specs: [
            { type: "Synthesizer", voices: "8 voices", presets: "50+", synthesis: "Digital" }
        ],
        price: "License Required",
        available: false
    },
    {
        id: "multi-effects-pack",
        name: "Multi Effects Pack",
        tagline: "A handful of effects plugins for producers.",
        description:
            "This pack contains an EQ, Reverb, Delay and Compressor.",
        cover: "/images/placeholder.png", // /models/octave-synth.png
        specs: [
            { type: "Effects", voices: "8 voices", presets: "150+", synthesis: "Digital" }
        ],
        price: "R200.00",
        available: false
    },
];