import React from 'react';

type Props = {
    active: boolean;
};

const LoadingOverlayWrapper: React.FC<Props> = ({ active }) => {
    if (!active) return null;

    return (
        <div style={overlayStyle}>
            <div style={spinnerStyle}></div>
        </div>
    );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};

const spinnerStyle: React.CSSProperties = {
    border: '16px solid #f3f3f3',
    borderTop: '16px solid #3498db',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
};

export default LoadingOverlayWrapper;
