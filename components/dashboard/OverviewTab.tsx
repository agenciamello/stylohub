import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, ProgressBar } from '../ui/Primitives';
import { CircularProgress } from '../ui/CircularProgress';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';
import { useRouter } from '../../hooks/useRouter';
import { AppointmentStatus } from '../../types';

// Helper to normalize Brazilian phone numbers for WhatsApp
const normalizePhoneBR = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55') && digits.length >= 12) return digits;
  if (digits.length === 11) return `55${digits}`;
  if (digits.length === 10) return `55${digits}`;
  return digits;
};

export const OverviewTab: React.FC = () => {
  const { appointments, courses, user, clients, completeAppointment, markNoShow } = useStore();
  const { push } = useRouter();
  const [showHeroCard, setShowHeroCard] = useState(true);
  
  // No Show Modal State
  const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false);

  // Logic for "Next Client"
  const nextClient = useMemo(() => {
    return appointments
      .filter(a => a.status === AppointmentStatus.CONFIRMED || a.status === AppointmentStatus.PENDING)
      .sort((a, b) => a.time.localeCompare(b.time))[0];
  }, [appointments]);

  // Re-open card if a new client appears (e.g. via real-time sync)
  useEffect(() => {
    if (nextClient) {
      setShowHeroCard(true);
    }
  }, [nextClient]);

  // Logic for "Daily Stats"
  const completedToday = appointments.filter(a => a.status === AppointmentStatus.COMPLETED).length;
  const totalToday = appointments.length;
  const progressPercentage = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100);
  
  const estimatedRevenue = appointments
    .filter(a => a.status === AppointmentStatus.COMPLETED)
    .reduce((sum, a) => sum + a.price, 0);

  // Logic for Last Course
  const lastCourse = courses.find(c => c.progress > 0 && c.progress < 100) || courses[0];

  // Actions
  const handleWhatsAppContact = () => {
    if (!nextClient) return;
    
    const client = clients.find(c => c.name.toLowerCase() === nextClient.clientName.toLowerCase());
    const phone = client?.phone || '';
    const normalizedPhone = normalizePhoneBR(phone);
    
    const message = `Olá ${nextClient.clientName}, sentimos sua falta hoje! Gostaria de reagendar seu horário no StyloHub?`;
    
    if (normalizedPhone) {
        window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`, '_blank');
        setIsNoShowModalOpen(false); // Close modal after action
    } else {
        alert("Telefone do cliente não encontrado ou inválido.");
    }
  };

  const handleConfirmNoShow = () => {
      if (nextClient) {
          markNoShow(nextClient.id);
          setIsNoShowModalOpen(false);
          setShowHeroCard(false); // Hide card temporarily as this appt is gone
      }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Next Client - Hero Card */}
        {showHeroCard && (
          <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-amber-400 to-amber-600 border-none shadow-amber-500/20 relative group">
            {!nextClient && (
               <button 
                 onClick={() => setShowHeroCard(false)}
                 className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-black/70 hover:text-black transition-colors z-20"
                 aria-label="Fechar aviso"
               >
                 <Icons.X className="w-4 h-4" />
               </button>
            )}

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge className="bg-black/20 text-black border-none backdrop-blur-sm">Próximo Cliente</Badge>
                <div className="p-2 bg-white/20 rounded-full">
                  <Icons.Scissors className="w-5 h-5 text-black" />
                </div>
              </div>
              <CardTitle className="text-black text-3xl mt-2">{nextClient?.time || "--:--"}</CardTitle>
            </CardHeader>
            <CardContent>
              {nextClient ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={nextClient.avatarUrl} alt={nextClient.clientName} className="w-12 h-12 rounded-full border-2 border-black/10" />
                    <div>
                      <p className="font-bold text-black text-lg leading-none">{nextClient.clientName}</p>
                      <p className="text-black/70 font-medium text-sm">{nextClient.service}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                        onClick={() => completeAppointment(nextClient.id)}
                        className="w-full bg-black text-white hover:bg-black/80 border-none h-12 text-sm shadow-lg"
                    >
                        Concluir (+50 XP)
                    </Button>
                    <Button 
                        onClick={() => setIsNoShowModalOpen(true)}
                        className="w-full bg-white/20 text-black hover:bg-white/30 border-none h-12 text-sm"
                    >
                        Faltou
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-black/60 font-medium py-4">Nenhum cliente agendado para agora.</div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 2. Daily Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-100">
              <Icons.LayoutDashboard className="w-5 h-5 text-amber-500" />
              Seu Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
             <div className="text-center space-y-1">
                <p className="text-zinc-400 text-sm">Atendimentos</p>
                <p className="text-2xl font-bold text-white">{completedToday}/{totalToday}</p>
             </div>
             <CircularProgress percentage={progressPercentage} size={110} strokeWidth={10} color="text-amber-500">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-white">{progressPercentage}%</span>
                </div>
             </CircularProgress>
             <div className="text-center space-y-1">
                <p className="text-zinc-400 text-sm">Faturamento</p>
                <p className="text-2xl font-bold text-emerald-400">R$ {estimatedRevenue}</p>
             </div>
          </CardContent>
        </Card>

        {/* 3. Quick Stats / Profile Summary */}
        <Card className="hidden md:block">
          <CardHeader>
             <CardTitle className="text-zinc-100">Perfil & Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">XP Total</span>
              <span className="text-amber-400 font-mono font-bold text-lg">{user.xp} XP</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Nível Atual</span>
                <span>Próximo Nível</span>
              </div>
              <ProgressBar value={user.xp} max={user.nextLevelXp} />
              <p className="text-xs text-center text-zinc-500 pt-1">
                Faltam {user.nextLevelXp - user.xp} XP para subir
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
               <div className="bg-zinc-800/50 rounded-lg p-3 text-center border border-zinc-800">
                  <Icons.Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-300 block">3 Certificados</span>
               </div>
               <div className="bg-zinc-800/50 rounded-lg p-3 text-center border border-zinc-800">
                  <Icons.Play className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <span className="text-xs text-zinc-300 block">2 Cursos Ativos</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Icons.Play className="w-5 h-5 text-amber-500" />
               Continue de onde parou
             </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden group cursor-pointer" onClick={() => push(`/cursos/${lastCourse.id}`)}>
                <img src={lastCourse.thumbnail} alt={lastCourse.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icons.Play className="w-10 h-10 text-white fill-current" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3">
                <div>
                  <Badge variant="gold" className="mb-2">{lastCourse.category}</Badge>
                  <h4 className="text-lg font-medium text-white">{lastCourse.title}</h4>
                  <p className="text-zinc-400 text-sm">Instrutor: {lastCourse.instructor}</p>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs text-zinc-500">
                     <span>Progresso do Módulo</span>
                     <span>{lastCourse.progress}%</span>
                   </div>
                   <ProgressBar value={lastCourse.progress} />
                </div>
                <Button variant="outline" size="sm" className="self-start mt-2" onClick={() => push(`/cursos/${lastCourse.id}`)}>
                  Continuar Curso
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Horizontal Scroll Area (Small inside grid for this layout, or separate) */}
        <div className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 px-1">Recomendados para você</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
            {courses.map(course => (
              <Card key={course.id} className="min-w-[280px] snap-center border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900">
                <div className="h-32 overflow-hidden">
                   <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2">{course.category}</Badge>
                  <h5 className="font-medium text-white truncate">{course.title}</h5>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-zinc-500">{course.duration}</span>
                    <Button variant="ghost" size="sm" className="h-8 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 p-0 px-2">
                       Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* NO SHOW CONFIRMATION MODAL */}
      {isNoShowModalOpen && nextClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
                  <CardHeader className="border-b border-zinc-800 pb-4">
                      <CardTitle className="text-white">Confirmar Falta</CardTitle>
                      <p className="text-zinc-400 text-sm mt-1">O cliente não compareceu?</p>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                      
                      {(() => {
                          const client = clients.find(c => c.name.toLowerCase() === nextClient.clientName.toLowerCase());
                          const hasPhone = !!(client?.phone && normalizePhoneBR(client.phone));

                          return (
                              <>
                                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-800">
                                      <p className="text-white font-medium">{nextClient.clientName}</p>
                                      <p className="text-zinc-500 text-sm">{nextClient.time} - {nextClient.service}</p>
                                  </div>

                                  <div className="grid gap-3">
                                      <Button 
                                          className={`w-full ${hasPhone ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
                                          onClick={handleWhatsAppContact}
                                          disabled={!hasPhone}
                                      >
                                          <Icons.MessageCircle className="w-4 h-4 mr-2" />
                                          {hasPhone ? 'Enviar WhatsApp para remarcar' : 'Telefone não disponível'}
                                      </Button>

                                      <Button 
                                          className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-900/50"
                                          onClick={handleConfirmNoShow}
                                      >
                                          Marcar como Falta (NO_SHOW)
                                      </Button>
                                  </div>

                                  <Button variant="ghost" className="w-full mt-2" onClick={() => setIsNoShowModalOpen(false)}>
                                      Cancelar
                                  </Button>
                              </>
                          );
                      })()}
                  </CardContent>
              </Card>
          </div>
      )}

    </div>
  );
};