import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeaderTools = () => {
    const navigate = useNavigate();
    const location = window.location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { id: 1, label: "Home", action: () => navigate("/dev"), active: location === "/home" }
    ];

    return (
        <div className="w-full bg-hazy/90 rounded-sm text-bone">
            <motion.header
                className="w-full flex flex-col md:flex-row md:items-center md:justify-between"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Top bar */}
                <div className="w-full flex items-center justify-between">
                    <button
                        className="md:hidden flex items-center p-2 -ml-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <img src={`${mobileOpen ? '/images/menu-close.png' : '/images/menu.png'}`} className="w-8 h-8" />
                    </button>

                    <div className="w-40 h-15 mr-0 md:mr-6">
                        <img src="/images/Earjar-Logo-Version-1.png" className="w-full h-full" />
                    </div>

                    <div className="hidden md:flex items-center w-full gap-4">
                        {links.map(item => (
                            <button
                                className={`font-bold ${item.active ? 'text-bone text-lg underline' : 'text-bone/70 text-sm'}`}
                                key={item.label}
                                onClick={item.action}
                            >
                                {item.label}
                            </button>
                        ))}
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
                            className="md:hidden w-full flex items-center gap-2 px-2 py-2"
                        >
                            {links.map(item => (
                                <button
                                    className={`font-bold ${item.active ? 'text-bone text-lg underline' : 'text-bone/70 text-sm'}`}
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
        </div>
    );
};
export default HeaderTools;