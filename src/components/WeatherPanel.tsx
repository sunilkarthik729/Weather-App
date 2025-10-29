import React from "react";

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

interface WeatherPanelProps {
  city: string;
  weather: WeatherData | null;
  loading: boolean;
  setCity: (city: string) => void;
  convertTemp: (temp: number) => number;
  unit: "C" | "F";
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({
  city,
  weather,
  loading,
  setCity,
  convertTemp,
  unit,
}) => {
  if (loading)
    return (
      <div className="text-center text-lg text-blue-400">Loading...</div>
    );

  if (!weather)
    return (
      <div className="text-center text-gray-400">No data available</div>
    );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("city") as HTMLInputElement).value.trim();
    if (input) setCity(input);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-lg flex-1">
      <form onSubmit={handleSearch} className="flex justify-between items-center mb-4">
        <input
          type="text"
          name="city"
          placeholder="Enter city..."
          className="bg-transparent border-b border-white/30 focus:outline-none text-white placeholder-gray-400 flex-1"
        />
        <button
          type="submit"
          className="ml-3 bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-sm font-medium"
        >
          Search
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">{city}</h2>
      <p className="text-5xl font-bold mb-4">
        {convertTemp(weather.current_weather.temperature).toFixed(1)}°{unit}
      </p>
      <p className="text-sm text-gray-300">
        Wind Speed: {weather.current_weather.windspeed} km/h
      </p>
    </div>
  );
};

export default WeatherPanel;
