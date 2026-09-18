import { motion } from "framer-motion";
import type { SocialLink } from "../../types/socialTypes.ts";

const Footer = () => {
    const portfolioLinks: SocialLink[] = [
        { id: 1, label: "Github", linkTo: "https://github.com/Earjar", icon: "/images/github.png" },
        { id: 2, label: "Linkedin", linkTo: "https://www.linkedin.com/company/144578070", icon: "/images/linkedin.png" },
        { id: 2, label: "NPM", linkTo: "https://www.npmjs.com/~earjar", icon: "/images/npm.png" },
    ];
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
            <p className="text-xs">Follow us for more</p>

            <ul className="flex items-center justify-start px-2 py-1 gap-2">
                {portfolioLinks.map((portfolioLink: SocialLink) => (
                    <li key={portfolioLink.id} className="hover:scale-105 transition-all duration-300">
                        <a
                            href={portfolioLink.linkTo}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={portfolioLink.icon} className="w-8 h-8" alt="" />
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-xs">Earjar is a South African audio software/hardware startup based in Cape Town.</p>
        </motion.div>
    )
};
export default Footer;