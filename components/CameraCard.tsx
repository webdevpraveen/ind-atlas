"use client";

import { useEffect, useState } from "react";
import { Camera } from "@/lib/cameras";
import { Video, Car, Building, Activity, Newspaper } from "lucide-react";

export default function CameraCard({ camera }: { camera: Camera }) {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [timeDisplay, setTimeDisplay] = useState("");
  const getEmbedSrc = () => {
    if (camera.source === 'youtube') {
      if (camera.youtubeVideoId) {
        return `https://www.youtube.com/embed/${camera.youtubeVideoId}?autoplay=1&mute=1&rel=0`;
      }
      if (camera.youtubeQuery) {
        return `/api/yt-live?query=${encodeURIComponent(camera.youtubeQuery)}&channel=${camera.youtubeChannelId || ''}`;
      }
      if (camera.youtubeChannelId) {
        return `/api/yt-live?channel=${camera.youtubeChannelId}`;
      }
    }
    return camera.directImageUrl || camera.embedUrl || null;
  };

  const embedSrc = getEmbedSrc();
  const hasDirectEmbed = !!embedSrc || !!camera.directImageUrl;
  const [hasError, setHasError] = useState(!hasDirectEmbed);
  const [loading, setLoading] = useState(hasDirectEmbed);

  // keep the image and clock refreshing smoothly
  // fixed this interval to 1000ms because 100ms was melting the CPU tbh
  useEffect(() => {
    const interval = setInterval(() => {
      if (camera.source === "pictimo" && camera.directImageUrl && !hasError) {
        setTimestamp(Date.now());
      }
      const now = new Date();
      setTimeDisplay(`${now.toISOString().split('T')[1].slice(0, 11)}Z`);
    }, 1000); // 1000ms for clock update
    return () => clearInterval(interval);
  }, [camera, hasError]);

  const getIcon = () => {
    switch (camera.type) {
      case "temple": return <Building className="w-3 h-3" />;
      case "traffic": return <Car className="w-3 h-3" />;
      case "city": return <Activity className="w-3 h-3" />;
      case "ghat": return <Video className="w-3 h-3" />;
      case "news": return <Newspaper className="w-3 h-3" />;
      default: return <Video className="w-3 h-3" />;
    }
  };

  const getStatusColor = () => {
    if (hasError) return "border-[var(--color-accent-orange)] shadow-[0_0_15px_rgba(255,140,0,0.3)]";
    switch (camera.status) {
      case "live": return "border-[var(--color-accent-green)] shadow-[var(--glow-green)]";
      case "checking": return "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]";
      case "offline": return "border-[var(--color-accent-red)] shadow-[var(--glow-red)]";
      default: return "border-[rgba(0,255,136,0.2)]";
    }
  };

  return (
    <div className={`relative flex flex-col bg-[#05050a] border ${getStatusColor()} rounded overflow-hidden transition-all duration-300 hover:scale-[1.02] group`}>
      {/* cool HUD corners to make it look like a spy movie */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-accent-green)] z-30 opacity-50 m-1 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-accent-green)] z-30 opacity-50 m-1 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-accent-green)] z-30 opacity-50 m-1 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-accent-green)] z-30 opacity-50 m-1 pointer-events-none"></div>

      {/* Top Header */}
      <div className="px-2 py-1.5 flex items-center justify-between border-b border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)] relative z-30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-accent-green)] animate-pulse">{getIcon()}</span>
          <span className="text-[10px] font-bold font-[var(--font-orbitron)] truncate max-w-[120px] tracking-wider text-glow">{camera.name.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          {camera.status === "live" && !hasError && (
            <div className="flex items-center gap-1 bg-black/50 px-1.5 rounded border border-[var(--color-accent-red)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[var(--glow-red)] animate-[pulse_1s_infinite]" />
              <span className="text-[8px] text-[var(--color-accent-red)] font-[var(--font-share-tech)] font-bold tracking-widest">REC</span>
            </div>
          )}
          <span className="text-[9px] text-[var(--color-accent-green)] font-[var(--font-share-tech)] uppercase bg-black/50 px-1 rounded border border-[var(--color-border-active)]">{camera.district}</span>
        </div>
      </div>

      {/* Media Content */}
      <div className="relative aspect-video bg-[#000] flex items-center justify-center overflow-hidden cam-crt">
        
        {/* HUD OVERLAYS */}
        <div className="absolute inset-0 z-20 pointer-events-none cam-scanline"></div>
        <div className="absolute top-2 right-2 z-30 text-[10px] text-[var(--color-accent-green)] font-[var(--font-share-tech)] opacity-70 tracking-widest drop-shadow-md">
          {timeDisplay}
        </div>
        <div className="absolute bottom-2 left-2 z-30 text-[9px] text-[var(--color-accent-green)] font-[var(--font-share-tech)] opacity-70 tracking-widest flex flex-col drop-shadow-md">
          <span>LAT: {camera.lat.toFixed(6)}</span>
          <span>LON: {camera.lng.toFixed(6)}</span>
        </div>
        <div className="absolute bottom-2 right-2 z-30 opacity-40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-green)" strokeWidth="1">
            <circle cx="12" cy="12" r="10" strokeDasharray="2 4"/>
            <path d="M12 2v20M2 12h20" opacity="0.5"/>
          </svg>
        </div>

        {loading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-40 font-[var(--font-share-tech)] text-[var(--color-accent-green)] animate-pulse tracking-widest text-xs border border-[var(--color-accent-green)] m-4 shadow-[var(--glow-green)]">
            ESTABLISHING CONNECTION...
          </div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center h-full w-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-black z-30 border border-[rgba(255,140,0,0.2)] p-4 text-center">
            <div className="w-10 h-10 border-2 border-dashed border-[var(--color-accent-orange)] rounded-full animate-spin mb-2 flex items-center justify-center">
              <span className="w-2 h-2 bg-[var(--color-accent-orange)] rounded-full"></span>
            </div>
            <div className="font-[var(--font-share-tech)] text-[10px] text-[var(--color-accent-orange)] animate-pulse mb-1 tracking-widest bg-black px-2 border border-[var(--color-accent-orange)]">
              SIGNAL INTERCEPTED
            </div>
            <p className="font-[var(--font-share-tech)] text-[8px] text-gray-500 mb-3 uppercase tracking-widest">ENCRYPTION ACTIVE</p>
            {(camera.sourceUrl || camera.fallbackUrl) && (
              <a 
                href={camera.sourceUrl || camera.fallbackUrl} 
                target="_blank" 
                rel="noreferrer"
                className="relative z-50 px-4 py-1.5 border border-[var(--color-accent-orange)] text-[var(--color-accent-orange)] bg-black/50 hover:bg-[var(--color-accent-orange)] hover:text-black text-[9px] font-[var(--font-share-tech)] font-bold transition-colors rounded shadow-[0_0_10px_rgba(255,140,0,0.4)] pointer-events-auto cursor-pointer uppercase tracking-widest"
              >
                BYPASS SECURITY
              </a>
            )}
          </div>
        ) : embedSrc ? (
          <iframe
            src={embedSrc}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="w-full h-full opacity-90 saturate-50 contrast-125"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setHasError(true); }}
          />
        ) : camera.directImageUrl ? (
          <img
            src={`/api/proxy-cam?url=${encodeURIComponent(camera.directImageUrl)}&t=${timestamp}`}
            alt={camera.name}
            className="w-full h-full object-cover opacity-90 saturate-50 contrast-125"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
