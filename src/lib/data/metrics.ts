import fs from 'fs/promises';
import path from 'path';
import { MetricPoint } from '@/types/metrics';

const METRICS_FILE_PATH = path.join(process.cwd(), 'data', 'metrics.json');

interface MetricsData {
  cycleTime: MetricPoint[];
  leadTime: MetricPoint[];
}

export async function getMetrics(): Promise<MetricsData> {
  try {
    const data = await fs.readFile(METRICS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading metrics:', error);
    throw new Error('Could not read metrics');
  }
}

export async function saveMetrics(metrics: MetricsData): Promise<void> {
  try {
    await fs.writeFile(METRICS_FILE_PATH, JSON.stringify(metrics, null, 2));
  } catch (error) {
    console.error('Error saving metrics:', error);
    throw new Error('Could not save metrics');
  }
}

export async function getCycleTimeMetrics(): Promise<MetricPoint[]> {
  const data = await getMetrics();
  return data.cycleTime;
}

export async function getLeadTimeMetrics(): Promise<MetricPoint[]> {
  const data = await getMetrics();
  return data.leadTime;
}
