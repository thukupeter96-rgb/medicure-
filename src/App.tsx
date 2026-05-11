import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { SymptomChecker } from './components/SymptomChecker';
import { MedicationManager } from './components/MedicationManager';
import { HospitalFinder } from './components/HospitalFinder';
import { NutritionScanner } from './components/NutritionScanner';
import { ProgressAvatar } from './components/ProgressAvatar';
import { Gamification } from './components/Gamification';
import { EmergencyCard } from './components/EmergencyCard';
import { DoctorReport } from './components/DoctorReport';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Bell, User, Zap, Trophy, FileBarChart, ArrowRight, Activity, Droplets, MapPin } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'symptoms':
        return <SymptomChecker />;
      case 'meds':
        return <MedicationManager />;
      case 'map':
        return <HospitalFinder />;
      case 'ar':
        return <NutritionScanner />;
      case 'avatar':
        return <ProgressAvatar />;
      case 'game':
        return <Gamification />;
      case 'report':
        return <DoctorReport />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 space-y-12 pb-32 md:pb-12">
            <section className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter text-slate-900">Medicure⚕️</h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your health ecosystem is thriving</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl rotate-3 overflow-hidden">
                   <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e7f14863-bd1d-4438-8f8b-f087302ff0d4/avatar-vibrant-2856fbd6-1778536372618.webp" className="w-full h-full object-cover" alt="Profile" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-cyan-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-cyan-100 relative overflow-hidden group">
                   <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-cyan-100 uppercase tracking-widest">Heat Map</p>
                    <p className="text-2xl font-black">Stable</p>
                  </div>
                </div>
                <div className="p-5 bg-emerald-600 rounded-[32px] text-white space-y-4 shadow-xl shadow-emerald-100">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Pill Count</p>
                    <p className="text-2xl font-black">14 <span className="text-sm font-normal">rem.</span></p>
                  </div>
                </div>
                <div className="p-5 bg-slate-900 rounded-[32px] text-white space-y-4 shadow-xl shadow-slate-200 md:col-span-2 relative overflow-hidden">
                   <div className="absolute right-0 top-0 p-4 opacity-10">
                      <Bell className="w-24 h-24" />
                   </div>
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-cyan-50 rounded-full text-[8px] font-black uppercase tracking-widest">Trek Update</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Community Adventure</p>
                    <p className="text-lg font-black">3.2km to Point Lenana</p>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase mt-1">12 friends active now</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Quick Actions</h2>
                <button className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">View Insights</button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Check Symptoms', icon: Activity, tab: 'symptoms', desc: 'Anatomical Heat Map' },
                  { title: 'AR Meal Scan', icon: Zap, tab: 'ar', desc: 'Live Nutrition HUD' },
                  { title: 'Health Journey', icon: Trophy, tab: 'game', desc: 'Condition Monsters' },
                  { title: 'Doctor Summary', icon: FileBarChart, tab: 'report', desc: '30-Day Infographic' },
                  { title: 'Digital Twin', icon: User, tab: 'avatar', desc: 'Visual Habit Tracker' },
                  { title: 'Clinics Nearby', icon: MapPin, tab: 'map', desc: 'Low-Data Maps' }
                ].map((action) => (
                  <button
                    key={action.tab}
                    onClick={() => setActiveTab(action.tab)}
                    className="flex flex-col items-start gap-4 p-6 bg-white border border-slate-100 rounded-[32px] hover:border-cyan-200 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors shadow-sm">
                      <action.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{action.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm">
               <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-50 flex items-center justify-center relative shrink-0">
                     <Droplets className="w-12 h-12 text-cyan-600" />
                     <div className="absolute inset-0 rounded-full border-4 border-cyan-200 border-t-cyan-600 animate-spin"></div>
                  </div>
                  <div className="text-center md:text-left space-y-2">
                     <h3 className="text-xl font-black text-slate-900">Hydration Goal Reached!</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        You've logged 2.5L today. Your Digital Twin is looking extra vibrant! New flower added to your Garden.
                     </p>
                     <button className="text-xs font-black text-cyan-600 uppercase tracking-widest flex items-center gap-2 mx-auto md:mx-0">
                        View Garden <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      <Toaster position="top-center" expand={false} richColors />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <EmergencyCard />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "circOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;