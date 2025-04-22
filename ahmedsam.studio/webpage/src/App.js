import React from 'react';
import GlobalReach from './components/GlobalReach';

const App = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Welcome to My Portfolio</h1>
          <p className="text-2xl text-gray-300">Interactive 3D Globe Experience</p>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 px-4 bg-dark-800">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Logo Section</h2>
          {/* Add your logo content here */}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-dark-900">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">My Story</h2>
          {/* Add your story content here */}
        </div>
      </section>

      {/* Global Reach Section */}
      <GlobalReach />

      {/* Add other sections as needed */}
    </div>
  );
};

export default App; 