import React, { useState } from 'react';
import { MEDICATIONS } from '../data/mockData';
import { Pill, AlertTriangle, Clock, ShieldCheck, Camera, Sun, Moon, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const MedicationManager: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        name: 'Azithromycin',
        dosage: '250mg',
        instructions: 'Take one daily for 5 days.',
        schedule: 'morning'
      });
      toast.success('Prescription extracted successfully!');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Prescription Management</h1>
          <p className="text-muted-foreground">Visual schedule and smart pill scanning</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={simulateScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-all font-medium disabled:opacity-50"
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            Scan Bottle
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium">
            Add Manual
          </button>
        </div>
      </header>

      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-cyan-50 border-2 border-cyan-200 rounded-3xl space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-cyan-900">New Medication Detected</h3>
                  <p className="text-sm text-cyan-700">OCR scan identified the following details</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white rounded-xl border border-cyan-100">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase">Name</p>
                  <p className="text-sm font-bold">{scanResult.name}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-cyan-100">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase">Dosage</p>
                  <p className="text-sm font-bold">{scanResult.dosage}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-cyan-100">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase">Schedule</p>
                  <p className="text-sm font-bold">Morning</p>
                </div>
                <button 
                  onClick={() => setScanResult(null)}
                  className="p-3 bg-cyan-600 text-white rounded-xl font-bold text-sm hover:bg-cyan-700"
                >
                  Add to List
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        {MEDICATIONS.map((med, index) => (
          <motion.div
            key={med.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm group hover:shadow-md transition-all"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                    <Pill className="w-7 h-7 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{med.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">{med.type}</span>
                      <span className="text-xs font-bold text-cyan-600">{med.dosage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex gap-1">
                    {med.schedule === 'morning' || med.schedule === 'both' ? (
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600" title="Morning">
                        <Sun className="w-4 h-4" />
                      </div>
                    ) : null}
                    {med.schedule === 'evening' || med.schedule === 'both' ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600" title="Evening">
                        <Moon className="w-4 h-4" />
                      </div>
                    ) : null}
                   </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  Smart Schedule
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {med.instructions}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Safety Warnings</h4>
                <div className="flex flex-wrap gap-2">
                  {med.warnings.map((warning, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full border border-amber-100">
                      <AlertTriangle className="w-3 h-3" />
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
                DRUG INTERACTION SAFE
              </div>
              <button className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-wider">Details</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-slate-100 rounded-3xl flex flex-col items-center text-center space-y-3 border border-slate-200">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
          <AlertTriangle className="w-6 h-6 text-slate-400" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-700">Non-Diagnostic Output</p>
          <p className="text-xs text-slate-500 max-w-md">
            Visual recognition and scheduling are assistants only. Always verify with your actual physician or pharmacist.
          </p>
        </div>
      </div>
    </div>
  );
};