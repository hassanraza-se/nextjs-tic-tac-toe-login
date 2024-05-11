import React from 'react';
interface propTypes {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
    [key: string]: unknown;
}

function BoardCell({children, onClick, className, ...other}: propTypes) {
    return (
        <div onClick={onClick}
             {...other}
            className={"flex-none w-1/3 p-4 lg:p-6 md:p-5 sm:p-4 lg:text-6xl md:lg:text-4xl sm:text-2xl font-bold rounded border border-gray-400 text-center hover:bg-gray-200 cursor-pointer min-h-14 lg:min-h-28 md:min-h-20 " + className}
        >
            { children }
        </div>
    );
}

export default BoardCell;