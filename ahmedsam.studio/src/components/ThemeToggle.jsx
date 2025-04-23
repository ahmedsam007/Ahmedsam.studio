import { useEffect } from 'react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  useEffect(() => {
    // Update the HTML class and localStorage when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle; 