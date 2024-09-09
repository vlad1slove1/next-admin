import React from 'react';

type SpinnerButtonProps = {
    loading: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
};

const SubmitButton: React.FC<SpinnerButtonProps> = ({
    loading,
    children,
    className,
    disabled,
}) => {
    return (
        <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M12 4v1.5a6.5 6.5 0 0 1 0 13v1.5a8 8 0 1 0 0-16z"
                    />
                </svg>
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitButton;
