import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

function HeatmapLayer({ points, intensity }) {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (!heatLayerRef.current) {
      heatLayerRef.current = L.heatLayer([], { radius: 25, blur: 15, max: intensity }).addTo(map);
    }

    const adjustedData = points.map(([lat, lng]) => [lat, lng, 0.5 * intensity]);

    // Atualiza os dados do Heatmap
    // @ts-ignore
    heatLayerRef.current.setLatLngs(adjustedData).redraw();

    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, points, intensity]);

  return null;
}

function ChangeView({ center }) {
  const map = useMap();
  const prevCenterRef = useRef(center);

  useEffect(() => {
    const prevCenter = prevCenterRef.current;
    const currentCenter = map.getCenter();

    // Apenas recentraliza se o novo centro for diferente do centro atual
    if (currentCenter.lat !== center[0] || currentCenter.lng !== center[1]) {
      map.setView(center); // Recentraliza no novo centro
      prevCenterRef.current = center; // Atualiza o centro anterior
    }
  }, [center, map]);

  return null;
}

export default function HeatmapSection({ isAsideOpen, mapCenter, heatmapData2, intensity, setIntensity }) {
  return (
    <section className={`mt-[120px] md:mt-[200px] lg:mt-[400px] min-h-[1000px] bg-white rounded-lg shadow-lg overflow-hidden ${isAsideOpen === true ? "hidden" : ""}`}>
      <div className="py-12 px-6 md:px-12">
        <h1 className="font-bold text-4xl md:text-6xl text-center tracking-tight text-gray-800 mb-8">
          Heatmap
        </h1>
        <div className="w-full space-y-6">
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <ChangeView center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <HeatmapLayer points={heatmapData2} intensity={intensity} />
            </MapContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-6">
            <label
              htmlFor="intensity-slider"
              className="text-sm font-medium text-gray-700"
            >
              Intensidade:
            </label>
            <input
              id="intensity-slider"
              type="range"
              min="0.2"
              max="10"
              step="0.2"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              className="w-3/4 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 w-12 text-right">
              {intensity.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
