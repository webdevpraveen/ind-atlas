"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AiContextType {
  groqApiKey: string;
  setGroqApiKey: (key: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const AiContext = createContext<AiContextType | undefined>(undefined);

export function AiProvider({ children }: { children: React.ReactNode }) {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("groqApiKey");
    if (stored) {
      setGroqApiKey(stored);
    }
    setMounted(true);
  }, []);

  const handleSetGroqApiKey = (key: string) => {
    setGroqApiKey(key);
    localStorage.setItem("groqApiKey", key);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <AiContext.Provider value={{ groqApiKey, setGroqApiKey: handleSetGroqApiKey, isSettingsOpen, setIsSettingsOpen }}>
      {children}
    </AiContext.Provider>
  );
}

export function useAi() {
  const context = useContext(AiContext);
  if (context === undefined) {
    throw new Error("useAi must be used within an AiProvider");
  }
  return context;
}
