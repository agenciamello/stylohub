import React, { useState } from 'react';
import { Button, Input, Card, CardContent } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';

export const SignUpPage: React.FC = () => {
  const { registerUser, setCurrentView } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      registerUser(formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
       <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[100px]" />

      <Card className="w-full max-w-lg bg-zinc-900/50 border-zinc-800 backdrop-blur-xl relative z-10 animate-fade-in">
        <CardContent className="p-8">
          <div className="mb-6">
            <button 
              onClick={() => setCurrentView('login')}
              className="flex items-center text-zinc-500 hover:text-zinc-300 text-sm mb-4 transition-colors"
            >
              <Icons.ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para login
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Crie sua conta</h1>
            <p className="text-zinc-400 mt-1 text-sm">Comece a transformar sua gestão hoje.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="Nome" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input 
                placeholder="Sobrenome" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Icons.Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="E-mail" 
                type="email"
                className="pl-10"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Icons.Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Senha" 
                type="password"
                className="pl-10"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Icons.MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Cidade" 
                className="pl-10"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              className="w-full h-11 text-base font-semibold mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Continuar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};