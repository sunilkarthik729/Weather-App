import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import WeatherPanel from "./components/WeatherPanel";
import ForecastPanel from "./components/ForecastPanel";
import MapPanel from "./components/MapPanel";
import SettingsPanel from "./components/SettingsPanel";


interface GeoResponse {
  results: {
    name: string;
    latitude: number;
    longitude: number;
  }[];
}

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

const App: React.FC = () => {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [theme, setTheme] = useState("dark");
  
 

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData: GeoResponse = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name } = geoData.results[0];
      setCoords({ lat: latitude, lon: longitude });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData: WeatherData = await weatherRes.json();

      setCity(name);
      setWeather(weatherData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Conversion helper
const convertTemp = (temp: number) => {
  return unit === "C" ? temp : (temp * 9) / 5 + 32;
};


  return (
    <div
      className={`relative min-h-screen flex transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0f1e] via-[#12172a] to-[#0b1220] text-white"
          : "bg-gradient-to-br from-[#dce9ff] via-[#bcd3ff] to-[#9bb8ff] text-gray-900"
      } overflow-hidden`}
    >
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent_70%)] animate-cloudMove"></div>
        <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.25),transparent_70%)] animate-cloudMove2"></div>
        <div className="absolute w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.15),transparent_70%)] animate-cloudMove3"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white/30 rounded-full animate-floatParticle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 md:p-10 gap-6 relative z-10">
        <SearchBar onSearch={fetchWeather} />

        {error && (
          <p className="text-red-400 text-sm font-medium bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md">
            {error}
          </p>
        )}

        {/* Dynamic Panels Based on Active Tab */}
        <div className="flex flex-col lg:flex-row gap-6">
          {activeTab === "current" && (
            <WeatherPanel
              city={city}
              weather={weather}
              loading={loading}
              setCity={setCity}
              convertTemp={convertTemp}
              unit={unit}
            />
          )}
          {activeTab === "forecast" && (
            <ForecastPanel
              weather={weather}
              loading={loading}
              convertTemp={convertTemp}
              unit={unit}
            />
          )}
          {activeTab === "map" && coords && <MapPanel city={city} coords={coords} />}
          {activeTab === "settings" && (
            <SettingsPanel unit={unit} setUnit={setUnit} theme={theme} setTheme={setTheme} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
