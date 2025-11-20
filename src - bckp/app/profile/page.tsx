"use client";

import React, { useState, useEffect } from 'react';
import { User, LogOut, Calendar, Scissors, Star, Settings, Award, Loader2 } from "lucide-react";

// Definição do componente principal da página de perfil
export default function PerfilPage() {
  // Estado para armazenar os dados do perfil (inicialmente null)
  const [profileData, setProfileData] = useState(null);
  // Estado para controlar o carregamento dos dados
  const [isLoading, setIsLoading] = useState(true);

  // Simula a busca de dados (simulando uma chamada de API)
  useEffect(() => {
    // Mock dos dados que viriam de um backend
    const mockData = {
      username: "@BarbeiroDoStylo",
      title: "Barbeiro Profissional",
      experience: "5 anos de experiência",
      appointments: 152,
      rating: 4.9,
      certificates: 3,
    };

    // Simula um delay de 1.5s para carregamento
    setTimeout(() => {
      setProfileData(mockData);
      setIsLoading(false);
    }, 1500);
  }, []); // Executa apenas na montagem do componente

  // Componente interno para renderizar o Card de Perfil, lidando com os estados de Loading e Data
  const ProfileCardContent = () => {
    // Estado de Carregamento
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
          <p className="mt-4 text-gray-400 font-medium">Carregando dados do perfil...</p>
        </div>
      );
    }

    // Estado de Erro (se o profileData for null após o carregamento)
    if (!profileData) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="mt-4 text-red-400 font-medium">Ocorreu um erro ao carregar o perfil.</p>
        </div>
      );
    }

    // Conteúdo Principal do Perfil (Dados Carregados)
    return (
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border-4 border-amber-400/30 shadow-xl">
            <User className="w-14 h-14 text-amber-400" />
          </div>
          {/* Efeito de brilho ao redor do avatar */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-20" />
        </div>

        {/* Informações do Usuário */}
        <h2 className="text-xl font-bold text-amber-400 mb-1">{profileData.username}</h2>
        <p className="text-gray-300 text-sm">{profileData.title} | {profileData.experience}</p>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4 mt-6 w-full">
          <div className="text-center">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 font-bold text-lg">{profileData.appointments}</p>
            <span className="text-gray-400 text-xs">Atendimentos</span>
          </div>

          <div className="text-center">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-bold text-lg">{profileData.rating.toFixed(1)}</p>
            <span className="text-gray-400 text-xs flex items-center justify-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Avaliação
            </span>
          </div>

          <div className="text-center">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500 font-bold text-lg">{profileData.certificates}</p>
            <span className="text-gray-400 text-xs flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-purple-400" /> Certificados
            </span>
          </div>
        </div>
      </div>
    );
  };
    
  // Renderização da página
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Background Pattern e Efeitos */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative px-6 pt-14 pb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
          Meu Perfil
        </h1>
        <p className="text-gray-300 mt-2 text-sm italic flex justify-center items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          Controle sua conta e informações
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </p>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        {/* Card Principal do Usuário */}
        <section className="relative">
          {/* Efeito de brilho do card */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />

          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-2xl border border-amber-500/30 min-h-64">
            {/* O conteúdo é renderizado com base no estado de carregamento */}
            <ProfileCardContent />
          </div>
        </section>

        {/* Ações e Preferências */}
        <section className="relative">
          {/* Efeito de brilho da seção de ações */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-3xl blur-lg" />

          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-xl border border-gray-700/30 space-y-6">
            
            {/* Botão: Ver Minha Agenda */}
            <button className="w-full flex items-center justify-between bg-gray-800/50 hover:bg-gray-700/50 transition p-4 rounded-xl border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300 font-medium">Ver Minha Agenda</span>
              </div>
            </button>

            {/* Botão: Serviços e Preços */}
            <button className="w-full flex items-center justify-between bg-gray-800/50 hover:bg-gray-700/50 transition p-4 rounded-xl border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Scissors className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300 font-medium">Serviços e Preços</span>
              </div>
            </button>

            {/* Botão: Configurações da Conta */}
            <button className="w-full flex items-center justify-between bg-gray-800/50 hover:bg-gray-700/50 transition p-4 rounded-xl border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-amber-400" />
                <span className="text-gray-300 font-medium">Configurações da Conta</span>
              </div>
            </button>

            {/* Botão: Sair da Conta (Logout) */}
            <button className="w-full flex items-center justify-between bg-red-500/10 hover:bg-red-500/20 transition p-4 rounded-xl border border-red-500/30 mt-4">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Sair da Conta</span>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}