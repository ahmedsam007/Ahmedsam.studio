import { useRef } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import * as topojson from 'topojson-client'

import landTopology from '../assets/land_10m.json'
import pointsData from '../assets/random-locations.json'

const min = 1000
const max = 4000
const sliceData = pointsData
  .sort(() => (Math.random() > 0.5 ? 1 : -1))
  .slice(20, 90)

const arcsData = sliceData.map(() => {
  const randStart = Math.floor(Math.random() * sliceData.length)
  const randEnd = Math.floor(Math.random() * sliceData.length)
  const randTime = Math.floor(Math.random() * (max - min + 1) + min)
  return {
    startLat: sliceData[randStart].lat,
    startLng: sliceData[randStart].lng,
    endLat: sliceData[randEnd].lat,
    endLng: sliceData[randEnd].lng,
    time: randTime,
    color: ['#ffffff00', '#faf7e6', '#ffffff00'],
  }
})

const GlobalReach = () => {
  const globeRef = useRef(null)

  const globeReady = () => {
    if (globeRef.current) {
      const g = globeRef.current
      g.controls().autoRotate = true
      g.controls().autoRotateSpeed = 0.5
      g.controls().enableZoom = false
      g.pointOfView({
        lat: 19.054339351561637,
        lng: -50.421161072148465,
        altitude: 1.8,
      })
    }
  }

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
      <Globe
        ref={globeRef}
        onGlobeReady={globeReady}
        backgroundColor="#08070e"
        rendererConfig={{ antialias: true, alpha: true }}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        // show bump map as country textures
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: '#1a2033',
            opacity: 0.95,
            transparent: true,
          })
        }
        atmosphereColor="#5784a7"
        atmosphereAltitude={0.5}
        pointsMerge={true}
        pointsData={pointsData}
        pointAltitude={0.01}
        pointRadius={0.2}
        pointResolution={5}
        pointColor={() => '#eed31f'}
        arcsData={arcsData}
        arcAltitudeAutoScale={0.3}
        arcColor="color"
        arcStroke={0.5}
        arcDashGap={2}
        arcDashAnimateTime="time"
        polygonsData={topojson.feature(landTopology, landTopology.objects.land).features}
        polygonSideColor={() => '#00000000'}
        polygonCapMaterial={
          new THREE.MeshPhongMaterial({
            color: '#49ac8f',
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-topology.png'),
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
        customThreeObject={(d) => {
          const { size, color } = d
          return new THREE.Mesh(
            new THREE.SphereGeometry(size),
            new THREE.MeshBasicMaterial({ color })
          )
        }}
        customThreeObjectUpdate={(obj, d) => {
          const { lat, lng, altitude } = d
          Object.assign(obj.position, globeRef.current.getCoords(lat, lng, altitude))
        }}
      />
    </section>
  )
}

export default GlobalReach 