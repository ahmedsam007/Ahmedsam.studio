import React, { useRef, useEffect, useState, useCallback } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three'; // Import THREE

const GlobeViz = () => {
    const globeRef = useRef(null);
    const containerRef = useRef(null);

    // Points Data (Adapted from the tns-react-3d-globe example)
    const [pointsData, setPointsData] = useState([]);

    // Arcs Data (Adapted from the tns-react-3d-globe example)
    const [arcsData, setArcsData] = useState([]);

    // Globe settings (Adapted from the tns-react-3d-globe example)
    const pointsSettings = {
        pointAltitude: 0.01,
        pointRadius: 0.1, // Reduced radius
        pointColor: () => '#36e026', // Use primary color
        pointsMerge: true,
        pointLabel: point => `${point.name}<br/>Population: ${point.pop_max}`,
    };

    const arcsSettings = {
        arcColor: () => '#40FB30', // Use primary color slightly lighter
        arcDashLength: 0.4,
        arcDashGap: 1,
        arcDashAnimateTime: 1500,
        arcAltitudeAutoScale: 0.3,
        arcStroke: 0.3,
    };

    // Fetch and process data (Using sample data from HTML)
    useEffect(() => {
        // Sample locations (could be fetched)
        const locations = [
          { lat: 31.5, lng: 34.4667, pop_max: 2000000, name: "Gaza" },
          { lat: 40.7128, lng: -74.0060, pop_max: 8804190, name: "New York" },
          { lat: 34.0522, lng: -118.2437, pop_max: 3898747, name: "Los Angeles" },
          { lat: 51.5074, lng: -0.1278, pop_max: 9002488, name: "London" },
          { lat: 35.6895, lng: 139.6917, pop_max: 37339804, name: "Tokyo" },
          { lat: 25.276987, lng: 55.296249, pop_max: 3137000, name: "Dubai" },
          { lat: -33.8688, lng: 151.2093, pop_max: 5312163, name: "Sydney" },
          { lat: 28.6139, lng: 77.2090, pop_max: 31000000, name: "Delhi" },
          { lat: 48.8566, lng: 2.3522, pop_max: 2161000, name: "Paris" },
          { lat: 55.7558, lng: 37.6173, pop_max: 12655050, name: "Moscow" }
        ];

        setPointsData(locations);

        // Generate some random arcs between locations
        const generatedArcs = [];
        for (let i = 0; i < 5; i++) { // Generate 5 arcs
            const startIdx = Math.floor(Math.random() * locations.length);
            let endIdx = Math.floor(Math.random() * locations.length);
            // Ensure start and end are different
            while (startIdx === endIdx) {
                endIdx = Math.floor(Math.random() * locations.length);
            }
            generatedArcs.push({
                startLat: locations[startIdx].lat,
                startLng: locations[startIdx].lng,
                endLat: locations[endIdx].lat,
                endLng: locations[endIdx].lng,
            });
        }
        setArcsData(generatedArcs);

    }, []);

    // Initialize Globe
    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        const globeInstance = Globe()
            (containerRef.current)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .pointsData(pointsData)
            .pointAltitude(pointsSettings.pointAltitude)
            .pointRadius(pointsSettings.pointRadius)
            .pointColor(pointsSettings.pointColor)
            .pointsMerge(pointsSettings.pointsMerge)
            .pointLabel(pointsSettings.pointLabel)
            .arcsData(arcsData)
            .arcColor(arcsSettings.arcColor)
            .arcDashLength(arcsSettings.arcDashLength)
            .arcDashGap(arcsSettings.arcDashGap)
            .arcDashAnimateTime(arcsSettings.arcDashAnimateTime)
            .arcAltitudeAutoScale(arcsSettings.arcAltitudeAutoScale)
            .arcStroke(arcsSettings.arcStroke)
            .atmosphereColor('#3a228a') // Example atmosphere color from repo
            .atmosphereAltitude(0.25)
            .globeMaterial(
                new THREE.MeshPhongMaterial({ // Using THREE which should be globally available
                    color: '#1a2033', // Example color from repo
                    opacity: 0.95,
                    transparent: true,
                })
            )
            .backgroundColor('rgba(0,0,0,0)') // Transparent background
            .onGlobeReady(() => {
                if (globeInstance) {
                    console.log('Globe is ready');
                    globeInstance.controls().autoRotate = true;
                    globeInstance.controls().autoRotateSpeed = 0.3;
                    globeInstance.controls().enableZoom = false; // Disable zoom
                    globeInstance.pointOfView({ altitude: 2.5 }); // Adjust initial view
                }
            })

        // Handle Resize
        const handleResize = () => {
            if (containerRef.current) {
                globeInstance.width(containerRef.current.clientWidth);
                globeInstance.height(containerRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size set

        // Cleanup
        return () => {
           window.removeEventListener('resize', handleResize);
           if (globeInstance && globeInstance._destructor) {
               globeInstance._destructor();
           }
        };

    }, [pointsData, arcsData]); // Rerun effect if data changes

    return (
        <div ref={containerRef} id="globeViz" style={{ width: '100%', height: '100%', minHeight: '320px' }} />
    );
};

export default GlobeViz; 