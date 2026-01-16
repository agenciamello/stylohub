import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';

export const ClientsTab: React.FC = () => {
  const { clients, addClient } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClientId, setExpandedClientId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const toggleExpand = (id: string) => {
    setExpandedClientId(expandedClientId === id ? null : id);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName && newClientPhone) {
      addClient({ name: newClientName, phone: newClientPhone });
      setNewClientName('');
      setNewClientPhone('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-white">Meus Clientes</h2>
           <p className="text-zinc-400 text-sm">Gerencie o histórico e preferências.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
               <Icons.Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
               <Input 
                 placeholder="Buscar por nome..." 
                 className="pl-10"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Button variant="gold" onClick={() => setIsModalOpen(true)}>
                <Icons.Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Novo Cliente</span>
                <span className="sm:hidden">Novo</span>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <Card key={client.id} className="group hover:border-zinc-700 transition-all cursor-pointer" onClick={() => toggleExpand(client.id)}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-4">
                  <img src={client.avatarUrl} alt={client.name} className="w-14 h-14 rounded-full border border-zinc-700 object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="font-bold text-lg text-white">{client.name}</h3>
                          <p className="text-zinc-500 text-sm flex items-center gap-1 mt-0.5">
                            <Icons.Phone className="w-3 h-3" />
                            {client.phone}
                          </p>
                       </div>
                       <Badge variant={client.totalVisits > 10 ? 'gold' : 'default'}>
                         {client.totalVisits > 10 ? 'Fiel' : 'Novo'}
                       </Badge>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedClientId === client.id && (
                  <div className="mt-6 pt-4 border-t border-zinc-800 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-300 mb-2">Preferências & Notas</h4>
                          <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 text-sm text-zinc-400 italic">
                             "{client.notes || 'Nenhuma nota registrada.'}"
                          </div>
                          <div className="mt-4 flex gap-2">
                             <Button size="sm" variant="outline" className="flex-1">Editar Nota</Button>
                             <Button size="sm" variant="gold" className="flex-1">Novo Agendamento</Button>
                          </div>
                        </div>
                        <div>
                           <h4 className="text-sm font-semibold text-zinc-300 mb-2">Últimas Visitas</h4>
                           {client.history.length > 0 ? (
                             <div className="space-y-2">
                               {client.history.map((visit, idx) => (
                                 <div key={idx} className="flex justify-between text-sm p-2 bg-zinc-900 rounded border border-zinc-800/50">
                                    <span className="text-zinc-400">{visit.date}</span>
                                    <span className="text-white">{visit.service}</span>
                                    <span className="text-emerald-500">R$ {visit.price}</span>
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <p className="text-sm text-zinc-500 italic">Sem histórico.</p>
                           )}
                           <div className="mt-2 text-right">
                              <span className="text-xs text-zinc-500">Total gasto: </span>
                              <span className="text-sm font-bold text-emerald-400">R$ {client.totalSpent}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-500 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
             <Icons.Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
             <p>Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-zinc-800">
                    <CardTitle>Novo Cliente</CardTitle>
                    <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                        <Icons.X className="w-5 h-5" />
                    </button>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleAddClient} className="space-y-4">
                        <Input 
                            label="Nome Completo"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                            required
                            placeholder="Ex: Carlos Silva"
                        />
                        <Input 
                            label="Telefone / WhatsApp"
                            value={newClientPhone}
                            onChange={(e) => setNewClientPhone(e.target.value)}
                            required
                            placeholder="(00) 00000-0000"
                        />
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button type="submit" variant="gold">Salvar Cliente</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
};