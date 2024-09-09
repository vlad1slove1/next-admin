import React, { ReactNode } from 'react';

type Props = { action: any; children: ReactNode };

const LoginForm: React.FC<Props> = ({ action, children }) => {
    return (
        <form action={action} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
            <div>
                <label htmlFor="username" className="block text-xs text-gray-600 uppercase">
                    username Address
                </label>
                <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-xs text-gray-600 uppercase">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            {children}
        </form>
    );
};

export default LoginForm;
