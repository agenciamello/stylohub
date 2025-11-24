import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '@/dashboard/components/ui/Primitives';
import { Icons } from '@/dashboard/components/ui/Icons';
import { useStore } from '@/dashboard/store/useStore';

export const ProfileTab: React.FC = () => {
  const { user } = useStore();
  
  // Local state for form (mocking edit functionality)
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio || 'Barbeiro',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would call an action to update the store/backend
    alert("Informações salvas com sucesso! (Simulação)");
  };

  // Generate stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icons.Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-zinc-600'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <Card className="text-center border-zinc-800 bg-zinc-900/50">
            <CardContent className="pt-8 pb-8 flex flex-col items-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-800 overflow-hidden">
                  <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 bg-zinc-800 p-2 rounded-full text-zinc-300 group-hover:bg-amber-500 group-hover:text-black transition-colors shadow-lg border border-zinc-950">
                  <Icons.Camera className="w-4 h-4" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-1">{user.firstName} {user.lastName}</h2>
              <Badge variant="gold" className="mb-3">{user.level}</Badge>
              
              <p className="text-zinc-400 text-sm max-w-[200px] italic mb-4">
                "{user.bio}"
              </p>

              <div className="flex items-center gap-1 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                <span className="text-white font-bold">{user.rating}</span>
                <div className="flex">
                  {renderStars(user.rating || 0)}
                </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-zinc-800 flex justify-between px-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-amber-500">{user.xp}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">XP Total</span>
                </div>
                <div className="text-center">
                   {/* Mocking completed courses count for now */}
                  <span className="block text-2xl font-bold text-amber-500">5</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Cursos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card Mobile Only or Extra info */}
          <Card className="bg-gradient-to-r from-zinc-900 to-zinc-800 border-l-4 border-l-amber-500">
             <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-xs font-medium">Próximo Nível</p>
                  <p className="text-white font-bold">Lenda da Navalha</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 text-xs">Faltam {user.nextLevelXp - user.xp} XP</p>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit & Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Edit Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.User className="w-5 h-5 text-amber-500" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Nome" 
                  name="firstName"
                  value={formData.firstName} 
                  onChange={handleChange}
                />
                <Input 
                  label="Sobrenome" 
                  name="lastName"
                  value={formData.lastName} 
                  onChange={handleChange}
                />
              </div>
              
              <Input 
                label="Bio (Frase curta)" 
                name="bio"
                value={formData.bio} 
                onChange={handleChange}
                placeholder="Ex: Barbeiro a 5 anos..."
              />

              <div className="space-y-2">
                 <label className="text-sm font-medium text-zinc-400">Email</label>
                 <div className="relative">
                   <Icons.Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                   <input
                      className="flex h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 pl-10 pr-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                   />
                 </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="gold" onClick={handleSave}>
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.Settings className="w-5 h-5 text-zinc-400" />
                Configurações do Aplicativo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left">
                   <span className="text-zinc-300 font-medium">Notificações</span>
                   <div className="w-10 h-5 bg-amber-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                   </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left">
                   <span className="text-zinc-300 font-medium">Tema Escuro</span>
                   <span className="text-zinc-500 text-sm">Ativado</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-left">
                   <span className="text-zinc-300 font-medium">Privacidade e Segurança</span>
                   <Icons.Settings className="w-4 h-4 text-zinc-500" />
                </button>
                 <button className="w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-colors text-left group">
                   <span className="text-red-400 font-medium group-hover:text-red-500">Sair da Conta</span>
                   <Icons.LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                </button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};