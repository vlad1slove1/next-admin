import React from 'react';

type FormInputProps = {
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
};

const FormInput: React.FC<FormInputProps> = ({
    id,
    type,
    value,
    onChange,
    label,
    placeholder,
    required,
    className,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2 border rounded"
            />
        </div>
    );
};

export default FormInput;
