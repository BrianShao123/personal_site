import React from 'react';
import DOMPurify from 'dompurify';
import { sendEmail } from '~/utils/sendemail';
import useEmailJS from '~/hooks/useEmailJS';
import type { Input, Textarea, Disclaimer } from '~/types';

interface FormProps {
    inputs?: Input[];
    textarea?: Textarea;
    disclaimer?: Disclaimer;
    button?: string;
    description?: string;
}

const EmailForm: React.FC<FormProps> = ({ inputs, textarea, disclaimer, button = 'Contact us', description = '' }) => {
    useEmailJS();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);
        formData.forEach((value, key) => {
            const sanitizedValue = DOMPurify.sanitize(value.toString());
            const inputElement = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
            if (inputElement) {
                inputElement.value = sanitizedValue;
            }
        });

        sendEmail(form, () => {
            window.location.href = '/';
        });
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
            {inputs &&
                inputs.map(({ type = 'text', name, label = '', autocomplete = 'on', placeholder = '' }) =>
                    name ? (
                        <div className="mb-6" key={name}>
                            {label && (
                                <label htmlFor={name} className="block text-sm font-medium">
                                    {label}
                                </label>
                            )}
                            <input
                                type={type}
                                name={name}
                                id={name}
                                autoComplete={autocomplete}
                                placeholder={placeholder}
                                className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
                            />
                        </div>
                    ) : null
                )}

            {textarea && (
                <div>
                    <label htmlFor="message" className="block text-sm font-medium">
                        {textarea.label}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={textarea.rows ? textarea.rows : 4}
                        placeholder={textarea.placeholder}
                        className="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
                    />
                </div>
            )}

            {disclaimer && (
                <div className="mt-3 flex items-start">
                    <div className="flex mt-0.5">
                        <input
                            id="disclaimer"
                            name="disclaimer"
                            type="checkbox"
                            className="cursor-pointer mt-1 py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
                        />
                    </div>
                    <div className="ml-3">
                        <label htmlFor="disclaimer" className="cursor-pointer select-none text-sm text-gray-600 dark:text-gray-400">
                            {disclaimer.label}
                        </label>
                    </div>
                </div>
            )}

            {button && (
                <div className="mt-10 grid">
                    <button className="btn-primary" type="submit">
                        {button}
                    </button>
                </div>
            )}

            {description && (
                <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
            )}
        </form>
    );
};

export default EmailForm;
