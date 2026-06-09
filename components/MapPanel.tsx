"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CAMERAS } from "@/lib/cameras";

// Fix Leaflet default icon missing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapUpdater({ activeState, activeDistrict, statesData, districtsData }: { activeState: string, activeDistrict: string, statesData: any, districtsData: any }) {
  const map = useMap();
  useEffect(() => {
    if (activeDistrict && districtsData) {
      // Zoom to district
      const layer = L.geoJSON(districtsData, {
        filter: (f) => f.properties.NAME_2.toLowerCase() === activeDistrict.toLowerCase() && f.properties.NAME_1.toLowerCase() === activeState.toLowerCase()
      });
      if (layer.getBounds().isValid()) {
        map.fitBounds(layer.getBounds(), { padding: [20, 20], animate: true });
      }
    } else if (activeState && statesData) {
      // Find the bounding box of the active state and zoom to it
      const layer = L.geoJSON(statesData, {
        filter: (feature) => feature.properties.NAME_1.toLowerCase() === activeState.toLowerCase()
      });
      if (layer.getBounds().isValid()) {
        map.fitBounds(layer.getBounds(), { padding: [20, 20], animate: true });
      }
    } else {
      map.setView([20.5937, 78.9629], 5, { animate: true }); // Default India view
    }
  }, [activeState, activeDistrict, statesData, districtsData, map]);
  return null;
}

