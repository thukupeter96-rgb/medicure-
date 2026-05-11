import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldAlert, X, User, Heart, AlertCircle, QrCode, Mail, MapPin } from 'lucide-react';

export const EmergencyCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 md:w-20 md:h-20 bg-rose-600 text-white rounded-full shadow-2xl shadow-rose-200 flex items-center justify-center group border-4 border-white"
      >
        <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed inset-0 md:inset-auto md:bottom-32 md:right-8 w-full md:w-[400px] bg-slate-900 text-white rounded-[40px] shadow-2xl overflow-hidden p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center">
                     <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black">Emergency Card</h2>
               </div>
               <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
               <div className="p-6 bg-white rounded-[32px] text-slate-900 flex flex-col items-center text-center space-y-4">
                  <div className="w-40 h-40 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border-2 border-slate-100">
                     <QrCode className="w-full h-full text-slate-900" />
                  </div>
                  <div>
                     <p className="text-sm font-black">SCAN FOR INSTANT INFO</p>
                     <p className="text-xs text-slate-500 font-medium">Quick access for First Responders</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Type</p>
                     <p className="text-lg font-black text-rose-400">O Positive</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Allergies</p>
                     <p className="text-xs font-black">Penicillin, Latex</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Contact</h3>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                     <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-black">Mercy Wanjiru (Sister)</p>
                        <p className="text-xs text-slate-400">+254 712 345 678</p>
                     </div>
                     <button className="w-10 h-10 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-rose-200 leading-relaxed font-medium">
                    Pressing the lock screen trigger will broadcast your location to your emergency circle automatically.
                  </p>
               </div>
            </div>

            <button 
              className="w-full mt-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-700 transition-all"
            >
              Trigger Emergency Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};