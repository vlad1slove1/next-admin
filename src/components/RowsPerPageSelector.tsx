import ArrowDownIcon from '@/assets/ArrowDownIcon';
import useLocalStorage from '@/hooks/useLocalStorage';
import ClickOutsideWrapper from '@/lib/ClickOutsideWrapper';
import { TableContext } from '@/lib/context';
import { ROWS_PER_PAGE } from '@/utils/const';
import React, { useContext, useState } from 'react';

type Props = {
    rowsPerPage: number;
    setRowsPerPage: (rows: number) => void;
};

const RowsPerPageSelector: React.FC<Props> = ({ rowsPerPage, setRowsPerPage }) => {
    const [localRowsPerPage, setLocalRowsPerPage] = useLocalStorage<number>(
        'rowsPerPage',
        rowsPerPage
    );
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(localRowsPerPage);
    const context = useContext(TableContext);

    if (context.state?.loading) {
        return null;
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: number) => {
        if (value === selectedValue) {
            return;
        }
        setSelectedValue(value);
        setLocalRowsPerPage(value);
        setRowsPerPage(value);
        setIsOpen(false);
    };

    return (
        <div className="rows-per-page">
            <button onClick={handleToggle} className="rows-per-page-button">
                {selectedValue}
                <ArrowDownIcon
                    className={`rows-per-page-icon ${isOpen ? 'rotate' : ''}`}
                    size={20}
                />
            </button>
            {isOpen && (
                <ClickOutsideWrapper onClickOutside={() => setIsOpen(false)}>
                    <div className="rows-per-page-dropdown">
                        {ROWS_PER_PAGE.map((value) => (
                            <div
                                key={value}
                                onClick={() => handleOptionClick(value)}
                                className={`rows-per-page-option ${value === selectedValue ? 'disabled' : ''}`}
                                style={{ pointerEvents: value === selectedValue ? 'none' : 'auto' }}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </ClickOutsideWrapper>
            )}
        </div>
    );
};

export default RowsPerPageSelector;
