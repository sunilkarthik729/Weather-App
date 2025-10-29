import React from "react";

interface MapPanelProps {
  city: string;
  coords: { lat: number; lon: number };
}

const MapPanel: React.FC<MapPanelProps> = ({ city, coords }) => {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    coords.lon - 0.1
  }%2C${coords.lat - 0.1}%2C${coords.lon + 0.1}%2C${coords.lat + 0.1}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`;

  return (
    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        🗺️ Map - <span className="text-blue-400">{city}</span>
      </h2>
      <iframe
        title={city}
        width="100%"
        height="400"
        className="rounded-2xl border-none"
        src={mapSrc}
      ></iframe>
    </div>
  );
};

export default MapPanel;
