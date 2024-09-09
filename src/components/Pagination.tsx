import React from 'react';

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center border rounded-md">
            <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                ariaLabel="Previous Page"
            >
                &lt;
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, index) => (
                <PaginationButton
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    isActive={index + 1 === currentPage}
                    ariaLabel={`Page ${index + 1}`}
                >
                    {index + 1}
                </PaginationButton>
            ))}
            <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                ariaLabel="Next Page"
            >
                &gt;
            </PaginationButton>
        </div>
    );
};

type ButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
    ariaLabel: string;
    children: React.ReactNode;
};

const PaginationButton: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    isActive = false,
    ariaLabel,
    children,
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-8 h-8 flex items-center justify-center border transition-colors duration-200 ${
            disabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

export default Pagination;
