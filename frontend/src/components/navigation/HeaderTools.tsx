import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomUI } from "..";
import { ShoppingCart } from "lucide-react";

const HeaderTools = () => {
    const navigate = useNavigate();
    const location = window.location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { id: 1, label: "Home", action: () => navigate("/home"), active: location === "/home" },
        { id: 2, label: "Shop", action: () => navigate("/shop"), active: location === "/shop" },
    ];

    return (
        <div className="w-full rounded-xs text-bone relative">
            <motion.header
                className="w-full flex flex-col md:flex-row md:items-center md:justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Top bar */}
                <div className="w-full flex items-center justify-between">
                    <div className="w-20 h-20 mr-0 md:mr-6">
                        <img src="/images/logo.png" className="w-full h-full" />
                    </div>

                    {/* navigation */}
                    <div className="hidden md:flex items-center justify-center w-full gap-6">
                        {links.map(item => (
                            <button
                                className={`font-bold ${item.active ? 'text-lush' : 'text-umnyama'}`}
                                key={item.label}
                                onClick={item.action}
                            >
                                {item.label}
                                {item.active && (<div className="w-full h-1 bg-lush" />)}
                            </button>
                        ))}
                    </div>
                    <div>
                        <button className="flex items-center justify-center gap-2 px-2 py-1 rounded-md text-chalk bg-hazy">
                            <ShoppingCart size={16} />
                            Cart
                        </button>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            className="md:hidden flex items-center p-2 -mr-2"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <img src={`${mobileOpen ? '/images/menu-close.png' : '/images/menu.png'}`} className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            key="mobile-nav-panel"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="md:hidden absolute top-full left-0 w-full flex flex-col items-start gap-2 px-4 py-3 z-50 bg-bone shadow-xl"
                        >
                            {links.map(item => (
                                <button
                                    className={`font-bold ${item.active ? 'text-umnyama text-lg underline' : 'text-umnyama/70 text-sm'}`}
                                    key={item.label}
                                    onClick={item.action}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.header>
            <CustomUI.LightSeperator />
        </div>
    );
};
export default HeaderTools;