import React from 'react';

const About: React.FC = () => {
  return (
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
  );
};

export default About; 