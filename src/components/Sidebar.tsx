import { Cloud, Map, Settings, Wind } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "current", icon: <Wind size={26} />, label: "Current" },
    { id: "forecast", icon: <Cloud size={24} />, label: "Forecast" },
    { id: "map", icon: <Map size={24} />, label: "Map" },
    { id: "settings", icon: <Settings size={24} />, label: "Settings" },
  ];

  return (
    <div className="w-20 md:w-24 bg-[#0e1425]/90 flex flex-col items-center py-6 space-y-10 rounded-r-3xl shadow-lg backdrop-blur-md border-r border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`transition-all duration-300 ${
            activeTab === tab.id
              ? "text-blue-400 scale-110"
              : "text-gray-400 hover:text-blue-300 hover:scale-105"
          }`}
          title={tab.label}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
