import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
    type?: ButtonType;
    onClick?: (event: React.MouseEvent) => void;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
}

function PrimaryButton ({
    type = 'button',
    onClick,
    children,
    className,
    ...other
}: ButtonProps) {
    return (
        <button type={type}
                className={"p-2 bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold rounded-lg dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 " + className }
                onClick={onClick}
                {...other}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;