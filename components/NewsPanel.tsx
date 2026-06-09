"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/news";

export default function NewsPanel({ activeState, activeDistrict }: { activeState: string, activeDistrict: string }) {
  const [activeSource, setActiveSource] = useState('ALL');
  const sources = ['ALL', 'NDTV', 'TOI', 'Indian Express'];

  const { data: newsItems, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNews, staleTime: 300000 });

  let filteredNews = newsItems;
  if (activeState && filteredNews) {
    filteredNews = filteredNews.filter(n => !n.state || n.state.toLowerCase() === activeState.toLowerCase() || n.state === 'National');
  }
  if (activeDistrict && filteredNews) {
    // Currently news only has `state`. Let's assume title might contain district or just keep state-level news if no district news available.
    // For now, filter by title including district, OR just keep state news. Let's do title search:
    const districtNews = filteredNews.filter(n => n.title.toLowerCase().includes(activeDistrict.toLowerCase()));
    if (districtNews.length > 0) {
      filteredNews = districtNews;
    }
  }

  const displayed = activeSource === 'ALL' 
    ? filteredNews 
    : filteredNews?.filter(n => n.source.toLowerCase().includes(activeSource.toLowerCase()));

  return (
    <div className="h-full flex flex-col p-4 border-l border-[var(--color-border-subtle)] glass-panel bg-opacity-30">
      <h2 className="text-sm font-[var(--font-orbitron)] text-[var(--color-accent-green)] mb-3 border-b border-[var(--color-border-active)] pb-2 flex justify-between items-end">
        <span>INTEL FEED // RSS</span>
      </h2>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide flex-shrink-0">
        {sources.map(src => (
          <button
            key={src}
            onClick={() => setActiveSource(src)}
            className={`px-2 py-1 text-[9px] font-[var(--font-share-tech)] border rounded whitespace-nowrap transition-colors uppercase ${
              activeSource === src 
                ? 'border-[var(--color-accent-green)] bg-[var(--color-accent-green-dim)] text-[var(--color-accent-green)]' 
                : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-green)] hover:text-[var(--color-accent-green)]'
            }`}
          >
            {src}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-3">
        {isLoading ? (
          <div className="text-[var(--color-text-muted)] font-[var(--font-share-tech)] text-sm animate-pulse">
            DECRYPTING DATA...
          </div>
        ) : displayed && displayed.length > 0 ? (
          displayed.map((news, i) => (
            <a key={i} href={news.link} target="_blank" rel="noreferrer" className="block p-3 border border-[rgba(0,255,136,0.1)] bg-[rgba(13,13,26,0.5)] hover:border-[var(--color-accent-blue)] transition-colors group">
              <div className="flex justify-between items-center mb-1 text-[10px] font-[var(--font-share-tech)] text-[var(--color-text-muted)]">
                <span className="group-hover:text-[var(--color-accent-blue)]">{news.source}</span>
                <span>{news.time}</span>
              </div>
              <h3 className="text-xs text-[var(--color-text-primary)] font-medium leading-snug mb-2 group-hover:text-white transition-colors">
                {news.title}
              </h3>
              {news.state && (
                <div className="text-[10px] font-[var(--font-share-tech)] text-[var(--color-accent-green)] uppercase tracking-wider">
                  [{news.state}]
                </div>
              )}
            </a>
          ))
        ) : (
          <div className="text-[var(--color-text-muted)] font-[var(--font-share-tech)] text-sm">
            NO INTELLIGENCE FOUND FOR THIS SECTOR.
          </div>
        )}
      </div>
    </div>
  );
}
