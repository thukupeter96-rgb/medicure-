import React, { useState } from 'react';
import { HOSPITALS, Hospital } from '../data/mockData';
import { MapPin, Navigation as NavIcon, Star, Search, Filter, Phone, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HospitalFinder: React.FC = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Emergency', 'Cardiology', 'Neurology', 'Dental'];

  const filteredHospitals = HOSPITALS.filter(h => 
    filter === 'All' || h.specialty.some(s => s === filter)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] overflow-hidden">
      <div className="p-4 bg-white border-b space-y-4 z-10 shrink-0">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search health facilities..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <Filter className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-cyan-600 text-white shadow-lg' 
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        {/* SVG Optimized Map */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden min-h-[300px]">
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 800 600">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M0,100 L800,100 M200,0 L200,600 M500,0 L500,600 M0,400 L800,400" stroke="white" strokeWidth="4" fill="none" />
          </svg>
          
          <div className="absolute inset-0">
            {filteredHospitals.map((h) => (
              <motion.button
                key={h.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setSelectedHospital(h)}
                className="absolute"
                style={{ top: `${(h.lat - 40.71) * 3000 + 30}%`, left: `${(h.lng + 74.02) * 1500 + 40}%` }}
              >
                <div className={`relative flex flex-col items-center group ${selectedHospital?.id === h.id ? 'scale-125 z-20' : 'z-10'}`}>
                  <div className={`p-2.5 rounded-full shadow-lg transition-all ${selectedHospital?.id === h.id ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-600 group-hover:bg-cyan-50'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>
            ))}
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 p-4 bg-white/90 backdrop-blur shadow-2xl rounded-3xl border border-white">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Data Map Active</p>
             </div>
            <p className="text-sm font-bold text-slate-900">Current: Nairobi Central</p>
          </div>
        </div>

        <div className="md:w-[400px] h-full overflow-y-auto bg-slate-50 border-l border-slate-200 shrink-0 p-4 space-y-4">
          <AnimatePresence mode="wait">
            {selectedHospital ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-white"
              >
                <div className="h-48 relative">
                  <img src={selectedHospital.image} alt={selectedHospital.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedHospital(null)}
                    className="absolute top-4 right-4 p-2.5 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedHospital.name}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500 mr-1" />
                        <span className="text-sm font-bold">{selectedHospital.rating}</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedHospital.distance} away</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl group transition-all hover:bg-cyan-50">
                      <Phone className="w-5 h-5 text-slate-600 group-hover:text-cyan-600 mb-2" />
                      <span className="text-[10px] font-bold text-slate-700 uppercase">Call Clinic</span>
                    </button>
                    <button className="flex flex-col items-center justify-center py-4 bg-slate-900 rounded-2xl transition-all hover:bg-slate-800">
                      <NavIcon className="w-5 h-5 text-white mb-2" />
                      <span className="text-[10px] font-bold text-white uppercase">Navigate</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Services Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHospital.specialty.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Nearby Facilities</h3>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    OPTIMIZED FOR 3G
                  </div>
                </div>
                {filteredHospitals.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedHospital(h)}
                    className="p-4 bg-white rounded-3xl border border-slate-200 flex gap-4 cursor-pointer hover:border-cyan-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img src={h.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="font-bold text-slate-900 truncate">{h.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{h.distance} • {h.specialty[0]}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="px-2 py-1 bg-cyan-50 text-cyan-700 text-[8px] font-black rounded-md uppercase">
                          {h.status === 'Open 24/7' ? 'Always Open' : 'Open'}
                        </span>
                        <div className="flex items-center text-[10px] font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500 mr-1" />
                          {h.rating}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};