'use client';

import { initialState, TableContext } from '@/lib/context';
import ErrorOverlayWrapper from '@/lib/ErrorOverlayWrapper';
import LoadingOverlayWrapper from '@/lib/LoadingOverlayWrapper';
import reducer from '@/lib/reducer';
import React, { ReactNode, useMemo, useReducer, useState } from 'react';

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const contextValue = useMemo(
        () => ({
            state,
            dispatch,
            setLoading,
            setError,
        }),
        [state, dispatch]
    );

    return (
        <TableContext.Provider value={contextValue}>
            <LoadingOverlayWrapper active={loading} />
            <ErrorOverlayWrapper active={!!error} message={error || ''} />
            {children}
        </TableContext.Provider>
    );
};

export default ContextProvider;
