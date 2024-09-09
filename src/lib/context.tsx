import { Action } from '@/lib/reducer';
import { createContext, Dispatch, SetStateAction } from 'react';

export type State = {
    data: any;
    loading: boolean;
    error: string | null;
};

export type Context = {
    state: State;
    dispatch: Dispatch<Action>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setError: (error: string | null) => void;
};

export const initialState: State = {
    data: null,
    loading: true,
    error: null,
};

const TableContext = createContext<Context>({} as Context);

export { TableContext };
