'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MetricChartProps {
  data: { name: string; value: number }[];
  color: string;
  title: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({ data, color, title }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-6">{title}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
              itemStyle={{ color: color }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2} 
              dot={{ r: 4, fill: color }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
