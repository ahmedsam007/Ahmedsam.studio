import React from 'react';
import GlobeViz from './GlobeViz';

function VideoSection({ isScrollingVideo, isScrollingVideoFurther }) {
  return (
    <section
      id="video"
      className={`relative h-screen transition-opacity duration-1000 ${isScrollingVideo ? 'opacity-100' : 'opacity-0'}`}
      style={{ perspective: '1000px' }}
    >
      {/* Globe Background */}
      <div className="absolute inset-0 z-0">
        <GlobeViz />
      </div>
      {/* Overlay Content */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-1000 transform-gpu ${
          isScrollingVideoFurther
            ? 'translate-z-0 scale-100 opacity-100'
            : 'translate-z-[200px] scale-0.8 opacity-0'
        }`}
      >
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-white">Connecting Ideas Globally</h2>
          <p className="text-xl text-gray-200">
            Visualizing impact across the world through interactive data experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

export default VideoSection; 