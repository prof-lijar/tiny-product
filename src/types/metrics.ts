export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface MetricsResponse {
  data: MetricPoint[];
  error?: string;
}
