import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Activity, Pill, Heart, Download, Share2, Info } from 'lucide-react';

export const DoctorReport: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 pb-24 md:pb-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Clinician Insight</h1>
          <p className="text-sm font-medium text-slate-500">30-day health summary optimized for rapid review</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
         <div className="p-8 md:p-12 space-y-12">
            {/* Report Header */}
            <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-slate-100">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[28px] bg-slate-100 flex items-center justify-center text-slate-400">
                     <FileText className="w-10 h-10" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-slate-900">Alex Kemboi</h2>
                     <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Patient ID: #MK-4920 \u2022 DOB: 12/04/1988</p>
                  </div>
               </div>
               <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reporting Period</p>
                  <p className="text-lg font-black text-slate-900">Oct 01 - Oct 30, 2023</p>
               </div>
            </div>

            {/* Visual Analytics Grid */}
            <div className="grid md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-8">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Symptom Frequency</h3>
                        <div className="flex gap-2 text-[8px] font-bold uppercase">
                           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Headache</span>
                           <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Fatigue</span>
                        </div>
                     </div>
                     <div className="h-48 w-full bg-slate-50 rounded-3xl p-6 relative flex items-end gap-2">
                        {[40, 60, 30, 85, 45, 90, 65, 55, 75, 40].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                             <div className="w-full bg-rose-200 rounded-t-lg" style={{ height: `${h}%` }}></div>
                             <div className="w-full bg-cyan-500 rounded-b-lg" style={{ height: `${h/2}%` }}></div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-6 bg-slate-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <Activity className="w-3 h-3" />
                           Avg Blood Pressure
                        </div>
                        <p className="text-3xl font-black text-slate-900">128/82 <span className="text-xs font-normal text-slate-400">mmHg</span></p>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                           Stable Range
                        </div>
                     </div>
                     <div className="p-6 bg-slate-50 rounded-3xl space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <Pill className="w-3 h-3" />
                           Med Adherence
                        </div>
                        <p className="text-3xl font-black text-slate-900">94<span className="text-xs font-normal text-slate-400">%</span></p>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                           -2 Missed Doses
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Top Concerns</h3>
                     <div className="space-y-3">
                        {[ 
                          { label: 'Chronic Migraine', count: '12 events', color: 'bg-rose-500' },
                          { label: 'Mild Dehydration', count: '4 days', color: 'bg-amber-500' },
                          { label: 'Stable BP', count: '28 days', color: 'bg-emerald-500' }
                        ].map((item) => (
                          <div key={item.label} className="p-4 border border-slate-100 rounded-2xl flex items-center gap-3">
                             <div className={`w-2 h-8 rounded-full ${item.color}`}></div>
                             <div>
                                <p className="text-xs font-black text-slate-900">{item.label}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{item.count}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="p-6 bg-slate-900 text-white rounded-[32px] space-y-4 shadow-xl">
                     <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Heart className="w-3 h-3 text-rose-500" />
                        Doctor Notes
                     </div>
                     <p className="text-xs font-medium leading-relaxed italic text-slate-300">
                       "Alex reports improvement in energy levels since adjusting Lisinopril timing to morning. Migraine frequency remains the primary focus for next visit."
                     </p>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-cyan-50 rounded-[32px] border border-cyan-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white">
                  <Info className="w-6 h-6" />
               </div>
               <p className="text-xs font-bold text-cyan-900 leading-relaxed">
                 This infographic is designed for a 10-second scan. It summarizes all logged metrics including anatomical heatmaps, nutritional data, and medication consistency.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};