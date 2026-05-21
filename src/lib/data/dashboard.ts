import fs from 'fs/promises';
import path from 'path';
import { DashboardConfigsStore, UserDashboardConfig, DashboardConfig } from '@/types/dashboard';

const DATA_PATH = path.join(process.cwd(), 'data', 'dashboard_configs.json');

export async function readDashboardConfigs(): Promise<DashboardConfigsStore> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return empty store
    return { configs: [] };
  }
}

export async function writeDashboardConfigs(store: DashboardConfigsStore): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export async function getUserDashboardConfig(userId: string): Promise<DashboardConfig | null> {
  const store = await readDashboardConfigs();
  const userConfig = store.configs.find(c => c.userId === userId);
  
  if (!userConfig) return null;
  
  return {
    widgets: userConfig.widgets
  };
}

export async function saveUserDashboardConfig(userId: string, config: DashboardConfig): Promise<void> {
  const store = await readDashboardConfigs();
  const existingIndex = store.configs.findIndex(c => c.userId === userId);
  
  const userConfig: UserDashboardConfig = {
    userId,
    widgets: config.widgets,
    updatedAt: new Date().toISOString(),
  };
  
  if (existingIndex !== -1) {
    store.configs[existingIndex] = userConfig;
  } else {
    store.configs.push(userConfig);
  }
  
  await writeDashboardConfigs(store);
}
