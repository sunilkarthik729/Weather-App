import React from "react";

interface Props {
  weather: any;
  loading: boolean;
  convertTemp: (temp: number) => number;
  unit: string;
}

const codeToEmoji = (code: number) => {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 86) return "❄️";
  if (code <= 99) return "⛈️";
  return "☁️";
};

const ForecastPanel: React.FC<Props> = ({ weather, loading, convertTemp, unit }) => {
  const daily = weather?.daily;

  if (loading) {
    return (
      <div className="w-full lg:w-1/3 rounded-3xl p-6 bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20">
        <p className="text-gray-300 animate-pulse">Loading 7-day forecast...</p>
      </div>
    );
  }

  if (!daily) return null;

  return (
    <div className="w-full lg:w-1/3 rounded-3xl p-6 bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 transition-all hover:bg-white/20 hover:scale-[1.01] duration-300">
      <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
      <div className="space-y-3">
        {daily.time.map((day: string, i: number) => (
          <div
            key={day}
            className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{codeToEmoji(daily.weathercode[i])}</span>
              <span className="text-gray-200">
                {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {Math.round(convertTemp(daily.temperature_2m_max[i]))}° /
                {Math.round(convertTemp(daily.temperature_2m_min[i]))}°
                {unit === "Celsius" ? "C" : "F"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastPanel;
