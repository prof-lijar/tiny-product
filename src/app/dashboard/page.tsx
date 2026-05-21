import React from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { MetricCard } from '@/components/ui/MetricCard';

const MOCK_METRICS = [
  {
    title: 'Cycle Time',
    value: '4.2',
    unit: 'days',
    trend: { value: '12%', isPositive: true },
    description: 'Average time from first commit to production deployment.'
  },
  {
    title: 'Lead Time for Changes',
    value: '2.8',
    unit: 'days',
    trend: { value: '5%', isPositive: false },
    description: 'Time taken to implement a change and deliver it to production.'
  },
  {
    title: 'Change Failure Rate',
    value: '11.4',
    unit: '%',
    trend: { value: '2%', isPositive: true },
    description: 'Percentage of deployments that result in failure or need rollback.'
  },
  {
    title: 'Time to Restore Service',
    value: '1.5',
    unit: 'hours',
    trend: { value: '8%', isPositive: false },
    description: 'Average time to recover from a production incident.'
  },
];

export default function DashboardPage() {
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
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Refresh Data
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {MOCK_METRICS.map((metric) => (
            <MetricCard 
              key={metric.title} 
              {...metric} 
            />
          ))}
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
}
