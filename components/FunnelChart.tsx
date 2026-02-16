
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

  const renderRow = (step: FunnelStep, globalIndex: number) => {
    const isLastOverall = globalIndex === steps.length - 1;
    const widthPercent = 100 - (globalIndex * 6);
    
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
                <p className={`font-black text-sm md:text-base text-left ${!step.isSpecial && 'text-slate-800'}`}>
                  {step.label}
                </p>
                {step.subLabel && (
                  <p className={`text-[10px] uppercase font-bold mt-1 tracking-wider opacity-70 text-left ${
                    step.isSpecial ? 'text-indigo-100' : 'text-slate-500'
                  }`}>
                    {step.subLabel}
                  </p>
                )}
              </div>
            </button>
          </div>
          <div className="flex justify-start" />
        </div>

        {/* Connector & Icons Row */}
        {!isLastOverall && (
          <div className="grid grid-cols-[1fr_minmax(240px,380px)_1fr] gap-x-12 items-center w-full min-h-[100px]">
            <div className="flex justify-end" />
            <div className="flex flex-col items-center py-2">
              <div className="w-0.5 h-16 bg-slate-300"></div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-300"></div>
            </div>
            <div className="flex justify-start items-center">
              {renderIconGroup(step.id)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (title: string, bgColorClass: string, labelColorClass: string, indices: number[]) => {
    return (
      <div className={`w-full border-b border-slate-200/50 p-8 first:rounded-t-3xl last:rounded-b-3xl ${bgColorClass}`}>
        <div className="flex items-center space-x-3 mb-10">
          <div className={`h-1.5 w-6 rounded-full ${labelColorClass}`} />
          <h3 className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
            {title}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          {indices.map(idx => renderRow(steps[idx], idx))}
        </div>
      </div>
    );
  };

  // Strategic Grouping Indices
  const acquisitionIdx = [0]; // install
  const activationIdx = [1, 2, 3, 4, 5, 6]; // onboarding -> first conv (step 6)
  const retentionIdx = [7]; // second conv (step 7)
  const referralIdx = [8]; // post-conv feedback (step 8)
  const revenueIdx = [9]; // revenue (step 9)

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-200/80">
      {renderSection('Acquisition', 'bg-blue-50/90', 'bg-blue-400', acquisitionIdx)}
      {renderSection('Activation', 'bg-emerald-50/90', 'bg-emerald-400', activationIdx)}
      {renderSection('Retention', 'bg-purple-50/90', 'bg-purple-400', retentionIdx)}
      {renderSection('Referral', 'bg-amber-50/90', 'bg-amber-400', referralIdx)}
      {renderSection('Revenue', 'bg-rose-50/90', 'bg-rose-400', revenueIdx)}

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

const getModalData = (type: 'problem' | 'metric' | 'health', stepId: string) => {
  const data: Record<string, any> = {
    'install': {
      problem: { 
        title: "Бар'єри переходу до онбордингу", 
        items: [
          "користувач приходить із рекламного креативу / реферального запрошення / зовнішнього каналу, але перші екрани не підтверджують очікувану цінність",
          "незрозуміле позиціонування додатку (не дейтинг; не networking app)",
          "onboarding достатньо субстантивний і вимагає задуматись, не “tap-and-go” сценарій",
          "користувач може бути недостатньо замотивований завершити onboarding (friction)"
        ] 
      },
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
      problem: { 
        title: "Бар'єри самопрезентації", 
        items: [
          "користувач не розуміє, що саме інтереси визначають якість співрозмовника і є основним критерієм “значності” в додатку",
          "користувачу важко описати свої інтереси і надати оцінку своїм навикам",
          "додавання інтересів потребує часу і рефлексії",
          "користувачу важко розкритись і бути відвертим, тому він може не додавати свої справжні інтереси, що псує роботу алгоритмів",
          "інтереси будуть видимі в профілі публічно і це може бентежити користувача"
        ] 
      },
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
      problem: { 
        title: "Психологія Календаря", 
        items: [
          "користувачу важко взяти зобов'язання щодо позначення конкретних слотів",
          "оскільки користувачу потрібно на цьому етапі позначити хоча б один слот, якщо слот буде не позначено, користувач churns",
          "користувач боїться наперед передбачати свій графік",
          "користувачу важко ділитись такою персональною інформацією, як його вільний час",
          "інтерфейс календаря забирає playful vibe у додатку"
        ] 
      },
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
      problem: {
        title: "Бар'єри переходу до профілів",
        items: [
          "користувач виставив слот, але ніхто з людей, що його цікавлять, не має зручного з ним перетину по часу",
          "немає достатньо релевантних профілів",
          "натиснути “Book” - це вже серйозніше, ніж виставити availability, адже користувач вривається в чужий особистий простір і декларує свій інтерес",
          "користувач боїться, що людина на іншому кінці відмовить",
          "користувач відчуває сумнів, чи варто йому витрачати час на незнайому людину",
          "користувач сумнівається, чи варта та чи інша людина зустрічі",
          "якщо перше бронювання відбувається на 8–10 день trial, користувач не встигає провести як мінімум 2 зустрічі і може не відчути цінності продукту"
        ]
      },
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
      problem: { 
        title: "Бар'єри переходу до бронювання", 
        items: [
          "перші профілі, які користувач бачить після онбордингу, нерелевантні його інтересам",
          "у користувача немає враження, що час затрачений на онбординг був недаремним (немає негайного результату (списку профілів, підтвердження матчів, перетину по часу))",
          "в застосунку немає осіб з профілем, який цікавий користувачу",
          "користувач не розуміє чому саме ці люди йому показані; чи є перетин по часу; наскільки сильний interest overlap",
          "перші профілі формують перше враження про всю платформу (тому якщо вони поверхневі, без опису, з загальними інтересами, виглядають “незрозуміло”, то це проблема)"
        ] 
      },
      metric: { 
        title: "Основна метрика: Конверсія Seen → Booking", 
        items: [
          "Profiles Seen → First Booking", 
          "Avg profiles before booking", 
          "Booking Completion Rate"
        ] 
      },
      health: { 
        title: "Основна метрика: Конверсія Seen → Booking (≥ 60-70%)", 
        items: [
          "Profiles Seen → First Booking (4-7 профілів)",
          "Avg profiles before booking (65-80%)",
          "Booking Completion Rate (60-75%)"
        ] 
      }
    },
    'booking': {
      problem: { 
        title: "Бар'єри до розмови", 
        items: [
          "навіть після бронювання користувач може забути / передумати / злякатися",
          "користувач може сприймати комітмент на зустріч несерйозно",
          "між бронюванням і зустріччю є “мертва зона”, коли з користувачем в застосунку нічого не відбувається",
          "навіть якщо формат не передбачає “писати першим”, виникає страх awkwardness / страх мовчання / страх невідповідності очікувань",
          "технічні проблеми (користувач забув синхронізувати календар; подвійне бронювання; зміна планів)"
        ] 
      },
      metric: { title: "Метрика: Booking → Completed", items: ["Show-up Rate", "Conversation Duration ≥ 25 хв"] },
      health: { title: "Target: 60–75%", items: ["Meetings happen (75–85%)", "Cancellations (<10%)"] }
    },
    'conv1': {
      problem: { 
        title: "Retention Бар'єри", 
        items: [
          "перша розмова може бути цікавою просто тому, що формат новий, а далі користувач churns",
          "перша розмова може бути невдалою, і далі користувач churns",
          "перша розмова може бути вдалою, користувач потребу закрив і далі churns",
          "якщо перша розмова відбулася пізно, користувач може не встигнути на другу до paywall, і далі користувач churns"
        ] 
      },
      metric: { 
        title: "Основна метрика: First → Second Conversation Conversion (%)", 
        items: [
          "Users with ≥2 Conversations / Users with ≥1 Conversation",
          "середній час: 1st → 2nd Conversation",
          "% Users with 2nd Conversation within 14 days",
          "Churn after First Conversation (нема активності 7–14 днів)"
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
        title: "Бар'єри віральності та екосистеми", 
        items: [
          "користувач не отримав “вау” ефекту (якщо розмова була просто «нормальною», користувач не відчуває бажання когось запрошувати)",
          "користувач може самостійно неправильно обирати для себе співрозмовників, але звинувачуватиме у своєму досвіді платформу",
          "користувач може дуже швидко робити висновки про платформу (на основі 2-х розмов)",
          "користувачі можуть кликати випадкових знайомих, які не відповідають вайбу платформи, що знижуватиме якість екосистеми",
          "якщо запрошений користувач заходить і бачить мало профілів, він не активується → referral не масштабується",
          "якщо рефералка виглядає як «приведи друга - отримай бонус», це знижує преміальний характер продукту"
        ] 
      },
      metric: { 
        title: "Основна метрика", 
        items: [
          "invite → first booking conversion rate",
          "% of users who sent ≥1 invite",
          "avg invites per user",
          "invite → signup conversion rate",
          "invite → second conversation rate",
          "viral coefficient (K-factor)",
          "time from first conversation → first referral",
          "% of referred users who become paid",
          "retention rate of referred users vs non-referred"
        ] 
      },
      health: { 
        title: "Основна метрика: invite → first booking conversion rate", 
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
    },
    'feedback': {
      problem: { 
        title: "Бар'єри монетизації", 
        items: [
          "користувач не встигає отримати достатньо цінності за 14 днів; якщо перша розмова відбувається на 10-12 день trial, користувач не встигає відчути всю цінність",
          "користувач не отримав “вау” ефекту (якщо розмови під час безкоштовного trial були невдалими / просто “нормальними”, користувач не відчуває мотивації платити)",
          "користувачу може быть більш вигідна транзакційна модель, а не підписка - що відповідно може быть менш вигідно платформі, якщо розмов буде мало",
          "у випадку, якщо Kindred не вдасться просунути як щоденний продукт → класична subscription-модель може не “зайти”"
        ] 
      },
      metric: { 
        title: "Основна метрика: Trial → Paid Conversion Rate", 
        items: [
          "Trial → Paid Conversion Rate",
          "ARPU",
          "Payback Period",
          "Churn (monthly)"
        ] 
      },
      health: { 
        title: "Основна метрика: Trial → Paid Conversion Rate (25-35%)", 
        items: [
          "Trial → Paid Conversion Rate (25-35%)",
          "ARPU (20 дол./міс)",
          "Payback Period (6-9 міс)",
          "Churn (monthly) (≤ 8–10%)"
        ] 
      }
    }
  };
  return (data[stepId] && data[stepId][type]) || { title: "Діагностика", items: ["Дані відсутні"] };
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; type: 'problem' | 'metric' | 'health'; stepId: string; }> = ({ isOpen, onClose, type, stepId }) => {
  const content = getModalData(type, stepId);
  const colors = {
    problem: { bg: 'bg-rose-100', text: 'text-rose-600', dot: 'bg-rose-400', btn: 'bg-slate-900 hover:bg-slate-800' },
    metric: { bg: 'bg-amber-100', text: 'text-amber-600', dot: 'bg-amber-400', btn: 'bg-amber-600 hover:bg-amber-700' },
    health: { bg: 'bg-emerald-100', text: 'text-emerald-600', dot: 'bg-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700' }
  };
  const theme = colors[type];
  const iconPath = type === 'problem' ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" : 
                   type === 'metric' ? "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" : "M5 13l4 4L19 7";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md text-left">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center space-x-4 mb-8">
          <div className={`${theme.bg} p-3 rounded-2xl`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme.text}`} fill="currentColor" viewBox="0 0 24 24"><path d={iconPath} /></svg>
          </div>
          {/* Only show title for non-problem modals as per user request */}
          {type !== 'problem' && (
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{content.title}</h3>
          )}
        </div>
        <div className="max-h-[50vh] overflow-y-auto pr-2">
          <ul className="space-y-4">
            {content.items.map((text: string, i: number) => (
              <li key={i} className="flex items-start space-x-3">
                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${theme.dot} mt-2`}></span>
                <span className="text-slate-600 font-semibold text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className={`w-full mt-10 text-white py-4 rounded-2xl font-black transition-colors shadow-lg ${theme.btn}`}>ЗРОЗУМІЛО</button>
      </div>
    </div>
  );
};
