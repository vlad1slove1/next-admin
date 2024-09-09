'use client';

import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';
import { post } from '@/lib/apiHandler';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export type AuthResponse = {
    message: string;
    token: string;
};

const LoginPage = () => {
    const [formData, setFormData] = useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await post<AuthResponse>('login', formData);
            if (response.token) {
                router.push('/');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Login request failed:', error);
            setError('Неправильный логин и/или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl mb-4">Вход в систему</h1>
                <FormInput
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    label="Логин"
                    placeholder="Введите логин"
                    required
                />
                <FormInput
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="Пароль"
                    placeholder="Введите пароль"
                    required
                />
                {error && <p className="text-red-500 text-sm my-2">{error}</p>}
                <SubmitButton loading={loading} className="bg-blue-500 text-white">
                    Войти
                </SubmitButton>
            </form>
        </div>
    );
};

export default LoginPage;
