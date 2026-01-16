import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input } from '../ui/Primitives';
import { CircularProgress } from '../ui/CircularProgress';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';
import { AppointmentStatus } from '../../types';

export const FinanceTab: React.FC = () => {
  const { user, appointments } = useStore();
  // Initialize with user preferences if available
  const [avgPrice, setAvgPrice] = useState<number>(user.preferences?.avgPrice || 45);
  const [clientsPerDay, setClientsPerDay] = useState<number>(user.preferences?.clientsPerDay || 8);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(user.preferences?.daysPerWeek || 5);
  
  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [projected, setProjected] = useState(0);
  const [tipValue, setTipValue] = useState(0);

  // Real Insights State
  const [noShowCount, setNoShowCount] = useState(0);
  const [lostRevenue, setLostRevenue] = useState(0);

  useEffect(() => {
    // Simulator Calcs
    const d = avgPrice * clientsPerDay;
    const m = d * daysPerWeek * 4;
    const y = m * 12;
    setDaily(d);
    setMonthly(m);
    setProjected(y);

    // Calculate Tip Logic: Increase price by R$ 5.00
    const priceIncrease = 5;
    const extraMonthly = priceIncrease * clientsPerDay * daysPerWeek * 4;
    setTipValue(extraMonthly);

    // Real Data Calc
    const noShows = appointments.filter(a => a.status === AppointmentStatus.NO_SHOW);
    setNoShowCount(noShows.length);
    const lost = noShows.reduce((acc, curr) => acc + curr.price, 0);
    setLostRevenue(lost);

  }, [avgPrice, clientsPerDay, daysPerWeek, appointments]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simulator Controls */}
        <Card className="md:col-span-1 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.DollarSign className="w-5 h-5 text-amber-500" />
              Simulador de Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              label="Preço Médio do Corte (R$)"
              type="number" 
              value={avgPrice} 
              onChange={(e) => setAvgPrice(Number(e.target.value))} 
            />
            <Input 
              label="Clientes por Dia" 
              type="number" 
              value={clientsPerDay} 
              onChange={(e) => setClientsPerDay(Number(e.target.value))} 
            />
            <div>
              <label className="text-sm font-medium text-zinc-400 mb-2 block">Dias trabalhados/semana: {daysPerWeek}</label>
              <input 
                type="range" 
                min="1" 
                max="7" 
                value={daysPerWeek} 
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>1 dia</span>
                <span>7 dias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Area */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-zinc-900/80 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400 font-medium">Faturamento Diário Estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">R$ {daily.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-emerald-500 flex items-center mt-1">
                <Icons.TrendingUp className="w-3 h-3 mr-1" />
                Baseado na sua meta
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/80 border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Icons.DollarSign className="w-24 h-24 text-emerald-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-zinc-400 font-medium">Projeção Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">R$ {monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <p className="text-xs text-zinc-500 mt-2">Trabalhando {daysPerWeek * 4} dias no mês</p>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 bg-gradient-to-r from-zinc-900 to-zinc-800">
             <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-zinc-400 text-sm mb-1">Potencial Anual</p>
                 <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                   R$ {projected.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                 </h3>
               </div>
               <div className="hidden sm:block">
                  <CircularProgress percentage={75} size={80} strokeWidth={6} color="text-amber-500">
                    <Icons.Award className="w-6 h-6 text-amber-500" />
                  </CircularProgress>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>

      {/* Tip Section & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tip */}
          <Card className="bg-zinc-900/30 border-dashed border-zinc-800">
            <CardContent className="flex items-start gap-4 p-4">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 shrink-0">
                <Icons.Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Dica de Ouro StyloHub</h4>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  Se você aumentar somente <span className="text-white font-bold">R$ 5,00</span> no seu preço médio, 
                  você irá faturar mais <span className="text-emerald-400 font-bold">R$ {tipValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> por mês.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Real Anti No-Show Insight */}
          <Card className="bg-zinc-900/30 border-dashed border-zinc-800">
             <CardContent className="flex items-start gap-4 p-4">
               <div className="p-2 bg-red-500/10 rounded-lg text-red-500 shrink-0">
                  <Icons.TrendingUp className="w-6 h-6 rotate-180" />
               </div>
               <div>
                 <h4 className="text-sm font-semibold text-zinc-200">Prejuízo com Faltas (No-Show)</h4>
                 {noShowCount > 0 ? (
                     <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Você teve <span className="text-white font-bold">{noShowCount} faltas</span> registradas recentemente. 
                        Isso representa <span className="text-red-400 font-bold">R$ {lostRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span> que deixaram de entrar no caixa.
                        Use a função de Confirmação na Agenda!
                     </p>
                 ) : (
                     <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                        Parabéns! Nenhuma falta registrada recentemente. Continue confirmando os horários com seus clientes.
                     </p>
                 )}
               </div>
             </CardContent>
          </Card>
      </div>
    </div>
  );
};