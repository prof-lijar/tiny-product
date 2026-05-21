'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi, removeAuthToken } from '@/lib/auth';

interface SidebarItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon, active }) => {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export const DashboardSidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      removeAuthToken();
      router.push('/auth/login');
    }
  };

  const menuItems = [
    { label: 'Overview', href: '/dashboard', active: true },
    { label: 'Cycle Time', href: '/dashboard/cycle-time' },
    { label: 'Lead Time', href: '/dashboard/lead-time' },
    { label: 'Failure Rate', href: '/dashboard/failure-rate' },
    { label: 'Restore Time', href: '/dashboard/restore-time' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col p-4 sticky top-0">
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          DP
        </div>
        <span className="text-white font-bold text-lg tracking-tight">DevPulse</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.label} 
            {...item} 
            icon={<div className="w-4 h-4 rounded-sm bg-slate-700" />} 
          />
        ))}
      </nav>

      <div className="mt-auto p-3 bg-slate-900 rounded-xl border border-slate-800">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs text-slate-500 mb-1">Logged in as</p>
            <p className="text-sm text-slate-300 font-medium truncate">developer@devpulse.io</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left text-sm text-red-400 hover:text-red-300 font-medium transition-colors py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
