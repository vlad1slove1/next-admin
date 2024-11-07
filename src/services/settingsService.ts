import { get, put } from '@/lib/apiHandler';
import { Setting } from '@/models/setting';

const PATH_BASE = 'settings';

const settingsService = {
    getSettings: async (keys: string[]) =>
        new Map<string, string>(
            Object.entries(await get<object>(`${PATH_BASE}?keys=${keys.join(',')}`))
        ),

    updateSettings: async (settings: Setting[]): Promise<void> => put(PATH_BASE, settings),
};

export default settingsService;
