export interface MetricPoint {
  date: string;
  value: number;
}

export interface WorkDistributionPoint {
  category: string;
  hours: number;
}

export interface ProductivityMetrics {
  cycleTime: MetricPoint[];
  leadTime: MetricPoint[];
  changeFailureRate: MetricPoint[];
  timeToRestore: MetricPoint[];
  workDistribution: WorkDistributionPoint[];
}
