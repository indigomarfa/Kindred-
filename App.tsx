
import React, { useState } from 'react';
import { FunnelChart } from './components/FunnelChart';
import { MetricsGrid } from './components/MetricsGrid';
import { FUNNEL_DATA, TIME_METRICS } from './constants';
import { FunnelStep } from './types';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(FUNNEL_DATA[2].id);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">NS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Metrics & Main Funnel */}
          <div className="lg:col-span-8">
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                   ЧАСОВІ МЕТРИКИ
                </h2>
              </div>
              <MetricsGrid metrics={TIME_METRICS} />
              
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start space-x-3 mb-8">
                <span className="text-xl">⚠️</span>
                <p className="text-sm text-rose-800 font-medium">
                  Якщо <strong>time_to_first_conversation &gt; 7 днів</strong>, retention майже гарантовано падає.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                 СТРУКТУРА ВОРОНКИ
              </h2>
              <FunnelChart 
                steps={FUNNEL_DATA} 
                onStepClick={(step) => setSelectedId(step.id)} 
                activeId={selectedId}
              />
            </section>
          </div>

          {/* Right Column: Key Summary & North Star */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* North Star Section */}
              <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">🎯</span> North Star Weekly
                </h3>
                
                <div className="space-y-4">
                   <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5">
                      <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Activated Users</p>
                      {/* Numbers removed as per request */}
                   </div>
                   
                   <div className="space-y-4 pt-2">
                     <div className="p-4 rounded-2xl bg-indigo-800/50 border border-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-indigo-100 text-xs font-medium uppercase">≥1 conversation (14d)</span>
                          {/* Percentage removed */}
                        </div>
                        <div className="w-full bg-indigo-950 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                     </div>

                     <div className="p-4 rounded-2xl bg-indigo-800/50 border border-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-indigo-100 text-xs font-medium uppercase">≥2 conversations (14d)</span>
                          {/* Percentage removed */}
                        </div>
                        <div className="w-full bg-indigo-950 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }}></div>
                        </div>
                        <p className="text-[10px] text-indigo-300 mt-2 font-bold uppercase tracking-tighter">⭐ EARLY PMF SIGNAL</p>
                     </div>
                   </div>
                </div>
                
                <p className="mt-8 text-[10px] text-indigo-300 font-medium italic leading-relaxed border-t border-white/10 pt-4">
                  * "Activation" визначається через реальну розмову, а не просто логін.
                </p>
              </div>

              {/* Quick Info / Diagnostic Summary */}
              <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200">
                <h4 className="text-slate-800 font-bold text-sm mb-4 uppercase tracking-wide">Як читати воронку</h4>
                <div className="space-y-3">
                  <div className="flex items-start text-xs text-slate-600">
                    <span className="text-rose-500 mr-2 font-bold">🔻</span>
                    <p>Натисніть на іконки між кроками для детального аналізу бар'єрів та метрик.</p>
                  </div>
                  <div className="flex items-start text-xs text-slate-600">
                    <span className="text-indigo-600 mr-2 font-bold">⭐</span>
                    <p>Value Moments — точки, де користувач отримує основну цінність.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Legend */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 px-6 z-20">
         <div className="max-w-6xl mx-auto flex flex-wrap gap-6 items-center justify-center text-xs font-bold text-slate-500">
            <div className="flex items-center"><div className="w-3 h-3 bg-indigo-600 rounded-sm mr-2"></div> КЛЮЧОВИЙ VALUE MOMENT</div>
         </div>
      </footer>
    </div>
  );
};

export default App;
