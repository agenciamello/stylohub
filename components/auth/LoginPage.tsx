import React, { useState } from 'react';
import { Button, Input, Card, CardContent } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';

export const LoginPage: React.FC = () => {
  const { login, setCurrentView } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-zinc-800/20 blur-[100px]" />

      <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl relative z-10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <Icons.Scissors className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">StyloHub</h1>
            <p className="text-zinc-400 mt-2 text-sm">Gerencie sua barbearia com estilo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Icons.Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <Input 
                  placeholder="Seu email" 
                  className="pl-10"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Icons.Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <Input 
                  placeholder="Sua senha" 
                  className="pl-10"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              className="w-full h-11 text-base font-semibold mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar na Plataforma'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              Não tem uma conta? <button onClick={() => setCurrentView('signup')} className="text-amber-500 hover:underline cursor-pointer font-medium bg-transparent border-none p-0">Cadastre-se</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};