import React, { useState, useRef } from 'react';
import { Camera, RefreshCcw, Info, Zap, Loader2, Sparkles } from 'lucide-react';
import { KENYAN_FOODS, FoodItem } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const NutritionScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<FoodItem | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startScan = () => {
    setCameraActive(true);
    setIsScanning(true);
    setDetectedFood(null);
    
    // Simulate AR processing
    setTimeout(() => {
      setIsScanning(false);
      const randomFood = KENYAN_FOODS[Math.floor(Math.random() * KENYAN_FOODS.length)];
      setDetectedFood(randomFood);
      toast.success(`Recognized ${randomFood.name}!`, {
        description: 'Culturally adapted food database synced.'
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-lg">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">AR Meal Scanner</h1>
            <p className="text-sm font-medium text-slate-500">Real-time nutritional overlay for local staples</p>
          </div>
        </div>
      </header>

      <div className="relative aspect-[4/5] md:aspect-video rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl border-4 border-white">
        {/* Simulated Camera Feed */}
        <div className="absolute inset-0">
          {!cameraActive ? (
             <div className="w-full h-full flex flex-col items-center justify-center space-y-6 text-white bg-slate-800">
                <Camera className="w-16 h-16 opacity-20" />
                <button 
                  onClick={startScan}
                  className="px-8 py-4 bg-cyan-600 text-white rounded-3xl font-bold shadow-xl hover:bg-cyan-700 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Live Scan
                </button>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Camera Access Required</p>
             </div>
          ) : (
            <div className="w-full h-full relative">
               {/* Mock background gradient simulating a kitchen/plate */}
               <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
               
               {/* AR HUD */}
               <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-black uppercase tracking-widest">AR Engine Active</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setCameraActive(false)}
                      className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scanning Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-4 text-white"
                       >
                         <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                               <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 10" className="animate-[spin_8s_linear_infinite]" />
                               <circle cx="50" cy="50" r="35" fill="none" stroke="cyan" strokeWidth="2" strokeDasharray="5 15" className="animate-[spin_4s_linear_infinite]" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                               <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
                            </div>
                         </div>
                         <p className="text-sm font-black uppercase tracking-widest animate-pulse">Analyzing Composition...</p>
                       </motion.div>
                    </div>
                  )}

                  {/* Detected Result Overlay */}
                  <AnimatePresence>
                    {detectedFood && !isScanning && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-2xl"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900">{detectedFood.name}</h3>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{detectedFood.description}</p>
                          </div>
                          <div className="px-3 py-1 bg-cyan-600 text-white text-[10px] font-black rounded-lg uppercase">
                            98% Match
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <div className="flex flex-col items-center p-3 bg-slate-900 text-white rounded-2xl shadow-lg">
                            <span className="text-[8px] font-black uppercase mb-1 opacity-60">Cals</span>
                            <span className="text-sm font-black">{detectedFood.calories}</span>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-emerald-500 text-white rounded-2xl shadow-lg">
                            <span className="text-[8px] font-black uppercase mb-1 opacity-60">Prot</span>
                            <span className="text-sm font-black">{detectedFood.protein}</span>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-amber-500 text-white rounded-2xl shadow-lg">
                            <span className="text-[8px] font-black uppercase mb-1 opacity-60">Carb</span>
                            <span className="text-sm font-black">{detectedFood.carbs}</span>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-rose-500 text-white rounded-2xl shadow-lg">
                            <span className="text-[8px] font-black uppercase mb-1 opacity-60">Fat</span>
                            <span className="text-sm font-black">{detectedFood.fats}</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={startScan}
                          className="w-full mt-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <RefreshCcw className="w-4 h-4" />
                          Re-Scan
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
           <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Info className="w-6 h-6 text-slate-400" />
           </div>
           <div>
              <h4 className="font-bold text-slate-900">Cultural Adaptation</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our AI is trained on East African regional staples including Ugali, Sukuma Wiki, and Githeri to ensure accurate local nutritional logging.
              </p>
           </div>
        </div>
        <div className="p-6 bg-cyan-600 text-white rounded-3xl space-y-4 shadow-lg shadow-cyan-100">
           <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
           </div>
           <div>
              <h4 className="font-bold">Smart Logging</h4>
              <p className="text-sm text-cyan-50 leading-relaxed">
                Recognized meals are automatically added to your daily nutrition log and synced with your Digital Twin for visual transformation.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};