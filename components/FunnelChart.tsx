
import React, { useState } from 'react';
import { FunnelStep } from '../types';

interface Props {
  steps: FunnelStep[];
  onStepClick: (step: FunnelStep) => void;
  activeId?: string;
}

export const FunnelChart: React.FC<Props> = ({ steps, onStepClick, activeId }) => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'problem' | 'metric' | 'health' | null; stepId: string | null }>({
    isOpen: false,
    type: null,
    stepId: null
  });

  const closeModal = () => setModalState({ isOpen: false, type: null, stepId: null });
  const openModal = (type: 'problem' | 'metric' | 'health', stepId: string) => setModalState({ isOpen: true, type, stepId });

  const renderIconGroup = (stepId: string) => {
    return (
      <div className="flex items-center space-x-2 shrink-0 h-full py-4">
        {/* Problems Icon (Heart) */}
        <button 
          onClick={() => openModal('problem', stepId)}
          className="hover:scale-110 transition-transform flex items-center justify-center outline-none"
        >
          <div className="relative flex items-center justify-center w-[64px] h-[64px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-rose-500 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="absolute text-[6px] font-black text-white uppercase tracking-tighter mb-1.5">problems</span>
          </div>
        </button>

        {/* Metrics Icon (Star) */}
        <button 
          onClick={() => openModal('metric', stepId)}
          className="hover:scale-110 transition-transform flex items-center justify-center outline-none"
        >
          <div className="relative flex items-center justify-center w-[64px] h-[64px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-amber-400 fill-current drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="absolute text-[6px] font-black text-amber-900 uppercase tracking-tighter" style={{ top: '51%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              metrics
            </span>
          </div>
        </button>

        {/* Health Icon (Diamond/Leaf) */}
        <button 
          onClick={() => openModal('health', stepId)}
          className="hover:scale-110 transition-transform flex items-center justify-center outline-none"
        >
          <div className="relative flex items-center justify-center w-[64px] h-[64px]">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg shadow-sm relative flex items-center justify-center rotate-45">
                <div className="absolute inset-0 bg-emerald-500 rounded-lg -rotate-45"></div>
            </div>
            <span className="absolute text-[6px] font-black text-white uppercase tracking-tighter text-center leading-none px-1">
              Health<br/>Signs
            </span>
          </div>
        </button>
      </div>
    );
  };

  const renderRow = (step: FunnelStep, index: number) => {
    const nextStep = steps[index + 1];
    const widthPercent = 100 - (index * 6);
    
    return (
      <div key={step.id} className="w-full">
        {/* Step Card Row */}
        <div className="grid grid-cols-[1fr_minmax(240px,380px)_1fr] gap-x-12 items-center w-full">
          <div className="flex justify-end" />
          <div className="flex justify-center w-full">
            <button
              onClick={() => onStepClick(step)}
              className={`relative transition-all duration-300 group z-10 w-full ${
                activeId === step.id ? 'ring-4 ring-blue-300 scale-105' : 'hover:scale-[1.02]'
              }`}
              style={{ width: `${widthPercent}%` }}
            >
              <div className={`p-5 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.04)] border-b-4 border-black/10 flex flex-col items-start ${
                step.isSpecial ? 'bg-indigo-600 text-white' : 'bg-white'
              }`}>
                <p className={`font-black text-sm md:text-base ${!step.isSpecial && 'text-slate-800'}`}>
                  {step.label}
                </p>
                {step.subLabel && (
                  <p className={`text-[10px] uppercase font-bold mt-1 tracking-wider opacity-70 ${!step.isSpecial && 'text-slate-500'}`}>
                    {step.subLabel}
                  </p>
                )}
              </div>
            </button>
          </div>
          <div className="flex justify-start" />
        </div>

        {/* Connector & Icons Row */}
        {nextStep && (
          <div className="grid grid-cols-[1fr_minmax(240px,380px)_1fr] gap-x-12 items-center w-full min-h-[100px]">
            <div className="flex justify-end" />
            <div className="flex flex-col items-center py-2">
              <div className="w-0.5 h-16 bg-slate-200"></div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-200"></div>
            </div>
            <div className="flex justify-start items-center">
              {renderIconGroup(step.id)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const labelStyle = "text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase opacity-60";

  return (
    <div className="relative w-full">
      {/* 🏗️ STRATEGIC BACKGROUND BANDS */}
      <div 
        className="absolute top-[-2%] left-0 w-full h-[16%] z-0 pointer-events-none border-y border-slate-100/50"
        style={{ backgroundColor: 'rgba(100,149,237,0.05)' }}
      >
        <div className="pt-4 px-4">
          <h3 className={labelStyle}>Acquisition</h3>
        </div>
      </div>
      
      <div 
        className="absolute top-[14%] left-0 w-full h-[62%] z-0 pointer-events-none border-y border-slate-100/50"
        style={{ backgroundColor: 'rgba(76,175,80,0.045)' }}
      >
        <div className="pt-4 px-4">
          <h3 className={labelStyle}>Activation</h3>
        </div>
      </div>
      
      <div 
        className="absolute top-[76%] left-0 w-full h-[12%] z-0 pointer-events-none border-y border-slate-100/50"
        style={{ backgroundColor: 'rgba(156,39,176,0.05)' }}
      >
        <div className="pt-4 px-4">
          <h3 className={labelStyle}>Retention</h3>
        </div>
      </div>

      <div 
        className="absolute top-[88%] left-0 w-full h-[14%] z-0 pointer-events-none border-y border-slate-100/50"
        style={{ backgroundColor: 'rgba(255,193,7,0.05)' }}
      >
        <div className="pt-4 px-4">
          <h3 className={labelStyle}>Referral</h3>
        </div>
      </div>

      {/* 🚀 FUNNEL CONTENT */}
      <div className="relative z-10 flex flex-col items-center pt-16 pb-12 space-y-0">
        {steps.map((step, i) => renderRow(step, i))}
      </div>

      {/* Modal Components */}
      {modalState.isOpen && (
        <Modal 
          isOpen={modalState.isOpen} 
          onClose={closeModal} 
          type={modalState.type!} 
          stepId={modalState.stepId!} 
        />
      )}
    </div>
  );
};

// Modal Content Data
const getModalData = (type: 'problem' | 'metric' | 'health', stepId: string) => {
  const data: Record<string, any> = {
    'install': {
      problem: { title: "Бар'єри першого дотику", items: ["Сприйняття застосунку за дейтинг/нетворкінг", "Потреба заглиблюватись, думати", "Страх не відповідати рівню аудиторії", "Абстрактна цінність"] },
      metric: { 
        title: "Основна метрика: Open → Onboarding Completion Rate", 
        items: [
          "Install → First Open rate", 
          "Time to First Open", 
          "First Open → Start Onboarding Conversion", 
          "Start Onboarding → Complete Onboarding", 
          "Zero-action Session Rate", 
          "Onboarding completion time (median)"
        ] 
      },
      health: { 
        title: "Основна метрика: Open → Onboarding Completion Rate (60–75%)", 
        items: [
          "Install → First Open rate (70–85%)",
          "Time to First Open (<5 хвилин)",
          "First Open → Start Onboarding Conversion (65–80%)",
          "Start Onboarding → Complete Onboarding (75–85%)",
          "Zero-action Session Rate (<15%)",
          "Onboarding completion time (median) = 5 хвилин"
        ] 
      }
    },
    'onboarding': {
      problem: { title: "Бар'єри самопрезентації", items: ["Складність опису себе", "Страх виглядати банально", "Високий репутаційний поріг"] },
      metric: { 
        title: "Основна метрика: % Users Adding ≥3 Interests", 
        items: [
          "% Users adding only mandatory minimum (exactly 2)",
          "Avg number of interests added",
          "% Interests with expertise level filled",
          "Avg interest selection time"
        ] 
      },
      health: { 
        title: "Основна метрика: % Users Adding ≥3 Interests (60–80%)", 
        items: [
          "% Users adding only mandatory minimum (exactly 2) (≤ 35%)",
          "Avg number of interests added (= 3)",
          "% Interests with expertise level filled (≥ 70%)",
          "Avg interest selection time (< 90 sec)"
        ] 
      }
    },
    'interests': {
      problem: { title: "Психологія Календаря", items: ["Commitment без відчуття цінності", "Страх надто відкритого профілю"] },
      metric: { 
        title: "Основна метрика: % Users Setting ≥2 Valid Time Slots", 
        items: [
          "Avg number of time slots added",
          "% Users adding only 1 slot (мінімально можливий варіант)",
          "% Users setting availability within first day",
          "Time spent on calendar step"
        ] 
      },
      health: { 
        title: "Основна метрика: % Users Setting ≥2 Valid Time Slots (70–85%)", 
        items: [
          "Avg number of time slots added (= 2)",
          "% Users adding only 1 slot (мінімально можливий варіант) (≤ 30%)",
          "Time spent on calendar step (60–90 sec)"
        ] 
      }
    },
    'availability': {
      metric: { 
        title: "Основна метрика: % users who view ≥3 profiles", 
        items: [
          "Avg profiles viewed per session",
          "Profile Open Rate",
          "Time to first profile view"
        ] 
      },
      health: { 
        title: "Основна метрика: % users who view ≥3 profiles (70–85%)", 
        items: [
          "Avg profiles viewed per session (≥ 5)",
          "Profile Open Rate (≥ 40%)",
          "Time to first profile view (10–25 seconds)"
        ] 
      }
    },
    'profiles': {
      problem: { title: "Бар'єр Активації", items: ["Інтерес не дорівнює готовність", "Забронювати = відповідальність", "Обережність у виборі співрозмовника"] },
      metric: { 
        title: "Основна метрика: конверсія First Profiles Seen → First Booking Created", 
        items: [
          "середній час Profiles Seen → First Booking",
          "середня кількість переглянутих профілів перед First Booking",
          "Profile Open Rate",
          "Booking Completion Rate (користувач розпочав бронювання і його завершив)",
          "Booking Cancellation",
          "Booking Without Chat Rate",
          "New/Retained Users Booking Rate"
        ] 
      },
      health: { 
        title: "Основна метрика: конверсія First Profiles Seen → First Booking Created (20-35%)", 
        items: [
          "середній час Profiles Seen → First Booking (1-3 дні)",
          "середня кількість переглянутих профілів перед First Booking (3–7 профілів)",
          "Profile Open Rate (40–65%)",
          "Booking Completion Rate (користувач розпочав бронювання і його завершив) (80–90%)",
          "Booking Cancellation (<5%)",
          "Booking Without Chat Rate (90%+)",
          "New/Retained Users Booking Rate (≥ 50-60%)"
        ] 
      }
    },
    'booking': {
      problem: { title: "Бар'єри до розмови", items: ["No-show ризики", "Страх перед розмовою з незнайомцем", "Асиметрія в очікуваннях"] },
      metric: { 
        title: "Основна метрика: Booking → Conversation Completed", 
        items: ["Show-up Rate (обидва учасники)", "Conversation Duration ≥ 25 хв"] 
      },
      health: { 
        title: "Основна метрика: 60–75% бронювань завершуються розмовою", 
        items: ["75–85% зустрічей відбуваються", "<10% скасувань"] 
      }
    },
    'conv1': {
      problem: { title: "Retention Бар'єри", items: ["“One-and-done” ефект", "Відсутність звички повертатись", "Страх нав’язливості"] },
      metric: { 
        title: "Основна метрика: First → Second Conversation Conversion (%)", 
        items: [
          "Users with ≥2 Conversations / Users with ≥1 Conversation",
          "середній час: 1st → 2nd Conversation",
          "% Users with 2nd Conversation within 14 days",
          "Silent Churn after First Conversation (нема активності 7–14 днів)"
        ] 
      },
      health: { 
        title: "Основна метрика: First → Second Conversation Conversion (%) (35–50%+)", 
        items: [
          "Users with ≥2 Conversations / Users with ≥1 Conversation",
          "середній час: 1st → 2nd Conversation (3-7 днів)",
          "% Users with 2nd Conversation within 14 days (30-40%+)",
          "Churn after First Conversation (нема активності 7–14 днів) (<35%)"
        ] 
      }
    },
    'conv2': {
      problem: { 
        title: "Бар'єри Віральності та Рефералів", 
        items: [
          "- користувач не отримав “вау” ефекту",
          "- користувач може самостійно неправильно обирати співрозмовників",
          "- користувач може дуже швидко робити висновки",
          "- залучення нерелевантної аудиторії",
          "- низька активація рефералів",
          "- рефералка знижує преміальність"
        ] 
      },
      metric: { 
        title: "Основна метрика: invite → first booking conversion rate (Viral Loop)", 
        items: [
          "- % of users who sent ≥1 invite",
          "- avg invites per user",
          "- invite → signup conversion rate",
          "- invite → second conversation rate",
          "- viral coefficient (K-factor)",
          "- time from first conversation → first referral",
          "- % of referred users who become paid",
          "- retention rate of referred users vs non-referred"
        ] 
      },
      health: { 
        title: "Основна метрика: invite → first booking conversion rate (Growth Targets)", 
        items: [
          "% of users who sent ≥1 invite (≥ 20–30%)",
          "avg invites per user (1.5-3)",
          "invite → signup conversion rate (20-35%)",
          "invite → second conversation rate (15-25%)",
          "viral coefficient (K-factor) (0.2-0.4)",
          "time from first conversation → first referral (≤ 7 days)",
          "% of referred users who become paid (10-25%)",
          "retention rate of referred users vs non-referred (+15-30% на 30 день)"
        ] 
      }
    }
  };

  const defaultData = { title: "Діагностика", items: ["Дані відсутні для цього кроку"] };
  return (data[stepId] && data[stepId][type]) || defaultData;
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: 'problem' | 'metric' | 'health';
  stepId: string;
}> = ({ isOpen, onClose, type, stepId }) => {
  const content = getModalData(type, stepId);
  const colors = {
    problem: { bg: 'bg-rose-100', text: 'text-rose-600', dot: 'bg-rose-400', btn: 'bg-slate-900 hover:bg-slate-800' },
    metric: { bg: 'bg-amber-100', text: 'text-amber-600', dot: 'bg-amber-400', btn: 'bg-amber-600 hover:bg-amber-700' },
    health: { bg: 'bg-emerald-100', text: 'text-emerald-600', dot: 'bg-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700' }
  };
  const theme = colors[type];
  
  const iconPath = type === 'problem' ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" : 
                   type === 'metric' ? "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" : 
                   "M5 13l4 4L19 7";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center space-x-4 mb-8">
          <div className={`${theme.bg} p-3 rounded-2xl`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme.text}`} fill="currentColor" viewBox="0 0 24 24">
              <path d={iconPath} />
            </svg>
          </div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{content.title}</h3>
        </div>
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <ul className="space-y-5">
            {content.items.map((text: string, i: number) => (
              <li key={i} className="flex items-start space-x-4">
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${theme.dot} mt-2`}></span>
                <span className="text-slate-600 font-semibold leading-relaxed text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className={`w-full mt-10 text-white py-4 rounded-2xl font-black transition-colors shadow-lg ${theme.btn}`}>ЗРОЗУМІЛО</button>
      </div>
    </div>
  );
};
