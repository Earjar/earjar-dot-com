import { motion } from "framer-motion";
import { CustomUI } from "../index.ts";
import { useNavigate } from "react-router-dom";
import { type Plugin, plugins } from "../../types/shopTypes.ts";

const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const PluginsHomeSection = () => {
    const navigate = useNavigate();
    const viewInShop = (id: string | number) => {
        console.log(id);
        navigate("/shop");
    };
    return (
        <section id="synths" className="pl-4 w-full flex flex-col scroll-mt-4 gap-2">
            <motion.div {...reveal} className="flex flex-col gap-1">
                <CustomUI.MainHeader title="Plugins & Vst's" />
            </motion.div>
            <PluginHomeListItems viewInShop={viewInShop} />
        </section>
    )
};

interface PluginHomeListProps { viewInShop: (id: string | number) => void };

export const PluginHomeListItems: React.FC<PluginHomeListProps> = ({ viewInShop }) => (
    <motion.div {...reveal} className="grid grid-cols-3 gap-2">
        {plugins.length > 0 && plugins.map((plugin: Plugin) => (
            <CustomUI.LargeCard
                name={plugin.name}
                tagline={plugin.tagline}
                actionTitle="View in shop"
                action={() => viewInShop(plugin.id)}
                cover={
                    <img src={plugin.cover} className="w-60 h-60 shadow-xs shadow-gray-600 rounded-lg" />
                }
            />
        ))}
    </motion.div>
);
export default PluginsHomeSection;