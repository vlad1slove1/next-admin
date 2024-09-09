import React from 'react';

interface IconProps {
    fill?: string;
    size?: number;
    height?: number;
    width?: number;
    label?: string;
    [key: string]: any;
}

export const TrashIcon: React.FC<IconProps> = ({
    fill = 'currentColor',
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={label} // for accessibility
            {...props}
        >
            <polyline
                points="3 6 5 6 21 6"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line
                x1="10"
                y1="11"
                x2="10"
                y2="17"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line
                x1="14"
                y1="11"
                x2="14"
                y2="17"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
