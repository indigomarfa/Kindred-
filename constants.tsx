
import { FunnelStep, TimeMetric } from './types';

export const FUNNEL_DATA: FunnelStep[] = [
  { id: 'install', label: 'App Install / Open', subLabel: '(Not North Star)', value: 1000, percentage: 100 },
  { id: 'onboarding', label: 'Onboarding Completed', subLabel: '(User finished flow)', value: 820, percentage: 82 },
  { 
    id: 'interests', 
    label: 'Interests Added', 
    subLabel: '(≥3 interests)', 
    value: 410, 
    percentage: 50,
    problem: 'Інтереси складно формулювати. Людина не розуміє "навіщо це".',
    solution: 'LLM-генерація інтересів. Приклади: "Люди в Сієтлі говорять про..."',
    diagnosticColor: 'bg-orange-500'
  },
  { 
    id: 'availability', 
    label: 'Availability Set', 
    subLabel: '(≥1 time slot)', 
    value: 205, 
    percentage: 50,
    problem: 'Календар = психологічний барʼєр. Виглядає як "commitment".',
    solution: 'Додай 1 слот, це не зобовʼязує. Default templates.',
    diagnosticColor: 'bg-red-500'
  },
  { 
    id: 'profiles', 
    label: 'First Profiles Seen', 
    subLabel: '(Search results shown)', 
    value: 180, 
    percentage: 88,
    problem: 'Low liquidity. Порожній екран.',
    solution: 'Curated results. Concierge / founding members.',
    diagnosticColor: 'bg-orange-400'
  },
  { 
    id: 'booking', 
    label: 'First Booking Created', 
    subLabel: '(Calendar booking)', 
    value: 90, 
    percentage: 50,
    problem: 'Страх "а що якщо незручно?". Неясно, про що говорити.',
    solution: 'Чітка тема + формат. 30 хв, без зобовʼязань.',
    diagnosticColor: 'bg-red-400'
  },
  { 
    id: 'conv1', 
    label: 'First Conv Completed', 
    subLabel: '⭐ VALUE MOMENT', 
    value: 65, 
    percentage: 72, 
    isSpecial: true,
    problem: 'No-show. Незрозумілий формат дзвінка.',
    solution: 'Reminders. Conversation wrapper. Очікування -> нормалізація.',
  },
  { 
    id: 'conv2', 
    label: 'Second Conv Completed', 
    subLabel: '⭐ EARLY PMF SIGNAL', 
    value: 12, 
    percentage: 18, 
    isSpecial: true,
    problem: 'Продукт не дає стабільної цінності або матчі слабкі.',
    solution: 'Quality > quantity. Explicit positioning. Feedback loop.',
    diagnosticColor: 'bg-red-600'
  },
  { 
    id: 'feedback', 
    label: 'Post-conversation feedback & actions', 
    subLabel: '(Loop & Referral)', 
    value: 6, 
    percentage: 50,
    isSpecial: false
  },
  { 
    id: 'revenue', 
    label: 'Revenue / Subscription', 
    subLabel: 'PAID USER', 
    value: 2, 
    percentage: 33, 
    isSpecial: true 
  },
];

export const TIME_METRICS: TimeMetric[] = [
  { id: 'profile_open', label: 'Time to First Profile Open', value: '15s', target: '8–25 сек (median)', warning: '60 сек', status: 'good' },
  { id: 'booking', label: 'Time to First Booking', value: '4d', target: '< 3 дні', warning: '> 7 днів', status: 'warning' },
  { id: 'conversation', label: 'Time to First Conv', value: '11d', target: '≤ 7 днів', warning: '> 10-14 днів', status: 'critical' },
];
