import React from 'react';
import GlobeComponent from './Globe';

const GlobalReach = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <GlobeComponent />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Global Reach</h2>
          <p className="text-xl">Connecting the world through technology</p>
        </div>
      </div>
    </section>
  );
};

export default GlobalReach; 