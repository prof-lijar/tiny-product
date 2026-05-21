export interface DashboardWidgetConfig {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isEnabled: boolean;
}

export interface DashboardConfig {
  widgets: DashboardWidgetConfig[];
}

export interface UserDashboardConfig extends DashboardConfig {
  userId: string;
  updatedAt: string;
}

export interface DashboardConfigsStore {
  configs: UserDashboardConfig[];
}
