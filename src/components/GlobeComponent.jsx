'use client';

import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = () => {
  const globeEl = useRef();

  const arcsData = [
    {
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 51.5074,
      endLng: -0.1278,
      color: ['#00ffcc', '#ffcc00']
    }
  ];

  const htmlMarkers = [
    {
      lat: 40.7128,
      lng: -74.0060,
      name: 'New York'
    }
  ];

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={4}
        arcDashInitialGap={() => Math.random() * 5}
        arcDashAnimateTime={1000}
        arcsTransitionDuration={0}
        arcStroke={1.5}
        arcAltitude={0.2}
        htmlElementsData={htmlMarkers}
        htmlLat="lat"
        htmlLng="lng"
        htmlElement={d => {
          const el = document.createElement('div');
          el.innerHTML = `<div style="color: white; background: rgba(0,0,0,0.6); padding: 4px 8px; border-radius: 4px;">${d.name}</div>`;
          return el;
        }}
      />
    </div>
  );
};

export default GlobeComponent;
