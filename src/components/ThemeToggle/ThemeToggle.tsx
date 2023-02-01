
import { Theme } from '../../theme';
import './ThemeToggle.css'

interface ToggleProps {
    theme: Theme;
    toggleTheme: () => void;
}

export function ThemeToggle({ theme, toggleTheme }: ToggleProps) {


    return <button className={`toggle-container ${theme}`} onClick={toggleTheme} />

}