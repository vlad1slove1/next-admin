import React from 'react';

type ErrorOverlayProps = {
    active: boolean;
    message: string;
};

const ErrorOverlayWrapper: React.FC<ErrorOverlayProps> = ({ active, message }) => {
    if (!active) return null;

    return (
        <div
            style={{
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
                color: 'white',
                fontSize: '18px',
                textAlign: 'center',
            }}
        >
            {message}
        </div>
    );
};

export default ErrorOverlayWrapper;
