"use client";

import * as L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const HeatmapLayer: React.FC<{ points: any[]; intensity: number }> = ({
  points,
  intensity,
}) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(
      points.map((p) => [p.lat, p.lng, p.intensity * intensity]),
      { radius: 25, blur: 15, maxZoom: 17 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, intensity, map]);

  return null;
};

const HeatmapSection: React.FC = () => {
  const points = [
    { lat: 37.7749, lng: -122.4194, intensity: 0.5 },
    { lat: 37.7849, lng: -122.4294, intensity: 0.6 },
    { lat: 37.7649, lng: -122.4094, intensity: 0.7 },
  ];

  const [intensity, setIntensity] = useState<number>(1);

  return (
    <div className="w-full h-[500px] mb-5">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <HeatmapLayer points={points} intensity={intensity} />
      </MapContainer>
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-2">
          Ajustar Intensidade do Heatmap
        </h3>
        <Slider
          min={0.1}
          max={3}
          step={0.1}
          value={intensity}
          // @ts-ignore
          onChange={(value) => setIntensity(value)}
        />
      </div>
    </div>
  );
};

export default HeatmapSection;
