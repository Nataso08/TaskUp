import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle-switch ${theme}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="toggle-slider" />
      <span className="toggle-label light-label">☀️</span>
      <span className="toggle-label dark-label">🌙</span>
    </button>
  );
}

export default ThemeToggle;
