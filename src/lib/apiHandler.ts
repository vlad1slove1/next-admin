import fetcher from '@/lib/fetcher';

const apiRequest = async <T>(path: string, method: string = 'GET', body?: any): Promise<T> => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (token) {
            headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
        }

        return await fetcher<T>(path, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch (error) {
        console.error(`Error with ${method} request to ${path}:`, error);
        throw error;
    }
};

const get = async <T>(path: string): Promise<T> => apiRequest<T>(path, 'GET');
const post = async <T>(path: string, body: any): Promise<T> => apiRequest<T>(path, 'POST', body);
const put = async <T>(path: string, body: any): Promise<T> => apiRequest<T>(path, 'PUT', body);
const deleteRequest = async <T>(path: string): Promise<T> => apiRequest<T>(path, 'DELETE');

export { get, post, put, deleteRequest };
