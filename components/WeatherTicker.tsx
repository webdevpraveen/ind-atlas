"use client";

import { useEffect, useState } from "react";
import { INDIA_CITIES } from "@/lib/cities";

export default function WeatherTicker() {
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    // just fetching for the top 10 cities so we don't blow up our free API tier lol
    const prominentCities = INDIA_CITIES.slice(0, 10);
    
    Promise.all(prominentCities.map(async (city) => {
      try {
        const [weatherRes, aqiRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia/Kolkata`),
          fetch(`https://api.waqi.info/feed/${city.name}/?token=demo`)
        ]);

        const weather = await weatherRes.json();
        const aqiData = await aqiRes.json();

        const AQI_FALLBACK: Record<string, number> = {
          Delhi: 178, Mumbai: 89, Bengaluru: 67, Chennai: 112,
          Kolkata: 145, Hyderabad: 98, Lucknow: 156, Amritsar: 134,
          Jaipur: 201, Goa: 45
        };

        return {
          city: city.name,
          temp: Math.round(weather.current.temperature_2m),
          aqi: aqiData.status === 'ok' ? aqiData.data.aqi : (AQI_FALLBACK[city.name] || 100),
          wind: Math.round(weather.current.wind_speed_10m)
        };
      } catch (e) {
        return { city: city.name, temp: 30, aqi: 100, wind: 10 };
      }
    })).then(setWeatherData);
  }, []);

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "text-[var(--color-accent-green)]";
    if (aqi <= 100) return "text-[var(--color-accent-yellow)]";
    if (aqi <= 200) return "text-[var(--color-accent-orange)]";
    return "text-[var(--color-accent-red)]";
  };

  if (weatherData.length === 0) {
    return <div className="h-8 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] flex items-center px-4 text-xs text-[var(--color-text-muted)] font-[var(--font-share-tech)] flex-shrink-0 z-40 relative">Loading weather data...</div>;
  }

  return (
    <div className="h-8 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] flex items-center overflow-hidden whitespace-nowrap flex-shrink-0 z-40 relative">
      <div className="flex gap-12 text-xs font-[var(--font-share-tech)] ticker-track">
        {[...weatherData, ...weatherData, ...weatherData].map((data, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[var(--color-text-primary)]">🌡️ {data.city} {data.temp}°C</span>
            <span className="text-[var(--color-text-muted)]">|</span>
            <span className={`${getAqiColor(data.aqi)}`}>AQI {data.aqi}</span>
            <span className="text-[var(--color-text-muted)]">|</span>
            <span className="text-[var(--color-accent-blue)]">💨 {data.wind} km/h</span>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .ticker-track {
          display: flex;
          animation: tickerScroll 40s linear infinite;
          width: max-content;
        }
      `}} />
    </div>
  );
}
