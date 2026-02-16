
import React from 'react';
import { TimeMetric } from '../types';

interface Props {
  metrics: TimeMetric[];
}

export const MetricsGrid: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {metrics.map((m) => (
        <div key={m.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1.5 h-full ${
            m.status === 'good' ? 'bg-emerald-500' : 
            m.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
          }`} />
          
          <h4 className="text-slate-500 text-sm font-medium mb-4">{m.label}</h4>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Ціль (Добре)</span>
              <span className="text-emerald-600 font-semibold">{m.target}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Тривожний сигнал</span>
              <span className="text-rose-500 font-semibold">{m.warning}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
