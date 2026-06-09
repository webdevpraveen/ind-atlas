"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WINDY_LAYERS = [
  {
    id: 'wind',
    label: '💨 WIND',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
  {
    id: 'temp',
    label: '🌡️ TEMPERATURE',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=temp&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
  {
    id: 'rain',
    label: '🌧️ RAIN',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
  {
    id: 'clouds',
    label: '☁️ CLOUDS',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=clouds&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
  {
    id: 'radar',
    label: '📡 RADAR',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
  {
    id: 'satellite',
    label: '🛰️ SATELLITE',
    url: 'https://zoom.earth/maps/satellite/#view=20.5,78.9,5z',
    isExternal: true
  },
  {
    id: 'aqi',
    label: '😷 AQI/DUST',
    url: 'https://embed.windy.com/embed2.html?lat=20.5&lon=78.9&detailLat=20.5&detailLon=78.9&width=650&height=450&zoom=5&level=surface&overlay=dust&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1'
  },
];

export default function WeatherMapModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeLayer, setActiveLayer] = useState('temp');
  const current = WINDY_LAYERS.find(l => l.id === activeLayer);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: 'rgba(6,6,15,0.95)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-accent-green)] font-[var(--font-share-tech)] text-sm md:text-lg border border-[var(--color-border-active)] px-3 py-1 rounded hover:bg-[var(--color-accent-green-dim)] transition-colors z-50"
          >
            [X] CLOSE
          </button>

          <div className="w-[95vw] md:w-[90vw] h-[90vh] md:h-[85vh] flex flex-col gap-3 mt-12 md:mt-0">
            <div className="flex gap-2 flex-wrap">
              {WINDY_LAYERS.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`px-3 py-1.5 text-xs font-[var(--font-share-tech)] border rounded transition-all ${
                    activeLayer === layer.id
                      ? 'border-[var(--color-accent-green)] bg-[var(--color-accent-green-dim)] text-[var(--color-accent-green)]'
                      : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-green)]'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            <div
              className="flex-1 rounded border overflow-hidden relative"
              style={{ borderColor: 'var(--color-border-active)', boxShadow: 'var(--glow-green)' }}
            >
              {current?.isExternal ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 border border-[var(--color-border-active)] rounded bg-[var(--color-bg-primary)] h-full">
                  <p className="font-mono text-[var(--color-accent-green)] text-sm">
                    🛰️ Satellite view opens in external viewer
                  </p>
                  <a href={current.url} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-2 border border-[var(--color-accent-green)] text-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-dim)] font-[var(--font-share-tech)] text-sm rounded">
                    → OPEN SATELLITE VIEW
                  </a>
                  <p className="text-xs text-[var(--color-text-muted)] font-[var(--font-share-tech)]">
                    Use zoom.earth or earthdata.nasa.gov for live satellite
                  </p>
                </div>
              ) : (
                <iframe
                  key={activeLayer}
                  src={current?.url}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={`IND Atlas — ${current?.label}`}
                />
              )}
              <div className="absolute top-2 left-2 bg-[var(--color-bg-card)] border border-[var(--color-border-active)] px-2 py-1 text-xs font-[var(--font-share-tech)] text-[var(--color-accent-green)] rounded z-10 shadow-[var(--glow-green)]">
                IND ATLAS • {current?.label}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
