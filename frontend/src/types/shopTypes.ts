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
    // price in cents (ZAR), null when the plugin needs a license instead of a sale
    price: number | null;
    available: boolean;
};

export type ShopItem = {
    id: string;
    name: string;
    // price in cents (ZAR)
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

export const toShopItem = (plugin: Plugin): ShopItem => ({
    id: plugin.id,
    name: plugin.name,
    price: plugin.price ?? 0,
    specs: plugin.specs,
    cover: plugin.cover ?? "/images/placeholder.png"
});

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
        price: null,
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
        price: 20000,
        available: false
    },
];