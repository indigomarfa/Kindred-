
export interface FunnelStep {
  id: string;
  label: string;
  subLabel?: string;
  value: number;
  percentage: number;
  isSpecial?: boolean;
  problem?: string;
  solution?: string;
  diagnosticColor?: string;
}

export interface TimeMetric {
  id: string;
  label: string;
  value: string;
  target: string;
  warning: string;
  status: 'good' | 'warning' | 'critical';
}
