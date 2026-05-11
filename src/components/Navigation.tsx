import React from 'react';
import { Home, Search, Pill, MapPin, Zap, User, Trophy, FileBarChart } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'symptoms', label: 'Check', icon: Search },
    { id: 'meds', label: 'Meds', icon: Pill },
    { id: 'map', label: 'Clinics', icon: MapPin },
    { id: 'ar', label: 'Scan', icon: Zap },
    { id: 'avatar', label: 'Twin', icon: User },
    { id: 'game', label: 'Journey', icon: Trophy },
    { id: 'report', label: 'Report', icon: FileBarChart },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md items-center justify-between px-8 py-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-100">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">Medicure⚕️</span>
        </div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[60%]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
            Emergency
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-slate-100 flex justify-around py-3 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? 'text-cyan-600 scale-110' : 'text-slate-400'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'fill-cyan-50' : ''}`} />
            <span className="text-[8px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};