import React from "react";

interface SettingsPanelProps {
  unit: "C" | "F";
  setUnit: (value: "C" | "F") => void;
  theme: string;
  setTheme: (value: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  unit,
  setUnit,
  theme,
  setTheme,
}) => {
  return (
    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">⚙️ Settings</h2>

      <div className="space-y-6">
        {/* Temperature Unit */}
        <div className="flex items-center justify-between">
          <span className="text-white/80 font-medium">Temperature Unit</span>
          <button
            onClick={() => setUnit("C")}
            className={`px-4 py-2 rounded-lg ${
              unit === "C" ? "bg-blue-500" : "bg-white/10"
            } transition`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit("F")}
            className={`px-4 py-2 rounded-lg ${
              unit === "F" ? "bg-blue-500" : "bg-white/10"
            } transition`}
          >
            °F
          </button>
        </div>


      </div>

      <button
        onClick={() =>
          alert(`✅ Settings updated:\nUnit: ${unit}\nTheme: ${theme}`)
        }
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-xl hover:opacity-90 transition-all"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPanel;

