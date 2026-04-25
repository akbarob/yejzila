import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    restrictTo?: 'letters' | 'lettersAndNumbers';
    disableAutoCorrect?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = 'text',
            restrictTo,
            disableAutoCorrect = true,
            onChange,
            ...props
        },
        ref,
    ) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Bypass logic for file inputs
            if (type === 'file') {
                if (onChange) onChange(e);
                return;
            }

            const originalValue = e.target.value;
            let value = originalValue;

            // Remove consecutive spaces
            value = value.replace(/\s{2,}/g, ' ');

            // Apply restrictions based on restrictTo prop
            if (restrictTo === 'letters') {
                value = value.replace(/[^A-Za-z\s]/g, '');
            } else if (restrictTo === 'lettersAndNumbers') {
                value = value.replace(/[^A-Za-z0-9\s]/g, '');
            }

            // Update the input value if it was modified
            if (value !== originalValue) {
                const cursorPosition = e.target.selectionStart;
                e.target.value = value;

                // Restore cursor position after a short delay
                setTimeout(() => {
                    if (e.target && cursorPosition !== null) {
                        e.target.setSelectionRange(
                            cursorPosition,
                            cursorPosition,
                        );
                    }
                }, 0);
            }

            // Call the original onChange handler with the modified event
            if (onChange) {
                // Create a new event object with the cleaned value
                const modifiedEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value,
                    },
                };
                onChange(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
            }
        };

        return (
            <input
                type={type}
                className={cn(
                    'flex 2xl:h-10 h-[46px]  w-full px-4 rounded-[8px] border border-[#E1E4EA] bg-white text-sm leading-[22px] tracking-[-0.18px] ring-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none text-[#525866] placeholder:text-[#98A2B3]/50 focus-visible:ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:inherit] autofill:transition-[background-color_5000s_ease-in-out_0s] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary600 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    className,
                )}
                ref={ref}
                onChange={handleChange}
                {...props}
            />
        );
    },
);

Input.displayName = 'Input';

export { Input };
