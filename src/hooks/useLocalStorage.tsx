import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState(initialValue);
    // Flag to trigger the reading from localStorage
    const [firstLoadDone, setFirstLoadDone] = useState(false);

    /**
     *     Use an effect hook in order to prevent SSR inconsistencies and errors.
     *     This will update the state with the value from the local storage after
     *     the first initial value is applied.
     */
    useEffect(() => {
        const fromLocal = () => {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            try {
                const item = window.localStorage.getItem(key);
                return item ? (JSON.parse(item) as T) : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            }
        };

        setStoredValue(fromLocal);
        setFirstLoadDone(true);
    }, [initialValue, key]);

    function setLocalValue(value: T) {
        if (!firstLoadDone) {
            return;
        }

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setValue: Dispatch<SetStateAction<T>> = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        setLocalValue(valueToStore);
        setStoredValue(valueToStore);
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
