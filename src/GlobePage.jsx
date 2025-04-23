import { useState } from 'react';
import FullscreenGlobe from './components/FullscreenGlobe';

const GlobePage = () => {
  const [showControls, setShowControls] = useState(true);
  
  return (
    <div className="min-h-screen bg-transparent relative">
      {/* The globe component */}
      <FullscreenGlobe />
      
      {/* Optional overlay content */}
      {showControls && (
        <div className="fixed top-5 right-5 z-10 bg-black/30 backdrop-blur-md p-4 rounded-lg text-white">
          <h1 className="text-xl font-bold mb-2">Interactive Globe</h1>
          <p className="text-sm mb-4">Drag to rotate, zoom to explore</p>
          <button 
            onClick={() => setShowControls(false)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm"
          >
            Hide Controls
          </button>
        </div>
      )}
      
      {/* Show button to restore controls */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed bottom-5 right-5 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GlobePage; 