// Button.tsx
import React from 'react';
import './button.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = '#3182CE',
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size}`}
      style={{ backgroundColor: variant === 'solid' ? colorScheme : 'transparent', borderColor: colorScheme, color: variant !== 'solid' ? colorScheme : '#fff' }}
      {...props}
    >
      {children}
    </button>
  );
};
