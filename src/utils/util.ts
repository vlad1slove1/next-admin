import { API, BASE_URL } from '@/utils/const';

const util = {
    genURI: (path: string): string => `${BASE_URL}/${API}/${path}`,

    sortMap: (map: Map<string, string>, priorityList: string[]): [string, string][] => {
        return Array.from(map.entries()).sort((a, b) => {
            const aIndex = priorityList.indexOf(a[0]);
            const bIndex = priorityList.indexOf(b[0]);

            // If both are in the priority list, sort by their order in the list
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }

            // If only one of them is in the priority list, give it priority
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // If neither is in the priority list, keep their original order
            return 0;
        });
    },
};

export default util;
