
import { ButtonHTMLAttributes } from 'react';
import { Theme } from '../../theme';
import './ThemeToggle.css'

interface ToggleProps {
    theme: Theme;
    toggleTheme: () => void;
}

export function ThemeToggle({ theme, toggleTheme, className, ...props }: ToggleProps & ButtonHTMLAttributes<HTMLButtonElement>) {


    return <button {...props} className={`toggle-container ${theme} ${className || ''}`} onClick={toggleTheme} />

}