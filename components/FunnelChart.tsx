
import React, { useState } from 'react';
import { FunnelStep } from '../types';

interface Props {
  steps: FunnelStep[];
  onStepClick: (step: FunnelStep) => void;
  activeId?: string;
}

export const FunnelChart: React.FC<Props> = ({ steps, onStepClick, activeId }) => {
  // Modals for Step 0 (Install -> Onboarding)
  const [showProblemModal0, setShowProblemModal0] = useState(false);
  const [showMetricModal0, setShowMetricModal0] = useState(false);
  const [showHealthModal0, setShowHealthModal0] = useState(false);

  // Modals for Step 1 (Onboarding -> Interests)
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showMetricModal, setShowMetricModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);

  // Modals for Step 2 (Interests -> Availability)
  const [showProblemModal2, setShowProblemModal2] = useState(false);
  const [showMetricModal2, setShowMetricModal2] = useState(false);
  const [showHealthModal2, setShowHealthModal2] = useState(false);

  // Modals for Step 3 (Availability -> Profiles)
  const [showProblemModal3, setShowProblemModal3] = useState(false);
  const [showMetricModal3, setShowMetricModal3] = useState(false);
  const [showHealthModal3, setShowHealthModal3] = useState(false);

  const renderIconGroup = (
    stepId: string,
    onHeart?: () => void,
    onStar?: () => void,
    onCross?: () => void
  ) => {
    return (
      <div className="absolute z-10 left-[calc(50%+2rem)] top-1/2 -translate-y-1/2 flex items-center space-x-1">
        {/* Heart */}
        {onHeart && (
          <button 
            onClick={onHeart}
            className="hover:scale-110 transition-transform flex items-center justify-center outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-[90px] h-[90px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-rose-500 fill-current drop-shadow-lg" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="absolute text-[9px] font-black text-white uppercase tracking-tighter mb-2">problems</span>
            </div>
          </button>
        )}

        {/* Star */}
        {onStar && (
          <button 
            onClick={onStar}
            className="hover:scale-110 transition-transform flex items-center justify-center outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-[90px] h-[90px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-amber-400 fill-current drop-shadow-lg" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span className="absolute text-[9px] font-black text-amber-900 uppercase tracking-tighter" style={{ top: '51%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                metrics
              </span>
            </div>
          </button>
        )}

        {/* Cross */}
        {onCross && (
          <button 
            onClick={onCross}
            className="hover:scale-110 transition-transform flex items-center justify-center outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-[90px] h-[90px]">
              <div className="w-16 h-16 bg-emerald-500 rounded-lg drop-shadow-lg relative flex items-center justify-center rotate-45">
                  <div className="absolute inset-0 bg-emerald-500 rounded-lg -rotate-45"></div>
              </div>
              <span className="absolute text-[9px] font-black text-white uppercase tracking-tighter text-center leading-none px-1">
                Health<br/>Signs
              </span>
            </div>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-2xl mx-auto py-8">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];
        const widthPercent = 100 - (index * 6);
        
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
              </div>
              
              {step.diagnosticColor && (
                <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse ${step.diagnosticColor}`} />
              )}
            </button>

            {nextStep && (
              <div className="flex flex-col items-center relative py-2 w-full">
                <div className="w-0.5 h-20 bg-slate-300"></div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-300"></div>

                {/* Icons between Install and Onboarding */}
                {step.id === 'install' && renderIconGroup(
                  'install',
                  () => setShowProblemModal0(true),
                  () => setShowMetricModal0(true),
                  () => setShowHealthModal0(true)
                )}

                {/* Icons between Onboarding and Interests */}
                {step.id === 'onboarding' && renderIconGroup(
                  'onboarding',
                  () => setShowProblemModal(true),
                  () => setShowMetricModal(true),
                  () => setShowHealthModal(true)
                )}

                {/* Icons between Interests and Availability */}
                {step.id === 'interests' && renderIconGroup(
                  'interests',
                  () => setShowProblemModal2(true),
                  () => setShowMetricModal2(true),
                  () => setShowHealthModal2(true)
                )}

                {/* Icons between Availability and Profiles */}
                {step.id === 'availability' && renderIconGroup(
                  'availability',
                  () => setShowProblemModal3(true),
                  () => setShowMetricModal3(true),
                  () => setShowHealthModal3(true)
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Modal for App Install -> Onboarding (Problems) */}
      <Modal 
        isOpen={showProblemModal0} 
        onClose={() => setShowProblemModal0(false)} 
        title="Бар'єри першого дотику" 
        colorClass="rose"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
        items={[
          "Сприйняття застосунку за зрозумілими моделями: дейтинг/нетворкінг/пошук друзів/клуби за інтересами",
          "Застосунок не є 'поверхневим' за сприйняттям ідеї (потрібно заглиблюватись, думати)",
          "Страх користувача бути менш цікавим за інших або не відповідати рівню аудиторії",
          "Користувач не може швидко відповісти, що він отримає від продукту (цінність) — абстрактного “meaningful conversations” не достатньо"
        ]}
      />

      {/* Modal for App Install -> Onboarding (Metrics) */}
      <Modal 
        isOpen={showMetricModal0} 
        onClose={() => setShowMetricModal0(false)} 
        title="Метрики першого відкриття" 
        colorClass="amber"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
        items={[
          "Install → First Open rate",
          "Time to First Open",
          "Open → Start Onboarding Conversion (початок онбордингу)",
          "Zero-action Session Rate (закриття до початку онборбордингу)"
        ]}
      />

      {/* Modal for App Install -> Onboarding (Health) */}
      <Modal 
        isOpen={showHealthModal0} 
        onClose={() => setShowHealthModal0(false)} 
        title="Ознаки здоров'я (Initial Touch)" 
        colorClass="emerald"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />}
        items={[
          "Start Onboarding Rate стабільний по сегментах",
          "Install → Open → Start (в один день)",
          "Low Zero-action Sessions",
          "Низька кількість сесій з негайним закриттям додатку (менше 10 сек)"
        ]}
      />

      {/* Modal for Availability -> Profiles (Problems) */}
      <Modal 
        isOpen={showProblemModal3} 
        onClose={() => setShowProblemModal3(false)} 
        title="Психологія перших результатів" 
        colorClass="rose"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
        items={[
          "Нуль або майже нуль релевантних профілів одразу після сетапу часу",
          "Незрозуміло, що відбувається далі (користувач не розуміє, чи система шукає людей чи потрібно шукати самостійно)"
        ]}
      />

      {/* Modal for Availability -> Profiles (Metrics) */}
      <Modal 
        isOpen={showMetricModal3} 
        onClose={() => setShowMetricModal3(false)} 
        title="Метрики видачі профілів" 
        colorClass="amber"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
        items={[
          "Availability → Profiles Seen conversion (%)",
          "Time from Availability Set to First Profiles Seen",
          "Immediate Exit Rate after Availability (<10–20 сек після сетапу)"
        ]}
      />

      {/* Modal for Availability -> Profiles (Health) */}
      <Modal 
        isOpen={showHealthModal3} 
        onClose={() => setShowHealthModal3(false)} 
        title="Ознаки здоров'я (Discovery Activation)" 
        colorClass="emerald"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />}
        items={[
          "користувач бачить одразу релевантні профілі за часовими слотами після позначення часу в календарі",
          "переважна більшість користувачів не бачить “нуль профілів” одразу після сетапу часу",
          "ті, хто додав availability, дійсно доходять до discovery, а не зникають",
          "користувачі не закривають застосунок одразу після цього кроку"
        ]}
      />

      {/* Modal Helper Component to avoid duplication */}
      <Modal 
        isOpen={showProblemModal} 
        onClose={() => setShowProblemModal(false)} 
        title="Бар'єри самопрезентації" 
        colorClass="rose"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
        items={[
          "люди не знають, як себе описати без помилки",
          "люди бояться виглядати банально / дивно / неправильно “запакувати” себе",
          "у аудиторії Kindred високий репутаційний поріг → будь-який self-description = ризик",
          "для інтровертів опис себе - це потенційно складна задача"
        ]}
      />

      <Modal 
        isOpen={showMetricModal} 
        onClose={() => setShowMetricModal(false)} 
        title="Метрики інтересів" 
        colorClass="amber"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
        items={[
          "Time-to-interests added",
          "Average number of interests",
          "% користувачів, хто: (1) додали додаткові інтереси (більше одного); (2) додали ще 1–2 і зупинились; (3) додали більше 3 інтересів",
          "% редагувань автозгенерованих AI інтересів"
        ]}
      />

      <Modal 
        isOpen={showHealthModal} 
        onClose={() => setShowHealthModal(false)} 
        title="Ознаки здоров'я (Interests)" 
        colorClass="emerald"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
        items={[
          "Completion rate: 70–85%",
          "Median time: < 60 секунд",
          "Avg interests: 3–5",
          "LLM-edit rate: 20–40% (означає “достатньо добре, але хочуть поправити”)"
        ]}
      />

      {/* Second Set of Modals for Availability */}
      <Modal 
        isOpen={showProblemModal2} 
        onClose={() => setShowProblemModal2(false)} 
        title="Психологія Календаря" 
        colorClass="rose"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
        items={[
          "Найбільша і найнебезпечніша точка всієї воронки",
          "Користувач ще не відчуває цінності, але вже має взяти на себе соціальне зобовʼязання",
          "Страх виглядати дивно / надто відкрито / доступно для незнайомців"
        ]}
      />

      <Modal 
        isOpen={showMetricModal2} 
        onClose={() => setShowMetricModal2(false)} 
        title="Метрики Календаря" 
        colorClass="amber"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
        items={[
          "% користувачів з інтересами, які додали ≥1 слот",
          "Time to availability set",
          "% користувачі, які: (1) відкрили календар; (2) нічого не додали; (3) додали 1 слот; (4) додали ≥3 слоти",
          "% тих, хто повертається до календаря пізніше",
          "% видалень слотів (churn signal)"
        ]}
      />

      <Modal 
        isOpen={showHealthModal2} 
        onClose={() => setShowHealthModal2(false)} 
        title="Ознаки здоров'я (Availability)" 
        colorClass="emerald"
        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
        items={[
          "Activation rate: 55–70%",
          "Median time: < 90 секунд",
          "≥1 слот: 80% від активації",
          "≥3 слоти: 20–30%",
          "Slot deletions: < 10%"
        ]}
      />
    </div>
  );
};

// Reusable Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: string[];
  colorClass: 'rose' | 'amber' | 'emerald' | 'slate';
  icon: React.ReactNode;
}> = ({ isOpen, onClose, title, items, colorClass, icon }) => {
  if (!isOpen) return null;
  
  const colors = {
    rose: { bg: 'bg-rose-100', text: 'text-rose-600', dot: 'bg-rose-400', btn: 'bg-slate-900 hover:bg-slate-800' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', dot: 'bg-amber-400', btn: 'bg-amber-600 hover:bg-amber-700' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', dot: 'bg-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-700' },
    slate: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', btn: 'bg-slate-900 hover:bg-slate-800' }
  };
  
  const theme = colors[colorClass];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center space-x-3 mb-6">
          <div className={`${theme.bg} p-2 rounded-xl`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {icon}
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
        </div>
        <ul className="space-y-4">
          {items.map((text, i) => (
            <li key={i} className="flex items-start space-x-3 text-left">
              <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${theme.dot} mt-2`}></span>
              <span className="text-slate-600 font-medium leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={`w-full mt-8 text-white py-3 rounded-2xl font-bold transition-colors ${theme.btn}`}>Зрозуміло</button>
      </div>
    </div>
  );
};
