import { API, BASE_URL } from '@/utils/const';

const util = {
    genURI: (path: string): string => `${BASE_URL}/${API}/${path}`,
};

export default util;
