
import React from 'react';
import { FunnelStep } from '../types';

interface Props {
  steps: FunnelStep[];
  onStepClick: (step: FunnelStep) => void;
  activeId?: string;
}

export const FunnelChart: React.FC<Props> = ({ steps, onStepClick, activeId }) => {
  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-2xl mx-auto py-8">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];
        const widthPercent = 100 - (index * 6); // Simple funnel slope effect
        
        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onStepClick(step)}
              className={`relative transition-all duration-300 group ${
                activeId === step.id ? 'ring-4 ring-blue-300 scale-105' : 'hover:scale-[1.02]'
              }`}
              style={{ width: `${widthPercent}%` }}
            >
              <div className={`p-4 rounded-xl shadow-lg border-b-4 border-black/10 flex justify-between items-center ${
                step.isSpecial ? 'bg-indigo-600 text-white' : 'bg-white'
              }`}>
                <div className="text-left">
                  <p className={`font-bold text-sm md:text-base ${!step.isSpecial && 'text-slate-800'}`}>
                    {step.label}
                  </p>
                  {step.subLabel && (
                    <p className={`text-xs opacity-80 ${!step.isSpecial && 'text-slate-500'}`}>
                      {step.subLabel}
                    </p>
                  )}
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="font-mono font-bold text-lg">{step.value}</span>
                   {index > 0 && (
                     <span className={`text-[10px] font-bold px-1.5 rounded ${
                        step.percentage < 30 ? 'bg-red-100 text-red-600' : 
                        step.percentage < 60 ? 'bg-orange-100 text-orange-600' : 
                        'bg-green-100 text-green-600'
                     }`}>
                        {step.percentage}% conversion
                     </span>
                   )}
                </div>
              </div>
              
              {/* Dropoff Indicator */}
              {step.diagnosticColor && (
                <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse ${step.diagnosticColor}`} />
              )}
            </button>

            {nextStep && (
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-slate-300"></div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-300"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
