import { State } from '@/lib/context';
import { ActionType } from '@/utils/enums/actionType';

export type Action =
    | { type: ActionType.SET_DATA; payload: unknown }
    | { type: ActionType.SET_LOADING; payload: boolean }
    | { type: ActionType.SET_ERROR; payload: string | null };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SET_DATA:
            return { ...state, data: action.payload, loading: false, error: null };
        case ActionType.SET_LOADING:
            return { ...state, loading: action.payload };
        case ActionType.SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default reducer;
