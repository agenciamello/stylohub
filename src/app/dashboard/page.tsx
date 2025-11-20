'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Home, GraduationCap, Calendar, User, Check, DollarSign, Star, Award, TrendingUp, Clock, Target } from 'lucide-react';

export default function MobileDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>('Usuário');

  // Função para extrair primeiro nome
  const extractFirstName = (fullName: string | undefined) => fullName ? fullName.split(' ')[0] : 'Usuário';

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error || !session) {
        router.push("/login");
        return;
      }

      const fullName = session.user.user_metadata?.full_name || session.user.email || 'Usuário';
      setFirstName(extractFirstName(fullName));
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const fullName = session.user.user_metadata?.full_name || session.user.email || 'Usuário';
        setFirstName(extractFirstName(fullName));
      } else {
        router.push("/login");
      }
    });

    return () => {
      if (authListener?.subscription) authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <BackgroundPattern />
      <HeaderDashboard firstName={firstName} />
      <main className="relative flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        <NextAppointmentCard />
        <DayNumbersCard />
        <MasterClassCard />
      </main>
      <BottomNav />
    </div>
  );
}

/* ---------------------- COMPONENTES ---------------------- */

function HeaderDashboard({ firstName }: { firstName: string }) {
  return (
    <header className="relative px-6 pt-14 pb-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-6 h-6 text-black" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-30 animate-pulse" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-4 tracking-wide">
        Stylo Hub
      </h1>
      <div className="text-center space-y-2">
        <p className="text-gray-200 text-lg font-medium">
          Bem-vindo de volta, <span className="text-amber-400 font-semibold">{firstName}</span>
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <p className="text-gray-300 text-sm italic">Pronto para um dia em grande estilo?</p>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
      </div>
    </header>
  );
}

function NextAppointmentCard() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />
      <div className="relative bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-7 shadow-2xl border border-amber-300/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-black text-xl font-bold flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Seu Próximo Atendimento
          </h2>
          <div className="bg-black/20 px-3 py-1 rounded-full">
            <span className="text-black text-xs font-semibold">EM ANDAMENTO</span>
          </div>
        </div>
        <div className="flex items-center space-x-5 mb-7">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-3 border-amber-400/30 shadow-xl">
              <User className="w-10 h-10 text-amber-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-black font-bold text-xl mb-1">João Silva</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-600 rounded-full" />
              <p className="text-gray-800 font-medium">14:30 — Corte Degradê</p>
            </div>
            <div className="flex items-center mt-2 space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-3 h-3 text-amber-600 fill-amber-600" />
              ))}
            </div>
          </div>
        </div>
        <button className="w-full bg-black text-white py-4 px-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">Marcar como Concluído</span>
        </button>
      </div>
    </section>
  );
}

function DayNumbersCard() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-3xl blur-lg" />
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-2xl border border-gray-700/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold flex items-center">
            <Target className="w-5 h-5 mr-2 text-amber-400" />
            Seu Dia em Números
          </h2>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Clientes Atendidos */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-md" />
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-5 text-center border border-green-500/20">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <circle cx="48" cy="48" r="40" stroke="#1f2937" strokeWidth="10" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.62} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                    className="drop-shadow-lg"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg">5/8</span>
                  <span className="text-green-400 text-xs font-semibold">HOJE</span>
                </div>
              </div>
              <p className="text-green-400 text-sm font-bold mb-1">62% Concluído</p>
              <p className="text-gray-400 text-xs">Clientes Atendidos</p>
            </div>
          </div>
          {/* Ganhos Estimados */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-2xl blur-md" />
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-5 text-center border border-amber-500/20">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-amber-400" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl blur-md opacity-30" />
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-bold text-2xl mb-1">R$ 350,00</p>
              <p className="text-gray-400 text-xs">Faturamento Estimado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MasterClassCard() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl blur-lg" />
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-3xl p-7 shadow-2xl border border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
            Continue Evoluindo
          </h2>
          <div className="bg-purple-500/20 px-3 py-1 rounded-full">
            <span className="text-purple-300 text-xs font-bold">MASTERCLASS</span>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur-md opacity-40" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2">Masterclass Reflexo de Bolinha</h3>
            <div className="flex items-center justify-between mb-3">
              <p className="text-purple-400 text-sm font-bold">75% Concluído</p>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs">AVANÇADO</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-700 relative"
                  style={{ width: '75%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="absolute -right-1 -top-1 w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center border-2 border-gray-900">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomNav() {
  return (
    <nav className="relative fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-black border-t border-amber-500/30 backdrop-blur-xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="grid grid-cols-4 py-3">
        <button className="flex flex-col items-center py-2 space-y-1 relative group">
          <div className="relative">
            <Home className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md" />
          </div>
          <span className="text-xs text-amber-400 font-medium">Home</span>
          <div className="absolute bottom-0 w-4 h-0.5 bg-amber-400 rounded-full" />
        </button>
        <Link href="/academy" className="flex flex-col items-center py-2 space-y-1 group">
          <GraduationCap className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-all" />
          <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Academy</span>
        </Link>
        <Link href="/agenda" className="flex flex-col items-center py-2 space-y-1 group">
  <Calendar className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
  <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Agenda</span>
</Link>
        <Link href="/perfil" className="flex flex-col items-center py-2 space-y-1 group">
  <User className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
  <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Perfil</span>
</Link>
      </div>
    </nav>
  );
}

/* ---------------------- COMPONENTE DE FUNDO ---------------------- */

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 bg-black/50 -z-10" />
  );
}
