import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { slugify } from "../../utils/stringUtils";
import { CustomButtons } from "..";

// headers
interface MainHeaderProps {
    title: string;
    glitchedWord?: string;
};
interface SubHeaderProps {
    title: string;
};
export const MainHeader: React.FC<MainHeaderProps> = ({ title }) => (
    <h1 className="text-lg md:text-2xl font-light text-umnyama">{title}</h1>
);
export const SubHeader: React.FC<SubHeaderProps> = ({ title }) => (
    <p className="text-[10px] md:text-sm font-light text-umnyama">{title}</p>
);
export const NoInformation: React.FC<SubHeaderProps> = ({ title }) => (
    <p className="text-[10px] md:text-sm font-light text-umnyama/60">{title}</p>
);

// seperators
export const DarkSeperator = () => (
    <div className="h-px w-full bg-gradient-to-r from-umnyama/15 via-umnyama/30 to-umnyama/15" />
);
export const FaintLightSeperator = () => (
    <div className="h-px w-full bg-gradient-to-r from-bone/20 via-bone/5 to-transparent" />
);

// legal
export const legalLinkClass = "text-hazy underline! font-medium! decoration-umnyama/40 hover:decoration-umnyama";
interface LegalClauseProps {
    index: number;
    heading: string;
    body?: string;
    bullets?: string[];
    children?: React.ReactNode;
};
export const LegalClause: React.FC<LegalClauseProps> = ({ index, heading, body, bullets, children }) => (
    <div id={slugify(heading)} className="flex flex-col gap-2 scroll-mt-24">
        <h2 className="text-base font-bold text-umnyama">{index}. {heading}</h2>
        {body && <p className="text-sm text-umnyama/80 leading-relaxed">{body}</p>}
        {bullets && (
            <ul className="list-disc pl-5 flex flex-col gap-1">
                {bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-umnyama/80 leading-relaxed">{bullet}</li>
                ))}
            </ul>
        )}
        {children}
    </div>
);

// inputs
interface InputProps {
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value: string;
    placeholder?: string;
};
export const TextInput: React.FC<InputProps> = ({ disabled = false, onChange, value, placeholder }) => {
    return (
        <input
            type="text"
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    );
};

// cards
interface CardProps {
    price?: string;
    name: string;
    tagline: string;
    description?: string;
    tags?: any;
    cover: any;
    warn?: boolean;
    actionTitle: string;
    action: any;
};
export const Tags: React.FC<{ label: string, value: string }> = ({ label, value }) => {
    return (
        <span>
            <dt className="text-xs uppercase tracking-widest text-umnyama/50">{label}</dt>
            <dd className="text-xs text-umnyama">{value}</dd>
        </span>
    );
};
export const LargeCard: React.FC<CardProps> = ({ price, name, tagline, description, tags, cover, actionTitle, action }) => {
    return (
        <section className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
                <span className="text-md font-light text-umnyama/55">
                    <span className="text-md text-umnyama/60 font-bold">{price}</span>
                    <h2 className="text-md text-umnyama font-bold">{name}</h2>
                </span>

                <p className="text-xs text-umnyama/70">{tagline}</p>

                <p className="text-xs text-umnyama/70">{description}</p>

                <dl className="">
                    {tags}
                </dl>
                <CustomButtons.Safe
                    disabled={false}
                    onClick={action}
                    title={actionTitle}
                    text={actionTitle}
                />
            </motion.div>
            {cover}

        </section>
    )
};
export const SmallCard: React.FC<CardProps> = ({ price, name, tagline, description, tags, cover, warn, actionTitle, action }) => {
    return (
        <section className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <motion.div className={`md:col-span-2 flex flex-col gap-2 `}>
                <span className="text-md font-light text-umnyama/55">
                    <span className="text-md text-umnyama/60 font-bold">{price}</span>
                    <h2 className="text-md text-umnyama font-bold">{name}</h2>
                </span>

                <p className="text-xs text-umnyama/70">{tagline}</p>

                <p className="text-xs text-umnyama/70">{description}</p>

                <dl>
                    {tags}
                </dl>
                {warn ? (
                    <CustomButtons.Warn
                        disabled={false}
                        onClick={action}
                        title={actionTitle}
                        text={actionTitle}
                    />
                ) : (
                    <CustomButtons.Safe
                        disabled={false}
                        onClick={action}
                        title={actionTitle}
                        text={actionTitle}
                    />
                )}
            </motion.div>
            {cover}

        </section>
    )
};

// popups
interface PopupModalProps {
    title?: string;
    isVisible: boolean;
    setVisible: (state: boolean) => void;
    children: any;
};
export const PopupModalC: React.FC<PopupModalProps> = ({ title, isVisible, setVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-umnyama/40">
            <div className="relative w-full max-w-2xl bg-bone p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-umnyama">{title}</h3>

                    <CustomButtons.Default
                        disabled={false}
                        onClick={() => setVisible(false)}
                        title="Close modal"
                        icon={<X size={16} />}
                    />
                </div>
                <section className="">
                    {children}
                </section>
            </div>
        </div>
    );
};
export const PopupModalTR: React.FC<PopupModalProps> = ({ title, isVisible, setVisible, children }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setVisible(false)}
                        aria-hidden="true"
                    />
                    <motion.div
                        key="popup-tr-panel"
                        role="dialog"
                        aria-label={title}
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed top-20 right- md:top-24 md:right-0 z-50
                                   w-[calc(100vw-2rem)] max-w-sm max-h-[70vh] h-60
                                   flex flex-col origin-top-right overflow-hidden
                                   bg-chalk border border-khala/50 shadow-xl rounded-l-md"
                    >
                        <div className="flex justify-between items-center px-4 py-3 border-b border-khala/20">
                            <h3 className="text-lg font-semibold text-umnyama">{title}</h3>
                            <CustomButtons.Default
                                disabled={false}
                                onClick={() => setVisible(false)}
                                title="Close modal"
                                icon={<X size={16} />}
                            />
                        </div>
                        <section className="px-4 py-3 overflow-y-auto">
                            {children}
                        </section>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
};

// dropdowns
interface DropdownProps {
    label: string;
    options: any;

};
export const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="relative inline-flex flex-col items-start">
            <button
                className={`flex items-center justify-start gap-2 px-3 py-1.5 text-umnyama text-xs disabled:text-umnyama/30 disabled:line-through`}
                onClick={() => setOpen(!open)}
            >
                {label}
                <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="social-select-menu"
                        role="menu"
                        key="social-select-panel"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute top-full left-0 mt-2 w-32 z-50 rounded-xs border border-khala/50 bg-chalk/95 shadow-xl overflow-hidden"
                    >
                        <ul className="flex flex-col items-start px-2 py-1 gap-2">
                            {options.map((item: any) => (
                                <li key={item.id} role="none" className="hover:scale-105 transition-all duration-300 text-xs">
                                    <button
                                        onClick={item.action}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
