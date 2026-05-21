'use client';

import React, { useEffect, useState } from 'react';
import { WorkDistributionData, WorkDistributionResponse } from '@/types/metrics';

interface WorkDistributionChartProps {
  title: string;
}

export function WorkDistributionChart({ title }: WorkDistributionChartProps) {
  const [data, setData] = useState<WorkDistributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/metrics/work-distribution');
        if (!response.ok) {
          throw new Error(`Error fetching work distribution: ${response.statusText}`);
        }
        const result: WorkDistributionResponse = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }
        setData(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Loading distribution data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-2">Failed to load chart</p>
          <p className="text-slate-500 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-around gap-8">
        {/* SVG Doughnut Chart */}
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="transparent"
              stroke="#1e293b"
              strokeWidth="4"
            />
            {data.map((item, index) => {
              const percent = (item.value / total) * 100;
              const strokeDasharray = `${percent} 100`;
              const strokeDashoffset = `${cumulativePercent}%`;
              cumulativePercent += percent;

              return (
                <circle
                  key={index}
                  cx="16"
                  cy="16"
                  r="14"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="4"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-white">{total}%</span>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-slate-300">{item.category}</span>
              </div>
              <span className="text-sm font-medium text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
