"use client";

import { useEffect, useState } from "react";
import LiveBadge from "./LiveBadge";
import statesAndDistricts from "@/lib/statesAndDistricts.json";
import { useAi } from "@/lib/AiContext";

export default function Header({ 
  activeState, 
  setActiveState,
  activeDistrict,
  setActiveDistrict 
}: { 
  activeState: string, 
  setActiveState: (d: string) => void,
  activeDistrict: string,
  setActiveDistrict: (d: string) => void
}) {
  const [time, setTime] = useState("");
  const { setIsSettingsOpen } = useAi();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      setTime(formatter.format(now) + " IST");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedStateObj = statesAndDistricts.find(s => s.state === activeState);

  return (
    <header className="flex-shrink-0 w-full z-50 glass-panel border-b border-[var(--color-border-subtle)] px-4 py-2 flex items-center justify-between">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
        <h1 className="text-lg md:text-xl font-bold text-[var(--color-accent-green)] font-[var(--font-orbitron)] text-glow whitespace-nowrap">
          IND ATLAS <span className="hidden sm:inline text-[10px] text-[var(--color-text-muted)] tracking-widest">v2.0</span>
        </h1>
        
        <div className="flex items-center gap-2">
          <select 
            value={activeState} 
            onChange={(e) => {
              setActiveState(e.target.value);
              setActiveDistrict(""); // reset district on state change
            }}
            className="bg-[var(--color-bg-card)] border border-[var(--color-border-active)] text-[var(--color-accent-green)] text-xs font-[var(--font-share-tech)] px-2 py-1 rounded shadow-[var(--glow-green)] focus:outline-none max-w-[140px] md:max-w-none"
          >
            <option value="">ALL STATES</option>
            {statesAndDistricts.map(s => (
              <option key={s.state} value={s.state}>{s.state.toUpperCase()}</option>
            ))}
          </select>

          {activeState && selectedStateObj && (
            <select 
              value={activeDistrict} 
              onChange={(e) => setActiveDistrict(e.target.value)}
              className="bg-[var(--color-bg-card)] border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] text-xs font-[var(--font-share-tech)] px-2 py-1 rounded shadow-[var(--glow-blue)] focus:outline-none max-w-[140px] md:max-w-none"
            >
              <option value="">ALL DISTRICTS</option>
              {selectedStateObj.districts.map(d => (
                <option key={d} value={d}>{d.toUpperCase()}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6 text-xs md:text-sm font-[var(--font-share-tech)]">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-green)] transition-colors border border-transparent hover:border-[var(--color-accent-green)] px-2 py-1 rounded flex items-center gap-1"
          title="AI Settings"
        >
          ⚙️ <span className="hidden sm:inline">CONFIG</span>
        </button>
        <LiveBadge />
        <div className="text-[var(--color-accent-blue)] min-w-[70px] md:min-w-[100px] text-right text-glow whitespace-nowrap">
          {time || "00:00:00 IST"}
        </div>
      </div>
    </header>
  );
}
