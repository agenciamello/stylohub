import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';

export const PrivacyTab: React.FC = () => {
  const { setDashboardTab } = useStore();

  return (
    <div className="space-y-6 animate-fade-in relative">
      <button 
        onClick={() => setDashboardTab('profile')}
        className="flex items-center text-zinc-400 hover:text-white transition-colors mb-4"
      >
        <Icons.ArrowLeft className="w-4 h-4 mr-1" />
        Voltar para Perfil
      </button>

      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold text-white">Privacidade e Segurança</h2>
        <p className="text-zinc-400 text-sm">Gerencie seus dados e a segurança da sua conta StyloHub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.Lock className="w-5 h-5 text-amber-500" />
              Segurança da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
               <div>
                 <p className="text-white font-medium text-sm">Autenticação de Dois Fatores (2FA)</p>
                 <p className="text-zinc-500 text-xs mt-0.5">Adicione uma camada extra de segurança.</p>
               </div>
               <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">Em breve</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
               <div>
                 <p className="text-white font-medium text-sm">Alterar Senha</p>
                 <p className="text-zinc-500 text-xs mt-0.5">Última alteração: há 30 dias</p>
               </div>
               <Button size="sm" variant="outline">Alterar</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
               <div>
                 <p className="text-white font-medium text-sm">Dispositivos Conectados</p>
                 <p className="text-zinc-500 text-xs mt-0.5">Chrome em Windows (Atual)</p>
               </div>
               <Button size="sm" variant="ghost" className="text-zinc-400">Ver todos</Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Privacy */}
        <Card className="md:col-span-1">
          <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Icons.User className="w-5 h-5 text-amber-500" />
               Dados e Privacidade
             </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-zinc-300 text-sm">Visibilidade do Perfil</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-500 font-medium">Público</span>
                  <div className="w-10 h-5 bg-emerald-500/20 border border-emerald-500/50 rounded-full relative cursor-pointer">
                     <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-sm"></div>
                  </div>
               </div>
            </div>
            <p className="text-xs text-zinc-500 mb-4 pb-4 border-b border-zinc-800">
               Seu perfil aparece para clientes na busca do StyloHub.
            </p>

            <div className="space-y-3">
               <h4 className="text-sm font-semibold text-white">Termos Legais</h4>
               <a href="#" className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors flex items-center justify-between p-2 hover:bg-zinc-900 rounded">
                  Termos de Uso
                  <Icons.ArrowRight className="w-4 h-4" />
               </a>
               <a href="#" className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors flex items-center justify-between p-2 hover:bg-zinc-900 rounded">
                  Política de Privacidade
                  <Icons.ArrowRight className="w-4 h-4" />
               </a>
               <a href="#" className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors flex items-center justify-between p-2 hover:bg-zinc-900 rounded">
                  Diretrizes da Comunidade
                  <Icons.ArrowRight className="w-4 h-4" />
               </a>
            </div>
          </CardContent>
        </Card>

        {/* Delete Account Area */}
        <Card className="md:col-span-2 border-red-900/30 bg-red-950/10">
           <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
              <div>
                 <h4 className="text-red-400 font-semibold mb-1">Zona de Perigo</h4>
                 <p className="text-zinc-400 text-sm">
                    Excluir sua conta é uma ação permanente e não pode ser desfeita. Todos os seus dados serão perdidos.
                 </p>
              </div>
              <Button variant="outline" className="border-red-900/50 text-red-400 hover:bg-red-950/50 whitespace-nowrap">
                 Excluir Minha Conta
              </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};