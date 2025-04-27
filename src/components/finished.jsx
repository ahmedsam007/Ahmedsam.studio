import { useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

import landTopology from '../assets/land_10m.json';
import pointsData from '../assets/random-locations.json';
import texture from '../assets/texture.jpg';

const min = 1000;
const max = 4000;
const sliceData = pointsData.sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(20, 90);

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

const GreenGlobe = () => {
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
    <div className="relative h-[1500px]">
      {/* Title with gradient styling and individual character animations */}
      <div className="absolute inset-x-0 top-40 flex justify-center pt-10 z-20">
        <h2 className="text-5xl font-bold hero-gradient-text">
          {["G","l","o","b","a","l","\u00A0","R","e","a","c","h"].map((char, i) => (
            <span 
              key={i} 
              className="hero-char"
              style={{
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
              onAnimationEnd={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
      
      {/* Counters section at top */}
      <div className="absolute inset-x-0 top-35 flex justify-center items-center h-[100vh] w-full z-10 pointer-events-none">
        <div className="relative">
          {/* Blue background fade effect */}
          <div className="absolute inset-0 -bottom-32 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent rounded-3xl -z-10 blur-md"></div>
          
          <div className="grid grid-cols-4 gap-16 w-full max-w-6xl px-8 py-6">
            <div className="text-center relative">
              <h3 className="counter-number text-6xl font-bold">9+</h3>
              <p className="text-xl mt-2 text-gray-300">Countries</p>
              <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-6xl font-bold">50+</h3>
              <p className="text-xl mt-2 text-gray-300">Projects</p>
              <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-6xl font-bold">100%</h3>
              <p className="text-xl mt-2 text-gray-300">Satisfaction</p>
              <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="text-center relative">
              <h3 className="counter-number text-6xl font-bold">24/7</h3>
              <p className="text-xl mt-2 text-gray-300">Support</p>
              <div className="absolute w-px h-16 bg-gradient-to-b from-[#40FB3000] via-[#40FB3080] to-[#40FB3000] -bottom-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Globe positioned underneath */}
      <div className='cursor-move absolute inset-0 top-[60vh] h-[100vh]'>
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
          polygonsData={topojson.feature(landTopology, landTopology.objects.land).features}
          polygonSideColor={() => '#00000000'}
          polygonCapMaterial={
            new THREE.MeshPhongMaterial({
              color: '#49ac8f',
              side: THREE.DoubleSide,
              map: new THREE.TextureLoader().load(texture),
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
    </div>
  );
};

export default GreenGlobe;
