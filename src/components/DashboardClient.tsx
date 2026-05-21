'use client';

import React, { useEffect, useState } from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { MetricCard } from '@/components/ui/MetricCard';
import { MetricChart } from '@/components/ui/MetricChart';

interface MetricPoint {
  timestamp: string;
  value: number;
}

interface MetricData {
  name: string;
  value: number;
}

interface DashboardMetrics {
  cycleTime: {
    current: string;
    unit: string;
    trend: { value: string; isPositive: boolean };
    description: string;
    history: MetricData[];
  };
  leadTime: {
    current: string;
    unit: string;
    trend: { value: string; isPositive: boolean };
    description: string;
    history: MetricData[];
  };
  changeFailureRate: {
    current: string;
    unit: string;
    trend: { value: string; isPositive: boolean };
    description: string;
  };
  timeToRestore: {
    current: string;
    unit: string;
    trend: { value: string; isPositive: boolean };
    description: string;
  };
}

const calculateMetricSummary = (points: MetricPoint[]) => {
  if (!points || points.length === 0) {
    return {
      currentValue: '0',
      trend: { value: '0%', isPositive: false },
      history: [],
    };
  }

  const currentVal = points[points.length - 1].value;
  const prevVal = points.length > 1 ? points[points.length - 2].value : currentVal;
  
  const diff = currentVal - prevVal;
  const percentChange = prevVal !== 0 ? (diff / prevVal) * 100 : 0;
  
  const history = points.map(p => ({
    name: new Date(p.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: p.value,
  }));

  return {
    currentValue: currentVal.toFixed(1),
    trend: {
      value: `${Math.abs(percentChange).toFixed(1)}%`,
      isPositive: diff > 0,
    },
    history,
  };
};

export const DashboardClient = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const [cycleRes, leadRes] = await Promise.all([
        fetch('/api/metrics/cycle-time'),
        fetch('/api/metrics/lead-time'),
      ]);

      if (!cycleRes.ok || !leadRes.ok) {
        throw new Error('Failed to fetch metrics data');
      }

      const cycleResponse = await cycleRes.json();
      const leadResponse = await leadRes.json();

      const cycleSummary = calculateMetricSummary(cycleResponse.data || []);
      const leadSummary = calculateMetricSummary(leadResponse.data || []);

      setMetrics({
        cycleTime: {
          current: cycleSummary.currentValue,
          unit: 'days',
          trend: cycleSummary.trend,
          description: 'Average time from first commit to production deployment.',
          history: cycleSummary.history,
        },
        leadTime: {
          current: leadSummary.currentValue,
          unit: 'days',
          trend: leadSummary.trend,
          description: 'Time taken to implement a change and deliver it to production.',
          history: leadSummary.history,
        },
        // These are still mocks for now as per current state, 
        // but we'll keep them to maintain dashboard layout
        changeFailureRate: {
          current: '11.4',
          unit: '%',
          trend: { value: '2%', isPositive: true },
          description: 'Percentage of deployments that result in failure or need rollback.',
        },
        timeToRestore: {
          current: '1.5',
          unit: 'hours',
          trend: { value: '8%', isPositive: false },
          description: 'Average time to recover from a production incident.',
        },
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-lg text-rose-500 mb-4">
            Error loading dashboard data: {error}
          </div>
          <button 
            onClick={fetchMetrics}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </main>
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Engineering Dashboard</h1>
            <p className="text-slate-400">Welcome back, here is your team&apos;s productivity overview.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
              Export Report
            </button>
            <button 
              onClick={fetchMetrics}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Cycle Time" 
            value={metrics.cycleTime.current} 
            unit={metrics.cycleTime.unit} 
            trend={metrics.cycleTime.trend} 
            description={metrics.cycleTime.description} 
          />
          <MetricCard 
            title="Lead Time for Changes" 
            value={metrics.leadTime.current} 
            unit={metrics.leadTime.unit} 
            trend={metrics.leadTime.trend} 
            description={metrics.leadTime.description} 
          />
          <MetricCard 
            title="Change Failure Rate" 
            value={metrics.changeFailureRate.current} 
            unit={metrics.changeFailureRate.unit} 
            trend={metrics.changeFailureRate.trend} 
            description={metrics.changeFailureRate.description} 
          />
          <MetricCard 
            title="Time to Restore Service" 
            value={metrics.timeToRestore.current} 
            unit={metrics.timeToRestore.unit} 
            trend={metrics.timeToRestore.trend} 
            description={metrics.timeToRestore.description} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MetricChart 
            title="Cycle Time Trend" 
            data={metrics.cycleTime.history} 
            color="#3b82f6" 
          />
          <MetricChart 
            title="Lead Time Trend" 
            data={metrics.leadTime.history} 
            color="#8b5cf6" 
          />
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
                    U{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Deployment to production successful</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                  Production
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