export default function MapPanel({ 
  activeState, 
  setActiveState, 
  activeDistrict,
  setActiveDistrict,
  setWeatherMapOpen 
}: { 
  activeState: string, 
  setActiveState: (d: string) => void, 
  activeDistrict: string,
  setActiveDistrict: (d: string) => void,
  setWeatherMapOpen: (b: boolean) => void 
}) {
  const [statesGeoData, setStatesGeoData] = useState<any>(null);
  const [districtsGeoData, setDistrictsGeoData] = useState<any>(null);

  useEffect(() => {
    // Load local geojson files we downloaded to public/
    fetch("/india-states.geojson")
      .then(res => res.json())
      .then(data => setStatesGeoData(data))
      .catch(console.error);

    fetch("/india-districts.geojson")
      .then(res => res.json())
      .then(data => setDistrictsGeoData(data))
      .catch(console.error);
  }, []);

  const stateStyle = {
    fillColor: 'rgba(0,255,136,0.04)',
    weight: 1,
    color: 'rgba(0,255,136,0.3)',
    fillOpacity: 1,
  };

  const districtStyle = {
    fillColor: 'rgba(0,180,255,0.05)',
    weight: 1,
    color: 'rgba(0,180,255,0.4)',
    fillOpacity: 1,
  };

  const activeStateStyle = {
    fillColor: 'rgba(0,255,136,0.1)',
    weight: 2,
    color: 'rgba(0,255,136,0.8)',
    fillOpacity: 1,
  };

  const activeDistrictStyle = {
    fillColor: 'rgba(0,180,255,0.2)',
    weight: 2,
    color: 'rgba(0,180,255,0.9)',
    fillOpacity: 1,
  };

  const onEachState = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target;
        if (activeState.toLowerCase() !== feature.properties.NAME_1.toLowerCase()) {
          l.setStyle({
            fillColor: 'rgba(0,255,136,0.15)',
            weight: 2,
            color: 'rgba(0,255,136,0.8)',
          });
        }
      },
      mouseout: (e: any) => {
        const l = e.target;
        if (activeState.toLowerCase() !== feature.properties.NAME_1.toLowerCase()) {
          l.setStyle(stateStyle);
        } else {
          l.setStyle(activeStateStyle);
        }
      },
      click: () => {
        const stateName = feature.properties.NAME_1;
        setActiveState(activeState === stateName ? "" : stateName);
        setActiveDistrict(""); // reset district
      }
    });
    layer.bindTooltip(feature.properties.NAME_1, { className: 'font-[var(--font-orbitron)] text-[var(--color-accent-green)] bg-black border-[var(--color-border-active)]' });
  };

  const onEachDistrict = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target;
        if (activeDistrict.toLowerCase() !== feature.properties.NAME_2.toLowerCase()) {
          l.setStyle({
            fillColor: 'rgba(0,180,255,0.15)',
            weight: 2,
            color: 'rgba(0,180,255,0.8)',
          });
        }
      },
      mouseout: (e: any) => {
        const l = e.target;
        if (activeDistrict.toLowerCase() !== feature.properties.NAME_2.toLowerCase()) {
          l.setStyle(districtStyle);
        } else {
          l.setStyle(activeDistrictStyle);
        }
      },
      click: () => {
        const distName = feature.properties.NAME_2;
        setActiveDistrict(activeDistrict === distName ? "" : distName);
      }
    });
    layer.bindTooltip(feature.properties.NAME_2, { className: 'font-[var(--font-orbitron)] text-[var(--color-accent-blue)] bg-black border-[var(--color-border-active)]' });
  };

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: "100%", width: "100%", background: "transparent" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />
        
        <MapUpdater activeState={activeState} activeDistrict={activeDistrict} statesData={statesGeoData} districtsData={districtsGeoData} />

        {/* States Layer */}
        {statesGeoData && (
          <GeoJSON 
            data={statesGeoData} 
            style={(feature) => feature?.properties.NAME_1.toLowerCase() === activeState.toLowerCase() ? activeStateStyle : stateStyle}
            onEachFeature={onEachState}
          />
        )}

        {/* Districts Layer (only show for active state) */}
        {activeState && districtsGeoData && (
          <GeoJSON 
            key={`${activeState}-${activeDistrict}`} // force re-render when state/district changes
            data={{
              ...districtsGeoData,
              features: districtsGeoData.features.filter((f: any) => {
                const sName = f.properties.NAME_1 || "";
                return sName.toLowerCase() === activeState.toLowerCase();
              })
            }}
            style={(feature) => feature?.properties.NAME_2.toLowerCase() === activeDistrict.toLowerCase() ? activeDistrictStyle : districtStyle}
            onEachFeature={onEachDistrict}
          />
        )}

        {/* Camera Pulse Dots */}
        {CAMERAS.filter(c => c.status !== 'offline').map(cam => {
          // If a state is selected, only show cameras for that state
          if (activeState && cam.state.toLowerCase() !== activeState.toLowerCase()) return null;
          // If a district is selected, only show cameras for that district (by checking if location string contains district)
          if (activeDistrict && !(cam.location || "").toLowerCase().includes(activeDistrict.toLowerCase())) return null;

          return (
            <CircleMarker
              key={cam.id}
              center={[cam.lat, cam.lng]}
              radius={6}
              pathOptions={{
                color: '#00ff88',
                fillColor: '#00ff88',
                fillOpacity: 0.8,
                weight: 2,
              }}
              className="animate-pulse"
            >
              <Popup>
                <div style={{ background: '#0d0d20', color: '#00ff88', padding: '8px', fontFamily: 'var(--font-share-tech)' }}>
                  <strong className="font-[var(--font-orbitron)] text-sm">{cam.name}</strong><br/>
                  {cam.location} • {cam.type.toUpperCase()}<br/>
                  LAT: {cam.lat.toFixed(4)} LON: {cam.lng.toFixed(4)}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

      </MapContainer>
      
      {/* Reset View Button */}
      {activeState && (
        <button
          onClick={() => { setActiveState(''); setActiveDistrict(''); }}
          className="absolute top-4 left-4 z-[1000] font-[var(--font-share-tech)] text-xs border border-[var(--color-border-active)] bg-[var(--color-bg-card)] text-[var(--color-accent-green)] px-3 py-1.5 rounded hover:bg-[var(--color-accent-green-dim)] transition-colors shadow-[var(--glow-green)]"
        >
          ← ALL INDIA
        </button>
      )}

      {/* Weather Map Button */}
      <button
        onClick={() => setWeatherMapOpen(true)}
        className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 px-3 py-2 rounded border border-[var(--color-border-active)] bg-[var(--color-bg-card)] text-[var(--color-accent-green)] text-sm font-[var(--font-share-tech)] hover:bg-[var(--color-accent-green-dim)] transition-all"
        style={{ boxShadow: 'var(--glow-green)' }}
      >
        🌍 WEATHER MAP
      </button>

      {/* Decorative scanlines on map */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-[1000]"></div>
    </div>
  );
}
