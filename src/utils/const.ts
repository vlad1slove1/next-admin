export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
export const API = 'api';
export const ROWS_PER_PAGE = [10, 25, 50, 100];

export const JWT_SECRET = process.env.AUTH_SECRET as string;
