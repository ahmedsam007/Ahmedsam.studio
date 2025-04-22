import React, { useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeComponent = () => {
  const globeRef = useRef(null);

  const globeReady = () => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().enableZoom = false;

      globeRef.current.pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        onGlobeReady={globeReady}
        backgroundColor='#08070e'
        rendererConfig={{ antialias: true, alpha: true }}
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: '#1a2033',
            opacity: 0.95,
            transparent: true,
          })
        }
        atmosphereColor='#5784a7'
        atmosphereAltitude={0.5}
        pointsData={[
          { lat: 51.5074, lng: -0.1278 }, // London
          { lat: 40.7128, lng: -74.0060 }, // New York
          { lat: 35.6762, lng: 139.6503 }, // Tokyo
          { lat: 48.8566, lng: 2.3522 }, // Paris
          { lat: 37.7749, lng: -122.4194 } // San Francisco
        ]}
        pointAltitude={0.01}
        pointRadius={0.2}
        pointResolution={5}
        pointColor={() => '#40FB30'}
        arcsData={[
          { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.0060 },
          { startLat: 40.7128, startLng: -74.0060, endLat: 35.6762, endLng: 139.6503 },
          { startLat: 35.6762, startLng: 139.6503, endLat: 48.8566, endLng: 2.3522 },
          { startLat: 48.8566, startLng: 2.3522, endLat: 37.7749, endLng: -122.4194 }
        ]}
        arcAltitude={0.1}
        arcStroke={0.5}
        arcColor={() => '#40FB30'}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default GlobeComponent; 