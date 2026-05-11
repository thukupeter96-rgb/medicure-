import React, { useState, useEffect } from 'react';
import { SYMPTOMS, Symptom } from '../data/mockData';
import { Search, X, ChevronRight, Activity, AlertCircle, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const SymptomChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<{ symptom: Symptom; intensity: number }[]>([]);
  const [suggestions, setSuggestions] = useState<Symptom[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = SYMPTOMS.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) &&
        !selectedSymptoms.find(selected => selected.symptom.id === s.id)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, selectedSymptoms]);

  const addSymptom = (symptom: Symptom, intensity: number = 2) => {
    setSelectedSymptoms([...selectedSymptoms, { symptom, intensity }]);
    setQuery('');
    setSuggestions([]);
    toast.success(`Logged ${symptom.name} with intensity ${intensity}`);
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.symptom.id !== id));
  };

  const updateIntensity = (id: string, intensity: number) => {
    setSelectedSymptoms(selectedSymptoms.map(s => 
      s.symptom.id === id ? { ...s, intensity } : s
    ));
  };

  const bodyParts = [
    { id: 'head', path: 'M12,2 C10,2 8,4 8,8 C8,11 10,13 12,13 C14,13 16,11 16,8 C16,4 14,2 12,2 Z', label: 'Head' },
    { id: 'chest', path: 'M8,14 L16,14 L17,22 L7,22 Z', label: 'Chest' },
    { id: 'stomach', path: 'M9,23 L15,23 L15,28 L9,28 Z', label: 'Stomach' },
    { id: 'limbs', path: 'M6,15 L7,25 M17,15 L18,25 M10,29 L10,40 M14,29 L14,40', label: 'Limbs' },
  ];

  const getHeatColor = (intensity: number) => {
    if (intensity >= 4) return 'fill-red-500';
    if (intensity >= 3) return 'fill-orange-400';
    return 'fill-yellow-300';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      {isOffline && (
        <div className="flex items-center gap-2 p-3 bg-slate-900 text-white rounded-xl text-xs font-bold animate-pulse">
          <WifiOff className="w-4 h-4 text-cyan-400" />
          OFFLINE MODE ENABLED - LOCAL DATABASE ACTIVE
        </div>
      )}

      <header className="space-y-2 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-cyan-100 rounded-full mb-2">
          <Activity className="w-6 h-6 text-cyan-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Anatomical Symptom Logger</h1>
        <p className="text-muted-foreground">Tap the model or search to log symptoms</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Anatomical Model */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Interactive Heatmap</h3>
          <div className="relative w-full max-w-[200px] aspect-[1/2]">
            <svg viewBox="0 0 24 45" className="w-full h-full">
              {/* Human Outline */}
              <path d="M12,1 C10,1 8,3 8,6 C8,9 10,10 12,10 C14,10 16,9 16,6 C16,3 14,1 12,1 Z M12,11 C9,11 6,13 6,17 L6,25 C6,27 8,28 10,28 L14,28 C16,28 18,27 18,25 L18,17 C18,13 15,11 12,11 Z M10,29 L8,42 C8,43 9,44 10,44 L11,44 L11,35 L13,35 L13,44 L14,44 C15,44 16,43 16,42 L14,29 Z M5,18 L3,27 C3,28 4,29 5,29 L6,29 L6,18 Z M19,18 L21,27 C21,28 20,29 19,29 L18,29 L18,18 Z" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
              
              {/* Tapable Parts */}
              {bodyParts.map((part) => {
                const activeSymptom = selectedSymptoms.find(s => s.symptom.bodyPart === part.id);
                return (
                  <motion.path
                    key={part.id}
                    d={part.path}
                    className={`cursor-pointer transition-colors ${activeSymptom ? getHeatColor(activeSymptom.intensity) : 'fill-slate-50 hover:fill-cyan-50'}`}
                    onClick={() => {
                      const symptom = SYMPTOMS.find(s => s.bodyPart === part.id);
                      if (symptom) addSymptom(symptom);
                      else toast.info(`No specific symptom data for ${part.label} yet`);
                    }}
                    whileTap={{ scale: 0.95 }}
                  />
                );
              })}
            </svg>
          </div>
          <div className="mt-8 flex gap-4 text-[10px] font-bold uppercase">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-300"></div> Dull</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-400"></div> Moderate</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> Acute</div>
          </div>
        </div>

        {/* Symptoms Selection */}
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-sm"
              placeholder="Search symptoms manually..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => addSymptom(s)}
                      className="w-full px-6 py-3 text-left hover:bg-cyan-50 flex items-center justify-between group transition-colors"
                    >
                      <span className="font-medium text-slate-700">{s.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Logged Symptoms</h3>
            <div className="space-y-3">
              <AnimatePresence mode='popLayout'>
                {selectedSymptoms.map(({ symptom, intensity }) => (
                  <motion.div
                    key={symptom.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getHeatColor(intensity)} animate-pulse`}></div>
                        <span className="font-bold text-slate-900">{symptom.name}</span>
                      </div>
                      <button onClick={() => removeSymptom(symptom.id)} className="text-slate-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Severity Intensity</span>
                        <span>Level {intensity}/5</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" max="5" 
                        value={intensity} 
                        onChange={(e) => updateIntensity(symptom.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {selectedSymptoms.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                  <Activity className="w-10 h-10 mb-2 opacity-20" />
                  <p className="text-sm font-medium">Select symptoms on the map or search</p>
                </div>
              )}
            </div>
          </div>

          {selectedSymptoms.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
            >
              Generate Health Insight
            </motion.button>
          )}
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-bold mb-1">Medical Disclaimer</p>
          <p>This is a non-diagnostic preliminary tool. Always consult a healthcare professional for clinical assessment.</p>
        </div>
      </div>
    </div>
  );
};