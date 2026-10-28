import React from 'react';

interface ButtonProps {
    disabled?: boolean;
    active?: boolean;
    onClick: any;
    icon?: any;
    text?: string;
    title: string;
};

// buttons
export const Default: React.FC<ButtonProps> = ({ disabled, onClick, active, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center gap-1 px-3 py-1.5 disabled:bg-lush/30 text-umnyama text-xs font-semibold`}
        title={title}
    >
        {icon}{text}
        {active && (<div className="w-full h-1 bg-umnyama" />)}
    </button>
);
export const Safe: React.FC<ButtonProps> = ({ disabled, onClick, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center justify-center gap-1 px-3 py-1.5 bg-lush hover:bg-lush/90 rounded-sm disabled:bg-lush/30 text-chalk text-xs font-semibold`}
        title={title}
    >{icon}{text}</button>
);
export const Warn: React.FC<ButtonProps> = ({ disabled, onClick, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red/80 rounded-sm disabled:bg-red/30 text-chalk text-xs font-semibold`}
        title={title}
    >{icon}{text}</button>
);
export const Checkout: React.FC<ButtonProps> = ({ disabled, onClick, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center gap-1 px-3 py-1.5 bg-hazy hover:bg-hazy/80 rounded-sm disabled:bg-hazy/30 text-chalk text-xs font-semibold`}
        title={title}
    >{icon}{text}</button>
);
export const MobileMenu: React.FC<ButtonProps> = ({ disabled, onClick, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className="md:hidden flex items-center p-2 -mr-2"
        title={title}
    >{icon}{text}</button>
);
export const Link: React.FC<ButtonProps> = ({ disabled, active, onClick, icon, text, title }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={`font-bold ${active ? 'text-lush' : 'text-umnyama'}`}
        title={title}
    >
        {icon}{text}
        {active && (<div className="w-full h-1 bg-lush" />)}
    </button>
);