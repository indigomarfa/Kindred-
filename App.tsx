
import React, { useState } from 'react';
import { FunnelChart } from './components/FunnelChart';
import { FUNNEL_DATA } from './constants';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(FUNNEL_DATA[2].id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo and title removed as per request */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* 🧱 MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          
          {/* 🎯 FUNNEL AREA */}
          <div className="relative">
            <section className="relative">
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
                   Структура Воронки
                </h2>
              </div>
              
              {/* The FunnelChart now manages its own independent background bands */}
              <FunnelChart 
                steps={FUNNEL_DATA} 
                onStepClick={(step) => setSelectedId(step.id)} 
                activeId={selectedId}
              />
            </section>
          </div>

          {/* 💎 RIGHT COLUMN: Strategic Summary */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-6">
              
              {/* Product Growth Framework (AARRR Mapping) */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60">
                <h3 className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-3"></span>
                  AARRR
                </h3>
                
                <div className="space-y-6">
                  <div className="relative pl-7 border-l-2 border-slate-100">
                    <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-slate-300"></div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition</h4>
                    <p className="text-[11px] text-slate-600 font-semibold">App Store & Onboarding</p>
                  </div>

                  <div className="relative pl-7 border-l-2 border-blue-100">
                    <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Activation</h4>
                    <p className="text-[12px] text-slate-800 font-bold leading-tight">
                      First Connection <span className="text-[10px] ml-1">⭐</span>
                    </p>
                  </div>

                  <div className="relative pl-7 border-l-2 border-emerald-100">
                    <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></div>
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Retention</h4>
                    <p className="text-[12px] text-slate-800 font-bold leading-tight">
                      Second Conversation <span className="text-[10px] ml-1">⭐</span>
                    </p>
                  </div>

                  <div className="relative pl-7 border-l-2 border-amber-100">
                    <div className="absolute top-0 left-[-7px] w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-200"></div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Referral</h4>
                    <p className="text-[12px] text-slate-800 font-bold leading-tight">
                      Viral Loop & Feedback
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagnostic Guide */}
              <div className="bg-slate-200/40 rounded-[2.5rem] p-8 border border-slate-200/80">
                <h4 className="text-slate-800 font-black text-[10px] mb-6 uppercase tracking-[0.2em]">Як читати воронку?</h4>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <span className="text-rose-500 mr-3 text-lg leading-none">🔻</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">Натисніть на іконки для аналізу бар'єрів та метрик кожного етапу.</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-indigo-600 mr-3 text-lg leading-none">⭐</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">Value Moments — ключові етапи цінності продукту і PMF сигналу.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
