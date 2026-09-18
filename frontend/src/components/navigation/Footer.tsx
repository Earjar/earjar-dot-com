import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.5,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="mx-auto mt-16 flex flex-col items-center gap-6 text-center text-bone px-4 py-4 bg-lush w-full"
        >
            <p className="text-xs">Earjar is a South African audio software/hardware startup based in Cape Town.</p>
        </motion.div>
    )
};
export default Footer;