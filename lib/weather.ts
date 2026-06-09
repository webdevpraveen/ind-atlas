export type WeatherData = {
  city: string;
  temp: number;
  humidity: number;
  wind: number;
  code: number;
};

const UP_CITIES = [
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Prayagraj", lat: 25.4358, lng: 81.8463 },
  { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
];

export async function fetchWeather(): Promise<WeatherData[]> {
  try {
    const promises = UP_CITIES.map(async (city) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia/Kolkata`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      );
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      return {
        city: city.name,
        temp: Math.round(data.current.temperature_2m),
        humidity: Math.round(data.current.relative_humidity_2m),
        wind: Math.round(data.current.wind_speed_10m),
        code: data.current.weather_code,
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    // Fallback data
    return UP_CITIES.map((c, i) => ({
      city: c.name,
      temp: 35 + i,
      humidity: 50 + i * 2,
      wind: 10 + i,
      code: 0,
    }));
  }
}
