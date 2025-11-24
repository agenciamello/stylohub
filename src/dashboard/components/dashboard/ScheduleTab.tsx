import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/dashboard/components/ui/Primitives';
import { Icons } from '@/dashboard/components/ui/Icons';
import { useStore } from '@/dashboard/store/useStore';
import { AppointmentStatus } from '@/types/dashboard';

export const ScheduleTab: React.FC = () => {
  const { appointments, completeAppointment } = useStore();

  const sortedAppointments = [...appointments].sort((a, b) => a.time.localeCompare(b.time));

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case AppointmentStatus.PENDING: return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case AppointmentStatus.COMPLETED: return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20 line-through opacity-70";
      default: return "text-zinc-400";
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Agenda de Hoje</h2>
        <Button variant="outline">
          <Icons.Calendar className="w-4 h-4 mr-2" />
          Ver Agenda Completa
        </Button>
      </div>

      <div className="grid gap-4">
        {sortedAppointments.map((apt) => (
          <Card key={apt.id} className={`group transition-all hover:border-zinc-600 ${apt.status === AppointmentStatus.COMPLETED ? 'opacity-60' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center p-4 md:p-6 gap-4">
              
              {/* Time Box */}
              <div className="flex flex-col items-center justify-center min-w-[80px] p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                <span className="text-xl font-bold text-white">{apt.time}</span>
                <span className="text-xs text-zinc-500">{apt.duration} min</span>
              </div>

              {/* Client Info */}
              <div className="flex-1 flex items-center gap-4">
                <img src={apt.avatarUrl} alt={apt.clientName} className="w-12 h-12 rounded-full border border-zinc-700" />
                <div>
                  <h3 className={`font-semibold text-lg ${apt.status === AppointmentStatus.COMPLETED ? 'text-zinc-500 line-through' : 'text-white'}`}>
                    {apt.clientName}
                  </h3>
                  <p className="text-zinc-400 text-sm flex items-center gap-2">
                    <Icons.Scissors className="w-3 h-3" />
                    {apt.service}
                  </p>
                </div>
              </div>

              {/* Actions & Status */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-3 ml-auto">
                 <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                    {apt.status}
                 </span>
                 <div className="flex items-center gap-2">
                   <span className="text-sm font-mono text-zinc-400 mr-2">R$ {apt.price},00</span>
                   {apt.status !== AppointmentStatus.COMPLETED && (
                     <Button 
                        size="sm" 
                        variant="gold" 
                        className="h-8"
                        onClick={() => completeAppointment(apt.id)}
                      >
                        <Icons.CheckCircle className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:inline">Concluir</span>
                     </Button>
                   )}
                 </div>
              </div>

            </div>
          </Card>
        ))}

        {sortedAppointments.length === 0 && (
           <div className="text-center py-12 text-zinc-500">
             Nenhum agendamento para hoje.
           </div>
        )}
      </div>
    </div>
  );
};