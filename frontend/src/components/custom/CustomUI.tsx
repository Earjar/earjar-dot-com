import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { formatToLocalDateTime } from "../../utils/dateUtils";

// headers
interface MainHeaderProps {
    title: string;
    glitchedWord?: string;
};
interface SubHeaderProps {
    title: string;
};
export const MainHeaderLight: React.FC<MainHeaderProps> = ({ title }) => (
    <h1 className="text-lg md:text-2xl font-light text-bone">{title}</h1>
);
export const MainHeaderDark: React.FC<MainHeaderProps> = ({ title }) => (
    <h1 className="text-lg md:text-2xl font-light text-umnyama">{title}</h1>
);
export const GlitchedHeader: React.FC<MainHeaderProps> = ({ title, glitchedWord }) => (
    <h1 className="text-2xl md:text-7xl font-light text-umnyama">
        {title}{" "}
        {glitchedWord && (
            <span className="glitch-text" data-text={glitchedWord}>
                {glitchedWord.split("").map((char, i) => (
                    <span
                        key={i}
                        className="glitch-char"
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        )}
    </h1>
);
export const SubHeader: React.FC<SubHeaderProps> = ({ title }) => (
    <p className="text-[10px] md:text-sm font-light text-umnyama">{title}</p>
);
export const NoInformation: React.FC<SubHeaderProps> = ({ title }) => (
    <p className="text-[10px] md:text-sm font-light text-umnyama/60">{title}</p>
)
// seperators
export const DarkSeperator = () => (
    <div className="h-px w-full bg-gradient-to-r from-umnyama/15 via-umnyama/30 to-umnyama/15" />
);
export const LightSeperator = () => (
    <div className="h-px w-full bg-gradient-to-r from-bone/15 via-bone/30 to-bone/15" />
);
export const FaintLightSeperator = () => (
    <div className="h-px w-full bg-gradient-to-r from-bone/20 via-bone/5 to-transparent" />
);

// inputs
interface InputProps {
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value: string;
    placeholder?: string;
};
interface FileInputProps {
    fileRef?: any;
    disabled?: boolean;
    onChange: (payload: any) => void
    accept?: string;
};
export const TextAreaInput: React.FC<InputProps> = ({ disabled = false, onChange, value, placeholder }) => {
    return (
        <textarea
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            rows={10}
        />
    );
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
export const ReadOnlyTextInput: React.FC<InputProps> = ({ disabled = false, onChange, value, placeholder }) => {
    return (
        <input
            readOnly
            type="text"
            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black text-gray-600 bg-gray-50"
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    );
};
export const FileInput: React.FC<FileInputProps> = ({ disabled = false, onChange, accept }) => {
    return (
        <input
            disabled={disabled}
            type="file"
            accept={accept}
            className="text-sm"
            onChange={onChange}
        />
    );
};
export const MultiFileInput: React.FC<FileInputProps> = ({ disabled = false, fileRef, onChange, accept }) => {
    return (
        <input
            disabled={disabled}
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            accept={accept}
            onChange={onChange}
        />
    );
};

// cards
interface CardProps {
    /*
        the action can be anything that can be triggered
        floatingTags are used for the songCard as a cool tag element on the cover image
    */
    action: any;
    itemTitle: string;
    itemContent?: string;
    itemImage?: string | null;
    itemLink?: string | null;
    itemTags?: string[];
    floatingTags?: React.ReactNode;
    itemDate?: any;
};
export const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
    if (!tags) return null;
    return (
        <div className="flex items-center justify-start gap-1">
            {tags.map((tag: string) => (
                <span key={tag} className="text-xs text-hazy">#{tag}</span>
            ))}
        </div>
    );
};
export const LargeCard: React.FC<CardProps> = ({ action, itemTitle, itemContent, itemLink, itemTags, itemDate }) => {
    return (
        <li
            className="cursor-pointer flex flex-col items-start
               w-full h-auto
               px-3 py-2 md:px-4 gap-2
               border-r border-t border-umnyama text-khala
               hover:scale-[1.02] transform-gpu
               duration-300
            "
            onClick={action}
        >
            <span className="text-umnyama md:text-lg font-bold">
                {itemTitle}
            </span>

            <div className="flex-1">
                <p className="text-umnyama/80 text-xs md:text-sm">
                    {itemContent}
                </p>
            </div>

            {itemDate && <span className="text-xs text-oled">{itemDate}</span>}

            {itemLink && <a href={itemLink} className="flex items-center gap-2 text-xs text-hazy" target="_blank" rel="noopener noreferrer">Link to</a>}

            {itemTags && <Tags tags={itemTags} />}
        </li>
    )
};
export const SmallCard: React.FC<CardProps> = ({ action, itemTitle, itemContent, itemImage, itemTags, floatingTags, itemDate }) => {
    return (
        <li
            className="cursor-pointer flex flex-col items-start
               w-full h-auto
               px-3 py-2 md:px-4 gap-2
               border-r border-t border-umnyama text-khala
               hover:scale-[1.02] transform-gpu
               duration-300 relative
            "
            onClick={action}
        >
            {floatingTags}
            <img
                src={itemImage ?? "/images/placeholder.png"}
                alt="Cover preview"
                className="mt-2 h-40 w-full object-cover"
            />
            <span className="text-base md:text-xl">
                {itemTitle.length > 20
                    ? itemTitle.slice(0, 20) + "..."
                    : itemTitle}
            </span>

            {itemContent && (
                <p className="text-umnyama/60 text-sm md:text-md">
                    {itemContent.split(" ").slice(0, 10).join(" ")}
                    {itemContent.split(" ").length > 10 && "..."}
                </p>
            )}

            {itemDate && <span className="text-xs text-ambers">{formatToLocalDateTime(itemDate)}</span>}

            {itemTags && <Tags tags={itemTags} />}
        </li>
    )
};

// popups
interface PopupModalProps {
    title?: string;
    isVisible: boolean;
    setVisible: (state: boolean) => void;
    children: any;
};
export const PopupModal: React.FC<PopupModalProps> = ({ title, isVisible, setVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-umnyama/40">
            <div className="relative w-full max-w-2xl bg-bone p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-umnyama">{title}</h3>
                    <button
                        onClick={() => setVisible(false)}
                        className="text-umnyama p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>
                <section>
                    {children}
                </section>
            </div>
        </div>
    );
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
