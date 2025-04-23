import React, { useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

// Sample data points
const pointsData = [
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: 40.7128, lng: -74.0060 }, // New York
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 48.8566, lng: 2.3522 }, // Paris
  { lat: 37.7749, lng: -122.4194 } // San Francisco
];

// Generate arcs data
const min = 1000;
const max = 4000;
const sliceData = pointsData.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 5);

const arcsData = sliceData.map(() => {
  const randStart = Math.floor(Math.random() * sliceData.length);
  const randEnd = Math.floor(Math.random() * sliceData.length);
  const randTime = Math.floor(Math.random() * (max - min + 1) + min);
  return {
    startLat: sliceData[randStart].lat,
    startLng: sliceData[randStart].lng,
    endLat: sliceData[randEnd].lat,
    endLng: sliceData[randEnd].lng,
    time: randTime,
    color: ['#ffffff00', '#faf7e6', '#ffffff00'],
  };
});

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
        pointsMerge={true}
        pointsData={pointsData}
        pointAltitude={0.01}
        pointRadius={0.2}
        pointResolution={5}
        pointColor={() => '#eed31f'}
        arcsData={arcsData}
        arcAltitudeAutoScale={0.3}
        arcColor='color'
        arcStroke={0.5}
        arcDashGap={2}
        arcDashAnimateTime='time'
        polygonSideColor={() => '#00000000'}
        polygonCapMaterial={
          new THREE.MeshPhongMaterial({
            color: '#49ac8f',
            side: THREE.DoubleSide,
          })
        }
        polygonAltitude={0.01}
        customLayerData={[...Array(500).keys()].map(() => ({
          lat: (Math.random() - 1) * 360,
          lng: (Math.random() - 1) * 360,
          altitude: Math.random() * 2,
          size: Math.random() * 0.4,
          color: '#faadfd',
        }))}
        customThreeObject={(sliceData) => {
          const { size, color } = sliceData;
          return new THREE.Mesh(new THREE.SphereGeometry(size), new THREE.MeshBasicMaterial({ color }));
        }}
        customThreeObjectUpdate={(obj, sliceData) => {
          const { lat, lng, altitude } = sliceData;
          return Object.assign(obj.position, globeRef.current?.getCoords(lat, lng, altitude));
        }}
      />
    </div>
  );
};

export default GlobeComponent; 