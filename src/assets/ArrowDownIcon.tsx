import React from 'react';

interface IconProps {
    fill?: string;
    size?: number;
    height?: number;
    width?: number;
    label?: string;
    [key: string]: any;
}

const ArrowDownIcon: React.FC<IconProps> = ({
    fill = 'currentColor',
    size,
    height,
    width,
    label,
    ...props
}) => (
    <svg
        width={size || width || 24}
        height={size || height || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={label} // for accessibility
        {...props}
    >
        <path
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

export default ArrowDownIcon;
