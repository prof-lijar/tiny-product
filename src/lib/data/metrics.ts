import fs from 'fs/promises';
import path from 'path';
import { ProductivityMetrics } from '@/types/metrics';

const DATA_PATH = path.join(process.cwd(), 'data', 'metrics.json');

export async function getMetrics(): Promise<ProductivityMetrics> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    // Return default metrics if file doesn't exist
    return {
      cycleTime: [],
      leadTime: [],
      changeFailureRate: [],
      timeToRestore: [],
      workDistribution: [],
    };
  }
}

export async function saveMetrics(metrics: ProductivityMetrics): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(metrics, null, 2));
}
