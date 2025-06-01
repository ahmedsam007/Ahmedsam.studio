import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './SectionTransition.css';

const SectionTransition = ({ isActive, onTransitionComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      if (onTransitionComplete) {
        onTransitionComplete();
      }
    }
  }, [isActive, onTransitionComplete]);

  return (
    <div ref={containerRef} className="section-transition-container" style={{ display: 'none' }}>
    </div>
  );
};

export default SectionTransition; 