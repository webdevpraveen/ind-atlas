"use client";

import { useEffect, useState } from "react";

export default function StatsBar({ liveCount }: { liveCount: number }) {
  const [lastSync, setLastSync] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(prev => prev + 1);
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 w-full h-8 glass-panel border-t border-[var(--color-border-subtle)] flex items-center justify-between px-4 text-xs font-[var(--font-share-tech)] z-50">
      <div className="flex gap-6">
        <span className="text-[var(--color-text-primary)]">📍 28 States / 8 UTs</span>
        <span className="text-[var(--color-text-muted)]">|</span>
        <span className="text-[var(--color-accent-green)]">👁 {liveCount} Live Feeds</span>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-muted)]">DEFCON:</span>
          <span className="bg-[#00ff88] text-[#06060f] px-2 py-0.5 font-bold shadow-[0_0_8px_rgba(0,255,136,0.8)]">NORM</span>
        </div>
        <span className="text-[var(--color-text-muted)] hidden sm:inline">|</span>
        <span className="text-[var(--color-text-muted)] hidden sm:inline">⏱ Last Sync: {lastSync === 0 ? "Just now" : `${lastSync}m ago`}</span>
      </div>
    </div>
  );
}
