// Reads the brand colors defined in index.css so the 3D scenes share the same palette.
export type BrandColor =
    | "nguni" | "lush" | "bone"
    | "umnyama" | "hazy" | "khala"
    | "ash" | "indigo_bloom" | "chalk" | "oled" | "ambers";

export const brandColor = (name: BrandColor): string => {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${name}`)
        .trim();
    // THREE.Color does not understand 8-digit hex (e.g. #66371fff), so drop the alpha channel
    return value.length === 9 ? value.slice(0, 7) : value || "#ffffff";
};
