"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import WeatherTicker from "@/components/WeatherTicker";
import CameraGrid from "@/components/CameraGrid";
import NewsPanel from "@/components/NewsPanel";
import StateProfilePanel from "@/components/StateProfilePanel";
import StatsBar from "@/components/StatsBar";
import WeatherMapModal from "@/components/WeatherMapModal";
import { CAMERAS } from "@/lib/cameras";

// Leaflet needs to be dynamically imported with ssr: false due to window usage
const MapPanel = dynamic(() => import("@/components/MapPanel"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full border border-[var(--color-border-subtle)] rounded bg-[var(--color-bg-card)]">
      <span className="font-mono text-[var(--color-accent-green)] animate-pulse">
        INITIALIZING MAP...
      </span>
    </div>
  )
});

const queryClient = new QueryClient();

import { AiProvider } from "@/lib/AiContext";
import SettingsModal from "@/components/SettingsModal";

export default function Dashboard() {
  const [activeState, setActiveState] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("");
  const [weatherMapOpen, setWeatherMapOpen] = useState(false);

  const liveCount = CAMERAS.filter(c => c.status === "live").length;

  return (
    <QueryClientProvider client={queryClient}>
      <AiProvider>
        <main className="h-screen w-full flex flex-col relative bg-[var(--color-bg-primary)] overflow-hidden">
          <Header 
            activeState={activeState} 
            setActiveState={setActiveState}
            activeDistrict={activeDistrict}
            setActiveDistrict={setActiveDistrict} 
          />
          <WeatherTicker />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden z-10">
            
            {/* Map Panel - 40% */}
            <div className="w-full lg:w-[40%] h-[40vh] lg:h-full relative bg-[#05050a]">
              <MapPanel 
                activeState={activeState} 
                setActiveState={setActiveState}
                activeDistrict={activeDistrict}
                setActiveDistrict={setActiveDistrict}
                setWeatherMapOpen={setWeatherMapOpen} 
              />
            </div>

            {/* Camera Panel - 35% */}
            <div className="w-full lg:w-[35%] h-[40vh] lg:h-full border-l border-[var(--color-border-subtle)] bg-[rgba(13,13,26,0.8)] backdrop-blur-md shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
              <CameraGrid cameras={CAMERAS} activeState={activeState} activeDistrict={activeDistrict} />
            </div>

            {/* News or Profile Panel - 25% */}
            <div className="w-full lg:w-[25%] h-[40vh] lg:h-full">
              {activeState ? (
                <StateProfilePanel activeState={activeState} activeDistrict={activeDistrict} />
              ) : (
                <NewsPanel activeState={activeState} activeDistrict={activeDistrict} />
              )}
            </div>
            
          </div>

          <StatsBar liveCount={liveCount} />

          <WeatherMapModal isOpen={weatherMapOpen} onClose={() => setWeatherMapOpen(false)} />
          <SettingsModal />
        </main>
      </AiProvider>
    </QueryClientProvider>
  );
}
