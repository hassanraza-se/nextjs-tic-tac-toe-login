import React from 'react';


interface cardProps {
    children: React.ReactNode;
    className?: string,
    [key: string]: unknown;
}
function Card({ children, className, ...other }: cardProps) {
    return (
        <div className={"rounded shadow-lg border border-gray-300 " + className} {...other}>
            {children}
        </div>
    );
}

export default Card;