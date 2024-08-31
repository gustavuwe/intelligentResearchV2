"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.heat'

// @ts-ignore
import L from 'leaflet'

// Extend the Window interface to include L
declare global {
  interface Window {
    L: typeof L;
  }
}

const HeatmapLayer = ({ data }: { data: number[][] }) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // @ts-ignore
    const heat = L.heatLayer(data, { radius: 25 }).addTo(map)

    return () => {
      map.removeLayer(heat)
    }
  }, [map, data])

  return null
}

export default function Component() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sample data: [lat, lng, intensity]
  const heatmapData = [
    [-6.2566613, -36.5020734, 0.8],
  ]

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer center={[-6.2566613, -36.5020734]} zoom={20} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer data={heatmapData} />
      </MapContainer>
    </div>
  )
}