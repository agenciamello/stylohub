"use client";

import React, { useState } from 'react';
import { useStore } from '@/dashboard/store/useStore';
import { Badge, Button } from '@/dashboard/components/ui/Primitives';
import { Icons } from '@/dashboard/components/ui/Icons';
import { OverviewTab } from '@/dashboard/components/dashboard/OverviewTab';
import { ScheduleTab } from '@/dashboard/components/dashboard/ScheduleTab';
import { FinanceTab } from '@/dashboard/components/dashboard/FinanceTab';
import { AcademyTab } from '@/dashboard/components/dashboard/AcademyTab';
import { ProfileTab } from '@/dashboard/components/dashboard/ProfileTab';

export const DashboardPage: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'finance' | 'academy' | 'profile'>('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Icons.LayoutDashboard },
    { id: 'academy', label: 'Academy', icon: Icons.GraduationCap },
    { id: 'schedule', label: 'Agenda', icon: Icons.Calendar },
    { id: 'finance', label: 'Financeiro', icon: Icons.DollarSign },
    { id: 'profile', label: 'Perfil', icon: Icons.User },
  ];

  return (
    <div className="min-h-screen bg-background relative text-foreground pb-24 md:pb-12">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={user.avatarUrl} alt="User" className="w-10 h-10 rounded-full border border-zinc-700" />
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight">
                Bem-vindo de volta, <span className="text-amber-500">{user.firstName}</span>!
              </h1>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icons.Award className="w-3 h-3 text-amber-500" />
                <span>{user.level}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <Badge variant="gold" className="py-1 px-3">
               {user.xp} XP
             </Badge>
             <Button size="icon" variant="ghost">
               <Icons.MoreVertical className="w-5 h-5" />
             </Button>
          </div>
        </div>

        {/* Desktop Navigation (Top Tabs) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`flex items-center gap-2 py-4 border-b-2 transition-all text-sm font-medium whitespace-nowrap ${
                     isActive 
                       ? 'border-amber-500 text-amber-500' 
                       : 'border-transparent text-zinc-400 hover:text-zinc-200'
                   }`}
                 >
                   <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                   {tab.label}
                 </button>
               )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'finance' && <FinanceTab />}
        {activeTab === 'academy' && <AcademyTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 z-50 pb-safe safe-area-pb">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map((tab) => {
             const Icon = tab.icon;
             const isActive = activeTab === tab.id;
             return (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                   isActive ? 'text-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                 }`}
               >
                 <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-amber-500/10' : ''}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                 </div>
                 <span className="text-[10px] font-medium">{tab.label}</span>
               </button>
             )
          })}
        </div>
      </nav>

    </div>
  );
};