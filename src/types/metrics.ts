export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface WorkDistribution {
  coding: number;
  reviews: number;
  meetings: number;
}

export interface MetricsResponse {
  data: MetricPoint[];
  error?: string;
}

export interface WorkDistributionData {
  category: string;
  value: number;
  color: string;
}

export interface WorkDistributionResponse {
  data: WorkDistributionData[];
  error?: string;
}
