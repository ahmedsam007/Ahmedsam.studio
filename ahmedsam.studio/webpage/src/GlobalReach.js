import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GlobalReach = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      
      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      
      // Add event listeners for interaction
      globe.controls().enableZoom = true;
      globe.controls().enablePan = true;
      globe.controls().enableRotate = true;
    }
  }, []);

  return (
    <section className="global-reach-section" style={{ 
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={[
            { lat: 51.5074, lng: -0.1278 }, // London
            { lat: 40.7128, lng: -74.0060 }, // New York
            { lat: 35.6762, lng: 139.6503 }, // Tokyo
            { lat: 48.8566, lng: 2.3522 }, // Paris
            { lat: 37.7749, lng: -122.4194 } // San Francisco
          ]}
          pointRadius={0.5}
          pointColor={() => '#40FB30'}
          arcsData={[
            { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.0060 },
            { startLat: 40.7128, startLng: -74.0060, endLat: 35.6762, endLng: 139.6503 },
            { startLat: 35.6762, startLng: 139.6503, endLat: 48.8566, endLng: 2.3522 },
            { startLat: 48.8566, startLng: 2.3522, endLat: 37.7749, endLng: -122.4194 }
          ]}
          arcColor={() => '#40FB30'}
          arcAltitude={0.1}
          arcStroke={0.5}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2>Global Reach</h2>
        <p>Explore my international connections and projects</p>
      </div>
    </section>
  );
};

export default GlobalReach; 