'use client';

import React from 'react';
import GlobeComponent from './GlobeComponent'; // Make sure the path is correct

const GlobalReach = () => {
  return (
    <section id="global" className="px-6 py-10 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Global Reach</h2>
      <GlobeComponent />
    </section>
  );
};

export default GlobalReach;
