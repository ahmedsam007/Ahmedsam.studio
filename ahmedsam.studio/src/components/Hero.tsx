import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import confetti from 'canvas-confetti';

const Hero: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
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
  );
};

export default Hero; 