<div align="center">

![STATUS | ACTIVE](https://img.shields.io/badge/STATUS-ACTIVE-5b5bff?style=for-the-badge&logo=vercel)
![VERSION | V1.0.0](https://img.shields.io/badge/VERSION-V1.0.0-8a2be2?style=for-the-badge&logo=git)
![FRAMEWORK | NEXT.JS 14](https://img.shields.io/badge/FRAMEWORK-NEXT.JS_14-20b2aa?style=for-the-badge&logo=next.js)

![STYLING | TAILWIND CSS](https://img.shields.io/badge/STYLING-TAILWIND_CSS-0288d1?style=for-the-badge&logo=tailwindcss)
![MAPS | LEAFLET](https://img.shields.io/badge/MAPS-LEAFLET-8a2be2?style=for-the-badge&logo=leaflet)
![AI ENGINE | GROQ LLAMA 3](https://img.shields.io/badge/AI_ENGINE-GROQ_LLAMA_3-d87258?style=for-the-badge&logo=meta)

![LICENSE | MIT](https://img.shields.io/badge/LICENSE-MIT-ffc107?style=for-the-badge)
![STATE MANAGEMENT | REACT QUERY](https://img.shields.io/badge/STATE_MANAGEMENT-REACT_QUERY-d32f2f?style=for-the-badge&logo=react)
![OSINT | ACTIVE](https://img.shields.io/badge/OSINT-ACTIVE-00bcd4?style=for-the-badge&logo=radar)

</div>

# IND Atlas by WEBDEVPRAVEEN

**IND Atlas** is an advanced Open Source Intelligence (OSINT) and situational awareness dashboard engineered specifically for real-time monitoring of Indian topography, media streams, and infrastructure. Developed by **Praveen K Singh (webdevpraveen)**, this platform aggregates massive amounts of high-latency visual data, textual intelligence, and atmospheric conditions into a single, cohesive, non-scrolling tactical command center (HUD).

---

## Comprehensive Feature Set

### 1. Geospatial Tactical Map (Interactive Node Tracking)
* **Engine:** Powered by `React-Leaflet` mapped over custom dark-themed CartoCDN tiles to reduce eye strain and maintain the HUD aesthetic.
* **Topography:** Dynamically parses and renders complex GeoJSON boundary data covering all Indian States and Districts.
* **Live Nodes:** Features real-time pulsing telemetry markers mapped to the precise GPS coordinates of active surveillance and media streams.

### 2. Unrestricted Visual Telemetry (Camera Matrix)
* **Massive Array:** Monitors over 25+ critical feeds simultaneously. Categories include National News HQs (New Delhi), Regional News (Maharashtra, UP), high-traffic transit junctions, and major temple complexes (Kashi Vishwanath, ISKCON).
* **The "Unbreakable" Bypass Proxy:** YouTube actively blocks third-party embedding for 24/7 channel streams. To circumvent this, IND Atlas utilizes a custom-built Next.js serverless proxy (`/api/yt-live`). 
  * The API intercepts requests and performs a stealth headless search against YouTube.
  * It dynamically extracts the canonical `videoId` of the current live broadcast.
  * It executes a `307 Temporary Redirect` straight to the unrestricted embed endpoint, ensuring feeds never display "Video Unavailable".
* **HUD Wrappers:** Every camera card is encased in a custom CSS wrapper featuring CRT scanlines, active `REC` blinkers, timestamp telemetry, and lat/lon coordinates.

### 3. AI-Powered Intelligence Aggregator
* **Data Ingestion:** Utilizes `@tanstack/react-query` to continuously poll and sanitize RSS feeds from major Indian news outlets (NDTV, Times of India, Indian Express) via a custom `/api/rss` proxy.
* **Analysis Engine:** Pipelined through the **Groq API** utilizing the blazing-fast **Llama-3-8b-8192** model.
* **Automated Briefings:** The AI processes raw text to generate structured intelligence briefs, Threat Matrices, Resilience Scores, and sector-specific Situation Reports.
* **Privacy-First BYOK:** Implements "Bring Your Own Key" architecture. API keys are stored strictly in the client's `localStorage` and are never transmitted to backend databases.

### 4. Atmospheric & Meteorological Analytics
* **Micro-Level Data:** A 24/7 scrolling ticker at the top of the interface pulls live temperature, wind speed, and Air Quality Index (AQI) data across 10 prominent Indian cities via the Open-Meteo and WAQI APIs.
* **Macro-Level Data:** Integrates an interactive satellite mapping modal powered by Windy / Zoom Earth for real-time cloud cover and weather pattern tracking.

---

## System Architecture

The application is built on the **Next.js 14 App Router** foundation. It leverages React 18's concurrent rendering capabilities to ensure that heavy DOM elements (like 25+ iframes) do not block the main thread.

### Tech Stack Breakdown
* **Core Framework:** Next.js 14 (App Router)
* **UI Library:** React 18
* **Styling:** Tailwind CSS, custom raw CSS variables for glow/CRT effects.
* **Data Fetching:** TanStack React Query (v5), native `fetch`.
* **Mapping:** `react-leaflet`, `leaflet`, `geojson`.
* **AI SDK:** `@groq/groq-sdk`
* **Icons:** `lucide-react`

---

## Directory Structure

```text
ind-atlas/
├── app/
│   ├── api/
│   │   ├── proxy-cam/       # Bypasses CORS for static traffic cam images
│   │   ├── rss/             # Parses XML news feeds to JSON
│   │   └── yt-live/         # The custom YouTube scraper & bypass engine
│   ├── globals.css          # Core tactical theming, scanlines, and CRT effects
│   ├── layout.tsx           # Main application shell
│   └── page.tsx             # The primary non-scrolling dashboard grid
├── components/
│   ├── CameraCard.tsx       # Individual HUD-styled video feed component
│   ├── MapPanel.tsx         # Leaflet map wrapper and GeoJSON handler
│   ├── NewsPanel.tsx        # RSS feed display with source filtering
│   ├── StateProfile.tsx     # Groq AI Intelligence analyzer panel
│   ├── WeatherMapModal.tsx  # Zoom Earth satellite overlay
│   └── WeatherTicker.tsx    # Live meteorological data ticker
├── lib/
│   ├── cameras.ts           # Registry of all 25+ live nodes and search queries
│   ├── news.ts              # RSS endpoint configurations
│   ├── stateData.ts         # Static statistical fallbacks for Indian states
│   └── weather.ts           # Open-Meteo API utility functions
├── public/
│   ├── india_states.geojson # State-level topological data
│   └── india_district.geojson # District-level topological data
└── tailwind.config.ts       # Custom color palettes and spacing
```

---

## Local Installation & Setup

### Prerequisites
* Node.js (v18.x or higher)
* NPM, Yarn, or pnpm
* Git



## Configuring the AI (Groq Setup)

To enable the automated Intelligence Briefings and Threat Matrix generation:
1. Obtain a free API key from [Groq Console](https://console.groq.com).
2. Open the IND Atlas application in your browser.
3. Click the **Settings Gear ⚙️** icon in the top right corner of the interface.
4. Input your Groq API key into the secure modal. 
5. *(Note: This key is saved securely in your browser's local storage and is never sent to our servers).*
6. The AI engine will immediately spin up and begin analyzing the incoming news streams.

---

## UI/UX & Theming Notes

The dashboard is strictly bounded to `100vh` and `100vw`. **There are no scrollbars on the main window.** This forces the application to behave like a true physical monitor panel. 
* Backgrounds utilize `var(--color-bg-primary)` (`#080810`), eliminating all pure whites to reduce glare.
* Green accents (`#00ff88`) with CSS `drop-shadow` are used to simulate phosphor glow.
* Iframes are passed through `saturate-50 contrast-125` CSS filters to blend modern HD video into the gritty, tactical aesthetic.

---

## License

This project is open-source and distributed under the MIT License. See the `LICENSE` file for more information.

*Built for situational awareness, data aggregation, and rapid intelligence parsing by [Praveenksingh (WEBDEVPRAVEEN)](https://github.com/webdevpraveen).*
