"use client";

import { useAi } from "@/lib/AiContext";
import { useState } from "react";

export default function SettingsModal() {
  const { groqApiKey, setGroqApiKey, isSettingsOpen, setIsSettingsOpen } = useAi();
  const [tempKey, setTempKey] = useState(groqApiKey);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setGroqApiKey(tempKey);
    setIsSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-active)] rounded-lg p-6 max-w-md w-full shadow-[0_0_30px_rgba(0,255,136,0.1)]">
        <div className="flex justify-between items-center mb-4 border-b border-[var(--color-border-subtle)] pb-2">
          <h2 className="text-lg font-[var(--font-orbitron)] text-[var(--color-accent-green)]">⚙️ AI CONFIGURATION</h2>
          <button onClick={() => setIsSettingsOpen(false)} className="text-[var(--color-text-muted)] hover:text-white">✕</button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-[var(--font-share-tech)] text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">
            Groq API Key
          </label>
          <input 
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="gsk_..."
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] focus:border-[var(--color-accent-green)] text-white font-mono text-sm p-2 rounded outline-none"
          />
        </div>

        <div className="bg-[rgba(0,180,255,0.05)] border border-dashed border-[var(--color-accent-blue)] rounded p-3 mb-6">
          <h3 className="text-xs font-[var(--font-orbitron)] text-[var(--color-accent-blue)] mb-1">How to get a key:</h3>
          <ol className="list-decimal pl-4 text-xs font-[var(--font-inter)] text-gray-400 space-y-1">
            <li>Go to <a href="https://console.groq.com/keys" target="_blank" className="text-[var(--color-accent-blue)] underline">console.groq.com</a></li>
            <li>Sign in or create a free account</li>
            <li>Click "Create API Key" and paste it above</li>
          </ol>
        </div>

        <div className="bg-[rgba(255,0,0,0.05)] border border-[rgba(255,0,0,0.2)] rounded p-3 mb-6 flex items-start gap-2">
          <span className="text-xl">🔒</span>
          <p className="text-[10px] font-[var(--font-inter)] text-gray-400 leading-tight">
            <strong>PRIVACY NOTICE:</strong> Your API key is stored locally in your browser's <code className="bg-black px-1 rounded">localStorage</code>. It is strictly sent only to Groq's official API to generate intelligence briefs. We do not store or collect your key on any server.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-xs font-[var(--font-share-tech)] text-gray-400 hover:text-white transition-colors">
            CANCEL
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-xs font-[var(--font-orbitron)] bg-[var(--color-accent-green-dim)] text-[var(--color-accent-green)] border border-[var(--color-accent-green)] rounded hover:bg-[var(--color-accent-green)] hover:text-black transition-colors">
            SAVE CONFIG
          </button>
        </div>
      </div>
    </div>
  );
}
