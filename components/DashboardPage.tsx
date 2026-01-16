import React, { useState, useEffect } from 'react';
import { useStore, DashboardTab } from '../store/useStore';
import { Badge, Button } from './ui/Primitives';
import { Icons } from './ui/Icons';
import { OverviewTab } from './dashboard/OverviewTab';
import { ScheduleTab } from './dashboard/ScheduleTab';
import { FinanceTab } from './dashboard/FinanceTab';
import { AcademyTab } from './dashboard/AcademyTab';
import { ProfileTab } from './dashboard/ProfileTab';
import { ClientsTab } from './dashboard/ClientsTab';
import { CertificatesTab } from './dashboard/CertificatesTab';
import { PrivacyTab } from './dashboard/PrivacyTab';

export const DashboardPage: React.FC = () => {
  const { user, logout, notifications, clearAllNotifications, processDueJobs, dashboardTab, setDashboardTab } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Job Processor Timer (Mocking the backend cron job)
  useEffect(() => {
    const interval = setInterval(() => {
        processDueJobs();
    }, 10000); // Check every 10 seconds for demo
    return () => clearInterval(interval);
  }, [processDueJobs]);

  const tabs: { id: DashboardTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Início', icon: Icons.LayoutDashboard }, 
    { id: 'academy', label: 'Academy', icon: Icons.GraduationCap },
    { id: 'schedule', label: 'Agenda', icon: Icons.Calendar },
    { id: 'clients', label: 'Clientes', icon: Icons.Users },
    { id: 'finance', label: 'Caixa', icon: Icons.DollarSign }, 
    { id: 'profile', label: 'Perfil', icon: Icons.User },
  ];

  // Mobile Bottom Nav Items (Specific subset as requested)
  const mobileTabs: { id: DashboardTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Início', icon: Icons.LayoutDashboard }, 
    { id: 'academy', label: 'Academy', icon: Icons.GraduationCap },
    { id: 'schedule', label: 'Agenda', icon: Icons.Calendar },
    { id: 'clients', label: 'Clientes', icon: Icons.Users },
    { id: 'finance', label: 'Caixa', icon: Icons.DollarSign }, 
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background relative text-foreground pb-[calc(80px+env(safe-area-inset-bottom))] md:pb-12">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Header - Sticky Top containing User Info AND Navigation */}
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-background/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Row: User Info & Actions */}
          <div className="px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
            
            {/* Clickable User Profile Area */}
            <button 
              onClick={() => setDashboardTab('profile')}
              className="flex items-center gap-3 md:gap-4 text-left hover:opacity-80 transition-opacity group"
              aria-label="Abrir perfil"
            >
              <img 
                src={user.avatarUrl} 
                alt="User" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-700 group-hover:border-amber-500/50 transition-colors" 
              />
              <div>
                <h1 className="text-sm md:text-lg font-semibold text-white leading-tight">
                  Bem-vindo, <span className="text-amber-500">{user.firstName}</span>!
                </h1>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-400">
                  <Icons.Award className="w-3 h-3 text-amber-500" />
                  <span>{user.level}</span>
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2 md:gap-4">
               <Badge variant="gold" className="hidden md:flex py-1 px-3">
                 {user.xp} XP
               </Badge>
               {/* Mobile XP Badge (Compact) */}
               <Badge variant="gold" className="md:hidden py-0.5 px-2 text-[10px]">
                 {user.xp} XP
               </Badge>

               {/* Notifications Bell */}
               <div className="relative">
                  <Button size="icon" variant="ghost" onClick={() => setIsNotifOpen(!isNotifOpen)} className="w-8 h-8 md:w-10 md:h-10">
                      <div className="relative">
                          <Icons.Bell className="w-4 h-4 md:w-5 md:h-5 text-zinc-400" />
                          {unreadCount > 0 && (
                              <span className="absolute -top-1 -right-1 w-2 md:w-2.5 h-2 md:h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
                          )}
                      </div>
                  </Button>
                  {isNotifOpen && (
                      <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
                          <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
                              <h3 className="text-sm font-semibold text-white">Notificações</h3>
                              {notifications.length > 0 && (
                                  <button onClick={clearAllNotifications} className="text-xs text-zinc-500 hover:text-white">Limpar tudo</button>
                              )}
                          </div>
                          <div className="max-h-80 overflow-y-auto">
                              {notifications.length === 0 ? (
                                  <div className="p-8 text-center text-zinc-500 text-sm">Nenhuma notificação nova.</div>
                              ) : (
                                  notifications.map(notif => (
                                      <div key={notif.id} className="p-3 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                                          <div className="flex items-start gap-3">
                                              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.type === 'warning' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                              <div>
                                                  <p className="text-sm font-medium text-white">{notif.title}</p>
                                                  <p className="text-xs text-zinc-400 mt-0.5">{notif.message}</p>
                                                  <p className="text-[10px] text-zinc-600 mt-2">Agora mesmo</p>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              )}
                          </div>
                      </div>
                      </>
                  )}
               </div>

               {/* User Menu */}
               <div className="relative">
                 <Button size="icon" variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-8 h-8 md:w-10 md:h-10">
                   <Icons.MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
                 </Button>
                 {isMenuOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
                     <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 py-1">
                       <button 
                         onClick={() => { logout(); setIsMenuOpen(false); }}
                         className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                       >
                         <Icons.LogOut className="w-4 h-4" />
                         Sair da conta
                       </button>
                     </div>
                   </>
                 )}
               </div>
            </div>
          </div>

          {/* Bottom Row: Navigation (Desktop Only) */}
          <div className="hidden md:block px-4 sm:px-6 lg:px-8 overflow-x-auto hide-scrollbar border-t border-zinc-800/50 md:border-none bg-background/50 md:bg-transparent">
            <nav className="flex gap-4 md:gap-6">
              {tabs.map((tab) => {
                 const Icon = tab.icon;
                 const isActive = dashboardTab === tab.id;
                 return (
                   <button
                     key={tab.id}
                     onClick={() => setDashboardTab(tab.id as any)}
                     className={`flex items-center gap-2 py-3 md:py-4 border-b-2 transition-all text-sm font-medium whitespace-nowrap ${
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

        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {dashboardTab === 'overview' && <OverviewTab />}
        {dashboardTab === 'schedule' && <ScheduleTab />}
        {dashboardTab === 'clients' && <ClientsTab />}
        {dashboardTab === 'finance' && <FinanceTab />}
        {dashboardTab === 'academy' && <AcademyTab />}
        {dashboardTab === 'profile' && <ProfileTab />}
        {dashboardTab === 'certificates' && <CertificatesTab />}
        {dashboardTab === 'privacy' && <PrivacyTab />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-around items-center h-16">
          {mobileTabs.map((tab) => {
             const Icon = tab.icon;
             const isActive = dashboardTab === tab.id;
             return (
               <button
                 key={tab.id}
                 onClick={() => setDashboardTab(tab.id as any)}
                 className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                   isActive ? 'text-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                 }`}
               >
                 <Icon className={`w-5 h-5 ${isActive ? 'fill-amber-500/20 stroke-[2.5px]' : ''}`} />
                 <span className="text-[10px] font-medium leading-none">{tab.label}</span>
               </button>
             )
          })}
        </div>
      </nav>

    </div>
  );
};