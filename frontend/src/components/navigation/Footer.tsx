import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CustomUI } from "..";
import type { SocialLink } from "../../types/socialTypes";
import { COMPANY } from "../../constants/company.ts";

const Footer = () => {
    const year = new Date().getFullYear();

    const socials: SocialLink[] = [
        { id: 1, label: "Github", linkTo: "https://github.com/Earjar", icon: "/images/github.png" },
        { id: 2, label: "Linkedin", linkTo: "https://www.linkedin.com/company/144578070", icon: "/images/linkedin.png" },
        { id: 3, label: "NPM", linkTo: "https://www.npmjs.com/~earjar", icon: "/images/npm.png" },
    ];

    const headingClass = "text-[10px] uppercase tracking-[0.3em] text-bone/60";
    const linkClass = "text-xs text-bone/80 hover:text-bone transition-colors duration-200 w-fit";

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-16 bg-lush text-bone"
        >
            <div className="mx-auto w-full max-w-6xl flex flex-col gap-10 px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
                    {/* explore */}
                    <nav className="flex flex-col gap-3" aria-label="Footer">
                        <h2 className={headingClass}>Explore</h2>
                        <Link to="/home" className={linkClass}>Home</Link>
                        <a href="#synths" className={linkClass}>Synths &amp; drum machines</a>
                    </nav>

                    {/* connect */}
                    <div className="flex flex-col gap-3">
                        <h2 className={headingClass}>Connect</h2>
                        <a href={`mailto:${COMPANY.email}`} className={linkClass}>
                            {COMPANY.email}
                        </a>
                        <ul className="flex items-center gap-2 pt-1">
                            {socials.map((social: SocialLink) => (
                                <li key={social.id}>
                                    <a
                                        href={social.linkTo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Earjar on ${social.label}`}
                                        className="flex items-center justify-center w-8 h-8 rounded-md bg-bone/10 hover:bg-bone/20 transition-colors duration-200"
                                    >
                                        <img src={social.icon} className="w-4 h-4 object-contain" alt="" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* legal */}
                    <div className="flex flex-col gap-3">
                        <h2 className={headingClass}>Legal</h2>
                        <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
                        <Link to="/terms" className={linkClass}>Terms of Use</Link>
                    </div>
                </div>

                <CustomUI.FaintLightSeperator />

                {/* legal bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-bone/90">
                            &copy; {year} {COMPANY.legalName}. All rights reserved.
                        </p>
                        <p className="text-xs text-bone">
                            Registration No. {COMPANY.registrationNumber}
                            {COMPANY.vatNumber && ` · VAT No. ${COMPANY.vatNumber}`}
                        </p>
                    </div>

                    <p className="text-xs text-bone flex items-center">
                        Made in South Africa
                        <img
                            src="/images/logo.png"
                            alt="Earjar"
                            className="w-10 h-10 object-contain"
                        />
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};
export default Footer;
