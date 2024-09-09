import React, { useRef, useEffect, ReactNode } from 'react';

type ClickOutsideWrapperProps = {
    onClickOutside: () => void;
    children: ReactNode;
};

const ClickOutsideWrapper: React.FC<ClickOutsideWrapperProps> = ({ onClickOutside, children }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickOutside]);

    return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutsideWrapper;
