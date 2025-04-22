import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Globe from 'globe.gl';
import confetti from 'canvas-confetti';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    // Initialize custom cursor
    const cursorDot = document.createElement('div');
    const cursorCircle = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    cursorCircle.classList.add('cursor-circle');
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorCircle);

    const moveCursor = (e: MouseEvent) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorCircle.style.left = e.clientX + 'px';
      cursorCircle.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    // Initialize Globe
    if (globeRef.current) {
      const globe = new Globe(globeRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .pointColor(() => '#40FB30')
        .pointsMerge(true)
        .pointAltitude(0.1)
        .pointRadius(0.5);
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorCircle);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-dark-900 dark:text-white">Ahmed Sam</div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </nav>
      </header>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div ref={globeRef} className="absolute inset-0 w-full h-full" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-dark-900 dark:text-white mb-6">
              Hello, I'm <span className="text-primary-500">Ahmed Sam</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer & Creative Technologist
            </p>
            <button
              onClick={triggerConfetti}
              className="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              Say Hello 👋
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I'm a passionate developer with expertise in building modern web applications.
                My focus is on creating beautiful, functional, and user-friendly experiences.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
