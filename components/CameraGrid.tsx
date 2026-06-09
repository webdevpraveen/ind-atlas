"use client";

import { Camera } from "@/lib/cameras";
import CameraCard from "./CameraCard";

export default function CameraGrid({ cameras, activeState, activeDistrict }: { cameras: Camera[], activeState: string, activeDistrict: string }) {
  let filteredCameras = cameras;
  if (activeState) {
    filteredCameras = filteredCameras.filter(c => c.state.toLowerCase() === activeState.toLowerCase());
  }
  if (activeDistrict) {
    filteredCameras = filteredCameras.filter(c => (c.location || "").toLowerCase().includes(activeDistrict.toLowerCase()));
  }

  return (
    <div className="h-full flex flex-col p-4 relative">
      <div className="corner-borders absolute inset-0 m-2 pointer-events-none opacity-30"></div>
      
      <div className="flex justify-between items-end mb-4 border-b border-[var(--color-border-active)] pb-2 relative z-10">
        <div>
          <h2 className="text-sm font-[var(--font-orbitron)] text-[var(--color-accent-green)] tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--color-accent-green)] animate-pulse rounded-full"></span>
            LIVE FEEDS // INTERCEPT
          </h2>
          <p className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-share-tech)] uppercase mt-1">
            Secure visual uplink established
          </p>
        </div>
        <div className="text-right">
          <span className="text-[20px] font-bold font-[var(--font-share-tech)] text-[var(--color-accent-green)] leading-none">{filteredCameras.length}</span>
          <span className="block text-[8px] text-[var(--color-accent-blue)] font-[var(--font-orbitron)] tracking-widest uppercase mt-1">Active Nodes</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 pb-10 relative z-10">
        {filteredCameras.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCameras.map(camera => (
              <CameraCard key={camera.id} camera={camera} />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col gap-2 text-[var(--color-text-muted)] font-[var(--font-share-tech)]">
            <div className="w-16 h-16 border-2 border-dashed border-[var(--color-text-muted)] rounded-full flex items-center justify-center opacity-50">
              🚫
            </div>
            <p>NO ACTIVE SIGNALS IN THIS SECTOR</p>
          </div>
        )}
      </div>
    </div>
  );
}
