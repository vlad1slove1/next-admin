import util from '@/utils/util';

export default async function fetcher<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = util.genURI(path);

    if (options.method === 'GET') {
        delete options.body;
    }

    if (options.body && !options.headers) {
        options.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const errorText = await response.text();
        console.error(
            `Fetch error [${response.status} ${response.statusText}] at ${url}:`,
            errorText
        );
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        try {
            return (await response.json()) as T;
        } catch (error) {
            console.error(`Error parsing JSON response from ${url}:`, error);
            throw new Error('Error parsing JSON');
        }
    } else {
        return (await response.text()) as unknown as T;
    }
}
