"use client";

import { useState, useEffect } from "react";
import { StateProfile, getStateProfile } from "@/lib/stateProfiles";
import NewsPanel from "./NewsPanel";
import { useAi } from "@/lib/AiContext";
import { fetchNews } from "@/lib/news";
import { useQuery } from "@tanstack/react-query";

export default function StateProfilePanel({ activeState, activeDistrict }: { activeState: string, activeDistrict: string }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'news'>('profile');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const { groqApiKey, setIsSettingsOpen } = useAi();
  
  const baseProfile = getStateProfile(activeState);

  // Fetch news for the state to feed to the AI
  const { data: newsItems } = useQuery({ 
    queryKey: ["news_for_ai", activeState], 
    queryFn: fetchNews, 
    staleTime: 300000 
  });

  // Fetch AI Analysis
  const { data: aiAnalysis, isLoading: isAiLoading, error: aiError } = useQuery({
    queryKey: ["ai_analysis", activeState, groqApiKey],
    queryFn: async () => {
      if (!groqApiKey) return null;
      
      const relevantNews = newsItems 
        ? newsItems.filter(n => !n.state || n.state.toLowerCase() === activeState.toLowerCase() || n.state === 'National').slice(0, 10).map(n => n.title)
        : [];
      
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: groqApiKey, state: activeState, news: relevantNews })
      });
      
      if (!res.ok) throw new Error("Failed to fetch AI intel");
      return res.json();
    },
    enabled: !!groqApiKey && !!activeState && !!newsItems,
    staleTime: 600000 // 10 mins
  });

  // Merge AI data into profile if available
  const profile = aiAnalysis ? {
    ...baseProfile,
    instabilityIndex: aiAnalysis.instabilityIndex ?? baseProfile.instabilityIndex,
    resilienceScore: aiAnalysis.resilienceScore ?? baseProfile.resilienceScore,
    breakdown: aiAnalysis.breakdown ?? baseProfile.breakdown,
    brief: aiAnalysis.brief ?? baseProfile.brief,
    sources: {
      ...baseProfile.sources,
      intel: "Real-time AI OSINT Analysis via Groq"
    }
  } : baseProfile;
  
  if (!activeState) return null;
  
  const InfoIcon = ({ text, id }: { text: string, id: string }) => (
    <div 
      className="relative inline-block ml-2 align-middle"
      onMouseEnter={() => setShowTooltip(id)}
      onMouseLeave={() => setShowTooltip(null)}
    >
      <span className="cursor-help text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)] rounded-full w-3 h-3 flex items-center justify-center text-[8px] opacity-70 hover:opacity-100">
        i
      </span>
      {showTooltip === id && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black border border-[var(--color-border-active)] rounded text-[10px] text-[var(--color-text-primary)] font-[var(--font-inter)] shadow-[0_4px_10px_rgba(0,180,255,0.2)] leading-tight">
          {text}
        </div>
      )}
    </div>
  );

  const ProgressBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] font-[var(--font-share-tech)] text-[var(--color-text-muted)] mb-1">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-[rgba(0,0,0,0.5)] rounded overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col border-l border-[var(--color-border-subtle)] glass-panel bg-opacity-30">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-[var(--color-border-subtle)]">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 text-xs font-[var(--font-orbitron)] ${activeTab === 'profile' ? 'bg-[var(--color-accent-green-dim)] text-[var(--color-accent-green)] border-b-2 border-[var(--color-accent-green)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}
        >
          INTEL DOSSIER
        </button>
        <button 
          onClick={() => setActiveTab('news')}
          className={`flex-1 py-2 text-xs font-[var(--font-orbitron)] ${activeTab === 'news' ? 'bg-[var(--color-accent-blue)] bg-opacity-10 text-[var(--color-accent-blue)] border-b-2 border-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}
        >
          RSS FEEDS
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'news' ? (
          <NewsPanel activeState={activeState} activeDistrict={activeDistrict} />
        ) : (
          <div className="p-4 space-y-6 relative">
            
            {/* AI Warning / Loading Overlay */}
            {!groqApiKey && (
              <div className="bg-[rgba(255,200,0,0.1)] border border-[var(--color-accent-yellow)] rounded p-3 mb-4 flex items-center justify-between">
                <p className="text-xs text-[var(--color-accent-yellow)] font-[var(--font-inter)] leading-relaxed flex-1 mr-4">
                  <strong>INTELLIGENCE DEGRADED:</strong> OSINT AI Analysis offline. Using static baseline data. 
                </p>
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-3 py-1 bg-[var(--color-accent-yellow)] text-black font-[var(--font-orbitron)] text-[10px] rounded hover:bg-white transition-colors whitespace-nowrap"
                >
                  SET AI KEY
                </button>
              </div>
            )}

            {isAiLoading && (
              <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded">
                <div className="w-8 h-8 border-2 border-[var(--color-accent-green)] border-t-transparent rounded-full animate-spin mb-2"></div>
                <div className="text-[10px] text-[var(--color-accent-green)] font-[var(--font-orbitron)] tracking-widest animate-pulse">GENERATING AI DOSSIER...</div>
              </div>
            )}

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🇮🇳</span>
                <h2 className="text-lg font-[var(--font-orbitron)] text-[var(--color-text-primary)] tracking-wider uppercase">
                  {profile.name}
                </h2>
                {activeDistrict && (
                  <span className="text-sm font-[var(--font-share-tech)] text-[var(--color-accent-blue)]">
                    / {activeDistrict}
                  </span>
                )}
              </div>
              <div className="text-[10px] font-[var(--font-share-tech)] text-[var(--color-text-muted)] uppercase tracking-widest border border-[var(--color-border-subtle)] inline-block px-2 py-0.5 rounded bg-[rgba(0,0,0,0.5)]">
                STATE INTELLIGENCE DOSSIER
              </div>
            </div>

            {/* Indices Row */}
            <div className="flex gap-4">
              <div className="flex-1 bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[var(--color-border-subtle)] relative">
                <div className="flex items-center text-[10px] text-[var(--color-text-muted)] font-[var(--font-share-tech)] uppercase mb-1">
                  Instability Index <InfoIcon id="instability" text={profile.sources.intel} />
                </div>
                <div className={`text-2xl font-[var(--font-orbitron)] ${profile.instabilityIndex > 50 ? 'text-[var(--color-accent-red)]' : profile.instabilityIndex > 30 ? 'text-[var(--color-accent-orange)]' : 'text-[var(--color-accent-green)]'}`}>
                  {profile.instabilityIndex}/100 <span className="text-xs">↑</span>
                </div>
              </div>
              <div className="flex-1 bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[var(--color-border-subtle)] relative">
                <div className="flex items-center text-[10px] text-[var(--color-text-muted)] font-[var(--font-share-tech)] uppercase mb-1">
                  Resilience Score <InfoIcon id="resil" text={profile.sources.intel} />
                </div>
                <div className="text-2xl font-[var(--font-orbitron)] text-[var(--color-accent-blue)]">
                  {profile.resilienceScore} <span className="text-[10px] text-[var(--color-text-muted)]">HIGH</span>
                </div>
              </div>
            </div>

            {/* Threat Matrix */}
            <div>
              <h3 className="text-xs font-[var(--font-orbitron)] text-[var(--color-accent-green)] mb-3 border-b border-[var(--color-border-subtle)] pb-1 flex items-center">
                THREAT MATRIX
              </h3>
              <ProgressBar label="Unrest / Protests" value={profile.breakdown.unrest} color="var(--color-accent-yellow)" />
              <ProgressBar label="Conflict / Crime" value={profile.breakdown.conflict} color="var(--color-accent-red)" />
              <ProgressBar label="Military / Security" value={profile.breakdown.military} color="var(--color-accent-orange)" />
              <ProgressBar label="Information / Cyber" value={profile.breakdown.info} color="var(--color-accent-blue)" />
            </div>

            {/* Resilience Categories */}
            <div>
              <h3 className="text-xs font-[var(--font-orbitron)] text-[var(--color-accent-green)] mb-3 border-b border-[var(--color-border-subtle)] pb-1">RESILIENCE BREAKDOWN</h3>
              <div className="grid grid-cols-2 gap-x-4">
                <ProgressBar label="Economic" value={profile.categories.economic} color="#00ff88" />
                <ProgressBar label="Infra & Supply" value={profile.categories.infra} color="#00b4ff" />
                <ProgressBar label="Energy" value={profile.categories.energy} color="#ffcc00" />
                <ProgressBar label="Social & Gov" value={profile.categories.social} color="#00ff88" />
                <ProgressBar label="Health" value={profile.categories.health} color="#00b4ff" />
                <ProgressBar label="Recovery" value={profile.categories.recovery} color="#00ff88" />
              </div>
            </div>

            {/* Intelligence Brief */}
            <div className="bg-[rgba(0,255,136,0.02)] border border-[var(--color-border-active)] p-3 rounded text-sm font-[var(--font-share-tech)] text-[var(--color-text-primary)] relative">
              <div className="absolute top-2 right-2">
                 <InfoIcon id="brief" text={profile.sources.intel} />
              </div>
              <h4 className="text-[10px] text-[var(--color-accent-green)] mb-2 font-[var(--font-orbitron)]">SITUATION REPORT</h4>
              <p className="mb-3 leading-relaxed text-gray-300">{profile.brief.situation}</p>
              
              <h4 className="text-[10px] text-[var(--color-accent-green)] mb-1 font-[var(--font-orbitron)]">KEY RISKS</h4>
              <ul className="list-disc pl-4 mb-3 space-y-1 text-gray-400 text-xs">
                {profile.brief.risks.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
              
              <h4 className="text-[10px] text-[var(--color-accent-green)] mb-1 font-[var(--font-orbitron)]">24H OUTLOOK</h4>
              <p className="text-xs text-[var(--color-accent-orange)]">{profile.brief.outlook24h}</p>
            </div>

            {/* State Facts */}
            <div>
              <h3 className="text-xs font-[var(--font-orbitron)] text-[var(--color-accent-green)] mb-3 border-b border-[var(--color-border-subtle)] pb-1 flex items-center">
                OFFICIAL STATE FACTS <InfoIcon id="demo" text={profile.sources.demographics} />
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-[var(--font-share-tech)] text-[var(--color-text-muted)]">
                <div>Population: <span className="text-[var(--color-text-primary)]">{profile.facts.population}</span></div>
                <div>Capital: <span className="text-[var(--color-text-primary)]">{profile.facts.capital}</span></div>
                <div>Area: <span className="text-[var(--color-text-primary)]">{profile.facts.area}</span></div>
                <div>Languages: <span className="text-[var(--color-text-primary)]">{profile.facts.languages}</span></div>
                <div>Chief Minister: <span className="text-[var(--color-text-primary)]">{profile.facts.cm}</span></div>
                <div>Literacy: <span className="text-[var(--color-text-primary)]">{profile.facts.literacy}</span></div>
              </div>
            </div>

            {/* Economic Indicators */}
            <div>
              <h3 className="text-xs font-[var(--font-orbitron)] text-[var(--color-accent-green)] mb-3 border-b border-[var(--color-border-subtle)] pb-1 flex items-center">
                ECONOMIC INDICATORS <InfoIcon id="eco" text={profile.sources.economy} />
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[var(--color-border-subtle)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-share-tech)]">State GDP (Nominal)</div>
                  <div className="text-lg font-[var(--font-orbitron)] text-[var(--color-accent-green)]">{profile.facts.gdp}</div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
