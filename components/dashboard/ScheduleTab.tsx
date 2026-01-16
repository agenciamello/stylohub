import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';
import { AppointmentStatus } from '../../types';

// Helper to normalize Brazilian phone numbers for WhatsApp
const normalizePhoneBR = (phone: string): string => {
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // If empty, return empty
  if (!digits) return '';

  // If starts with 55 and is long enough (12 or 13 digits), assume it's already correct
  if (digits.startsWith('55') && digits.length >= 12) {
      return digits;
  }
  
  // If it's a standard mobile w/ DDD (11 digits: 11 99999 9999)
  if (digits.length === 11) {
      return `55${digits}`;
  }
  
  // If it's a standard landline w/ DDD (10 digits)
  if (digits.length === 10) {
      return `55${digits}`;
  }

  // Fallback: return as is
  return digits;
};

export const ScheduleTab: React.FC = () => {
  const { appointments, clients, createAppointment, confirmAppointment, completeAppointment, markNoShow, cancelAppointment } = useStore();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noShowCandidateId, setNoShowCandidateId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    service: 'Corte Degradê',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    price: 45,
    cancellationAccepted: false
  });

  const sortedAppointments = [...appointments].sort((a, b) => {
      // Simple sort by time for today (simplified)
      return a.time.localeCompare(b.time);
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointment(formData);
    setIsModalOpen(false);
    // Reset form mostly
    setFormData(prev => ({ ...prev, clientName: '', time: '09:00', cancellationAccepted: false }));
  };

  const handleWhatsAppContact = (clientName: string) => {
    const client = clients.find(c => c.name.toLowerCase() === clientName.toLowerCase());
    const phone = client?.phone || '';
    const normalizedPhone = normalizePhoneBR(phone);
    
    // Default message for remarketing/recovery
    const message = `Olá ${clientName}, sentimos sua falta hoje! Gostaria de reagendar seu horário no StyloHub?`;
    
    if (normalizedPhone) {
        window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        alert("Telefone do cliente não encontrado ou inválido.");
    }
  };

  const handleMarkNoShow = (id: string) => {
      markNoShow(id);
      setNoShowCandidateId(null);
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case AppointmentStatus.SCHEDULED: return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case AppointmentStatus.PENDING: return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case AppointmentStatus.COMPLETED: return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
      case AppointmentStatus.NO_SHOW: return "text-red-400 bg-red-400/10 border-red-400/20";
      case AppointmentStatus.CANCELLED: return "text-zinc-600 bg-zinc-800 border-zinc-700";
      default: return "text-zinc-400";
    }
  };

  const needsConfirmation = (time: string, status: AppointmentStatus) => {
    // Simple logic: if scheduled and "now" is close to time (mock logic)
    // In real app, check if (ApptTime - Now) < 2 hours
    return status === AppointmentStatus.SCHEDULED || status === AppointmentStatus.PENDING;
  };

  return (
    <div className="space-y-6 animate-slide-in relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-white">Agenda</h2>
           <p className="text-zinc-400 text-sm">Gerencie seus atendimentos do dia.</p>
        </div>
        {/* Desktop Create Button */}
        <div className="hidden md:block">
            <Button variant="gold" onClick={() => setIsModalOpen(true)}>
            <Icons.Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
            </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedAppointments.map((apt) => {
          // Check if client has phone number
          const client = clients.find(c => c.name.toLowerCase() === apt.clientName.toLowerCase());
          const hasPhone = !!(client?.phone && normalizePhoneBR(client.phone));

          return (
            <Card key={apt.id} className={`group transition-all hover:border-zinc-600 ${apt.status === AppointmentStatus.COMPLETED || apt.status === AppointmentStatus.CANCELLED ? 'opacity-60 bg-zinc-900/30' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center p-4 md:p-6 gap-4">
                
                {/* Time Box */}
                <div className="flex flex-col items-center justify-center min-w-[80px] p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="text-xl font-bold text-white">{apt.time}</span>
                  <span className="text-xs text-zinc-500">{apt.duration} min</span>
                </div>

                {/* Client Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                      <img src={apt.avatarUrl} alt={apt.clientName} className="w-10 h-10 rounded-full border border-zinc-700" />
                      <div>
                          <h3 className={`font-semibold text-lg leading-tight ${apt.status === AppointmentStatus.CANCELLED ? 'line-through text-zinc-500' : 'text-white'}`}>
                              {apt.clientName}
                          </h3>
                          <p className="text-zinc-400 text-sm flex items-center gap-2">
                              <Icons.Scissors className="w-3 h-3" />
                              {apt.service}
                          </p>
                      </div>
                  </div>
                  
                  {/* Warnings */}
                  {needsConfirmation(apt.time, apt.status) && apt.status !== AppointmentStatus.CANCELLED && (
                    <div className="mt-2 text-xs text-amber-500 flex items-center gap-1 font-medium bg-amber-500/10 w-fit px-2 py-1 rounded">
                        <Icons.Clock className="w-3 h-3" />
                        Precisa confirmar
                    </div>
                  )}
                  {apt.status === AppointmentStatus.NO_SHOW && (
                    <div className="mt-2 text-xs text-red-400 font-medium">Cliente não compareceu.</div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-end gap-3 ml-auto w-full md:w-auto">
                  <div className="flex items-center justify-between w-full md:w-auto gap-4">
                      <span className="text-sm font-mono text-zinc-300">R$ {apt.price},00</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                          {apt.status}
                      </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap justify-end">
                      
                      {/* CONFIRM BUTTON */}
                      {(apt.status === AppointmentStatus.SCHEDULED || apt.status === AppointmentStatus.PENDING) && (
                          <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={() => confirmAppointment(apt.id)}>
                              Confirmar
                          </Button>
                      )}

                      {/* COMPLETE BUTTON */}
                      {apt.status === AppointmentStatus.CONFIRMED && (
                          <Button size="sm" variant="gold" className="h-8" onClick={() => completeAppointment(apt.id)}>
                              <Icons.CheckCircle className="w-3 h-3 mr-1" /> Concluir
                          </Button>
                      )}

                      {/* RECOVERY ACTION FOR NO SHOW */}
                      {apt.status === AppointmentStatus.NO_SHOW && (
                          <div className="relative group/tooltip">
                            <Button 
                              size="sm" 
                              className={`h-8 border-none ${hasPhone ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed hover:bg-zinc-800'}`} 
                              onClick={() => hasPhone && handleWhatsAppContact(apt.clientName)}
                              disabled={!hasPhone}
                            >
                              <Icons.MessageCircle className="w-3 h-3 mr-2" />
                              Enviar WhatsApp
                            </Button>
                            {!hasPhone && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-zinc-900 border border-zinc-700 rounded shadow-xl text-xs text-zinc-300 text-center opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                Cadastre o telefone do cliente para enviar mensagem.
                              </div>
                            )}
                          </div>
                      )}

                      {/* NO SHOW & CANCEL */}
                      {(apt.status !== AppointmentStatus.COMPLETED && apt.status !== AppointmentStatus.CANCELLED && apt.status !== AppointmentStatus.NO_SHOW) && (
                          <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-red-400 border-red-900/30 hover:bg-red-900/20" 
                                onClick={() => setNoShowCandidateId(apt.id)}
                              >
                                  Faltou
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 text-zinc-500" onClick={() => cancelAppointment(apt.id)}>
                                  <Icons.X className="w-3 h-3" />
                              </Button>
                          </>
                      )}
                  </div>
                </div>

              </div>
            </Card>
          );
        })}

        {sortedAppointments.length === 0 && (
           <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
             <Icons.Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
             <p>Nenhum agendamento para hoje.</p>
           </div>
        )}
      </div>

      {/* MOBILE FAB (Floating Action Button) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-50 w-14 h-14 bg-amber-500 hover:bg-amber-400 text-zinc-900 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center transition-transform active:scale-95"
        aria-label="Novo Agendamento"
      >
        <Icons.Plus className="w-7 h-7" />
      </button>

      {/* NO SHOW CONFIRMATION MODAL */}
      {noShowCandidateId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
                  <CardHeader className="border-b border-zinc-800 pb-4">
                      <CardTitle className="text-white">Confirmar Falta</CardTitle>
                      <p className="text-zinc-400 text-sm mt-1">O cliente não compareceu ao horário?</p>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                      
                      {(() => {
                          const candidate = appointments.find(a => a.id === noShowCandidateId);
                          const client = clients.find(c => c.name.toLowerCase() === candidate?.clientName.toLowerCase());
                          const hasPhone = !!(client?.phone && normalizePhoneBR(client.phone));

                          return (
                              <>
                                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-800">
                                      <p className="text-white font-medium">{candidate?.clientName}</p>
                                      <p className="text-zinc-500 text-sm">{candidate?.time} - {candidate?.service}</p>
                                  </div>

                                  <div className="grid gap-3">
                                      <Button 
                                          className={`w-full ${hasPhone ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
                                          onClick={() => {
                                              if(hasPhone && candidate) {
                                                  handleWhatsAppContact(candidate.clientName);
                                                  setNoShowCandidateId(null);
                                              }
                                          }}
                                          disabled={!hasPhone}
                                      >
                                          <Icons.MessageCircle className="w-4 h-4 mr-2" />
                                          {hasPhone ? 'Enviar WhatsApp para remarcar' : 'Telefone não disponível'}
                                      </Button>

                                      <Button 
                                          className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-900/50"
                                          onClick={() => handleMarkNoShow(noShowCandidateId)}
                                      >
                                          Marcar como Falta (NO_SHOW)
                                      </Button>
                                  </div>

                                  <Button variant="ghost" className="w-full mt-2" onClick={() => setNoShowCandidateId(null)}>
                                      Cancelar
                                  </Button>
                              </>
                          );
                      })()}
                  </CardContent>
              </Card>
          </div>
      )}

      {/* NEW APPOINTMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800">
                    <CardTitle>Novo Agendamento</CardTitle>
                    <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                        <Icons.X className="w-5 h-5" />
                    </button>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleCreate} className="space-y-4">
                        
                        {/* Client Selection (Simple datalist for demo) */}
                        <div className="space-y-2">
                           <label className="text-sm font-medium text-zinc-400">Cliente</label>
                           <input 
                              list="clients-list"
                              className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500"
                              placeholder="Digite o nome do cliente..."
                              value={formData.clientName}
                              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                              required
                           />
                           <datalist id="clients-list">
                              {clients.map(c => <option key={c.id} value={c.name} />)}
                           </datalist>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Serviço</label>
                                <select 
                                   className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500"
                                   value={formData.service}
                                   onChange={(e) => setFormData({...formData, service: e.target.value})}
                                >
                                   <option value="Corte Degradê">Corte Degradê</option>
                                   <option value="Corte Simples">Corte Simples</option>
                                   <option value="Barba">Barba</option>
                                   <option value="Corte + Barba">Corte + Barba</option>
                                   <option value="Pezinho">Pezinho</option>
                                </select>
                            </div>
                            <Input 
                                label="Preço (R$)"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input 
                                label="Data"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                required
                            />
                            <Input 
                                label="Horário"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                required
                            />
                        </div>

                        {/* Policy Checkbox */}
                        <div className="bg-amber-900/20 border border-amber-900/50 rounded-lg p-4 mt-2">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input 
                                   type="checkbox" 
                                   className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-900"
                                   checked={formData.cancellationAccepted}
                                   onChange={(e) => setFormData({...formData, cancellationAccepted: e.target.checked})}
                                   required 
                                />
                                <div className="text-sm">
                                    <span className="font-semibold text-amber-500 block mb-1">Política Anti No-Show</span>
                                    <span className="text-zinc-400">
                                        Cancelamentos com menos de 2h podem ser cobrados. Confirme que informou o cliente.
                                    </span>
                                </div>
                            </label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button type="submit" variant="gold">Agendar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
};