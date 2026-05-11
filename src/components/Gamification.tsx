import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Map, Flower2, Heart, Shield, Zap, ChevronRight, Users } from 'lucide-react';

export const Gamification: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'monster' | 'map' | 'garden'>('monster');

  const monsterActive = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/condition-monster-active-8ec75a8e-1778536372378.webp';
  const monsterCalm = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/condition-monster-calm-cfe35ca1-1778536389441.webp';
  const gardenLush = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/health-garden-lush-f40c3d79-1778536374456.webp';
  const gardenSprout = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/health-garden-sprout-2c1b73d8-1778536388210.webp';

  const [isCalm, setIsCalm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Health Journey</h1>
          <p className="text-sm font-medium text-slate-500">Turning maintenance into a visual adventure</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {[ 
            { id: 'monster', icon: Shield, label: 'Monster' },
            { id: 'map', icon: Map, label: 'Adventure' },
            { id: 'garden', icon: Flower2, label: 'Garden' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeMode === mode.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <mode.icon className="w-4 h-4" />
              {mode.label}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeMode === 'monster' && (
          <motion.div
            key="monster"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-[48px] p-8 border border-slate-200 shadow-xl overflow-hidden relative">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                     <div className="inline-flex px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-black uppercase tracking-widest">
                        Chronic Companion: Hyppy
                     </div>
                     <h2 className="text-4xl font-black text-slate-900 leading-tight">
                       {isCalm ? 'Hyppy is Sleeping Soundly' : 'Hyppy is Feeling Mischievous'}
                     </h2>
                     <p className="text-slate-500 font-medium leading-relaxed">
                       Manage your hypertension by logging your blood pressure and meds. Every healthy habit calms Hyppy down.
                     </p>
                     <div className="flex gap-4">
                        <button 
                          onClick={() => setIsCalm(!isCalm)}
                          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all"
                        >
                          Log Evening Meds
                        </button>
                     </div>
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <img src={isCalm ? monsterCalm : monsterActive} alt="Monster" className="w-full h-auto max-w-[300px] mx-auto" />
                    </motion.div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-4 bg-slate-900/5 blur-xl rounded-full"></div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[ 
                 { label: 'Condition', val: 'Hypertension', color: 'bg-cyan-500' },
                 { label: 'Today\'s Goal', val: 'Log 2 Meals', color: 'bg-amber-500' },
                 { label: 'Streak', val: '12 Days', color: 'bg-emerald-500' },
                 { label: 'XP', val: '2,450', color: 'bg-indigo-500' }
               ].map((stat) => (
                 <div key={stat.label} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-sm font-black text-slate-900">{stat.val}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {activeMode === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden h-[400px]">
               {/* Abstract Adventure Map */}
               <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
                  <path d="M50,350 Q200,50 400,200 T750,50" fill="none" stroke="white" strokeWidth="4" strokeDasharray="10 10" />
                  <circle cx="50" cy="350" r="10" fill="white" />
                  <circle cx="750" cy="50" r="10" fill="white" />
               </svg>

               <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-2xl font-black">Mount Kenya Trek</h3>
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Community Challenge</p>
                     </div>
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[8px] font-bold">
                             U{i}
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-cyan-600 flex items-center justify-center text-[10px] font-bold">
                           +12
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase">
                           <span>Team Progress: Lenana Point</span>
                           <span>68% Complete</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-500 w-[68%]"></div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                           <p className="text-[8px] font-black text-slate-400 uppercase">Your Steps</p>
                           <p className="text-xl font-black">8,432 <span className="text-xs font-normal text-slate-500">/ 10k</span></p>
                        </div>
                        <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest">
                           Join Trek
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex items-center gap-4">
               <Users className="w-6 h-6 text-slate-400" />
               <p className="text-sm font-medium text-slate-600">Collaborate with family and neighbors to unlock community health rewards.</p>
            </div>
          </motion.div>
        )}

        {activeMode === 'garden' && (
          <motion.div
            key="garden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
             <div className="bg-white rounded-[48px] border border-slate-200 shadow-xl overflow-hidden">
                <img src={gardenLush} alt="Garden" className="w-full h-[300px] object-cover" />
                <div className="p-8 space-y-4">
                   <div className="flex justify-between items-center">
                      <div>
                         <h3 className="text-2xl font-black text-slate-900">My Health Ecosystem</h3>
                         <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Active Growth: Day 14</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Flower2 className="w-6 h-6" />
                         </div>
                      </div>
                   </div>
                   <p className="text-slate-500 font-medium leading-relaxed">
                      Each healthy habit adds a new element to your garden. Missed habits won't kill your plants, but new growth requires consistency.
                   </p>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {[ 
                        { label: 'Aloe Vera', type: 'Hydration', status: 'Grown' },
                        { label: 'Lavender', type: 'Sleep', status: 'Sprouting' },
                        { label: 'Baobab', type: 'Nutrition', status: 'Stable' }
                      ].map((plant) => (
                        <div key={plant.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                           <div>
                              <p className="text-[10px] font-black text-slate-900">{plant.label}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase">{plant.type}</p>
                           </div>
                           <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black rounded uppercase">
                              {plant.status}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};