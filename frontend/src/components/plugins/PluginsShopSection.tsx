import { motion } from "framer-motion";
import { CustomUI } from "../index.ts";
import { useShopState } from "../../store/zustStore.ts";
import { type Plugin, plugins } from "../../types/shopTypes.ts";

const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

// for the shop page
const PluginsShopSection = () => {
    const { shopItems, addShopItem, removeShopItem } = useShopState();

    const isAddedToCart = (id: string) => {
        return shopItems.some((item) => item.id === id);
    };

    return (
        <section id="synths" className="pl-4 w-full flex flex-col scroll-mt-4 gap-8">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeader title="Plugins & Vst's" />
            </div>
            <PluginShopListItems addShopItem={addShopItem} removeShopItem={removeShopItem} isAddedToCart={isAddedToCart}/>
        </section>
    )
};
export default PluginsShopSection;

interface PluginShopListProps
{ addShopItem: (payload: any) => void, removeShopItem: (payload: any) => void, isAddedToCart: (payload: any) => boolean };

export const PluginShopListItems: React.FC<PluginShopListProps> = ({ addShopItem, removeShopItem, isAddedToCart }) => (
    <motion.div {...reveal} className="grid grid-cols-1 gap-8">
        {plugins.length > 0 && plugins.map((plugin: Plugin) => (
            <CustomUI.SmallCard
                price={plugin.price}
                name={plugin.name}
                tagline={plugin.tagline}
                description={plugin.description}
                tags={
                    <section>
                        {plugin.specs.map((spec) => (
                            <div key={spec.type} className="border-t border-umnyama/15 pt-2 grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                                <CustomUI.Tags label="Type" value={spec.type} />
                                <CustomUI.Tags label="Presets" value={spec.presets} />
                                <CustomUI.Tags label="Voices" value={spec.voices} />
                                <CustomUI.Tags label="Synthesis" value={spec.synthesis} />
                            </div>
                        ))}
                    </section>
                }
                warn={isAddedToCart(plugin.id)}
                actionTitle={!isAddedToCart(plugin.id) ? "Add to cart" : "Remove from cart"}
                action={!isAddedToCart(plugin.id) ? () => addShopItem(plugin) : () => removeShopItem(plugin)}
                cover={
                    <img src={plugin.cover} className="w-100 h-60 shadow-xs shadow-gray-600 rounded-lg" />
                }
            />
        ))}
    </motion.div>
);