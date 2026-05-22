import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-bold transition-all disabled:opacity-50',
          {
            'bg-yellow-400 text-black hover:bg-yellow-500': variant === 'primary',
            'bg-[#272729] text-white border border-[#343536] hover:bg-[#343536]': variant === 'secondary',
            'bg-transparent hover:bg-[#272729] text-gray-400': variant === 'ghost',
          },
          {
            'px-3 py-1 text-xs': size === 'sm',
            'px-6 py-2 text-sm': size === 'md',
            'px-8 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
