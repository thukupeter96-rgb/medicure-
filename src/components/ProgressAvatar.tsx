import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Moon, Zap, Activity, Info } from 'lucide-react';

export const ProgressAvatar: React.FC = () => {
  // Mock health data
  const healthStats = {
    hydration: 85,
    sleep: 92,
    activity: 45,
    status: 'vibrant' // vibrant | slugish
  };

  const avatarUrl = healthStats.status === 'vibrant' 
    ? 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/avatar-vibrant-2856fbd6-1778536372618.webp'
    : 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/avatar-sluggish-950d883d-1778536373047.webp';

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Your Digital Twin</h1>
        <p className="text-sm font-medium text-slate-500">Visually transforming based on your health habits</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square max-w-[400px] mx-auto">
           <motion.div
            key={healthStats.status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full rounded-[60px] overflow-hidden bg-slate-100 border-8 border-white shadow-2xl relative"
           >
             <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg ${healthStats.status === 'vibrant' ? 'bg-cyan-600 text-white' : 'bg-slate-600 text-white'}`}>
                   Twin Status: {healthStats.status}
                </div>
             </div>
           </motion.div>
           
           {/* Floating HUD Elements */}
           <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-4 p-4 bg-white shadow-xl rounded-3xl border border-slate-100"
           >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase">Energy Level</p>
                  <p className="text-sm font-black text-slate-900">High</p>
                </div>
              </div>
           </motion.div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Real-time Influence</h3>
          <div className="grid gap-4">
             {[ 
               { label: 'Hydration', value: healthStats.hydration, icon: Droplets, color: 'bg-cyan-500', unit: '%' },
               { label: 'Sleep Quality', value: healthStats.sleep, icon: Moon, color: 'bg-indigo-500', unit: '%' },
               { label: 'Active Minutes', value: healthStats.activity, icon: Activity, color: 'bg-emerald-500', unit: 'min' }
             ].map((stat) => (
               <div key={stat.label} className="p-5 bg-white border border-slate-200 rounded-[32px] space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-2xl ${stat.color}/10 flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                       </div>
                       <span className="font-bold text-slate-900">{stat.label}</span>
                    </div>
                    <span className="text-lg font-black text-slate-900">{stat.value}<span className="text-xs font-normal text-slate-400 ml-0.5">{stat.unit}</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
               </div>
             ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Your Digital Twin transforms daily. Better sleep and hydration will brighten the avatar and add vibrant particle effects to your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};