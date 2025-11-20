"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  Calendar,
  Scissors,
  Star,
  Settings,
  Award,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // ajuste o path

// --- Defina o tipo Profile fora do componente ---
interface Profile {
  username: string;
  title: string;
  experience: string;
  appointments: number;
  rating: number;
  certificates: number;
}

// Componente genérico para botões de ação
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  href,
  onClick,
  variant = "default",
}) => {
  const baseClasses = `w-full flex items-center justify-between p-4 rounded-xl border transition transform duration-200 ease-in-out
    ${variant === "default" ? "bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/30 hover:shadow-lg hover:scale-105" : ""}
    ${variant === "danger" ? "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:shadow-lg hover:scale-105" : ""}`;

  const content = (
    <div className="flex items-center gap-3">
      {icon}
      <span className={variant === "danger" ? "text-red-400 font-medium" : "text-gray-300 font-medium"}>{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href} className={baseClasses}>{content}</Link>;
  }

  return <button onClick={onClick} className={baseClasses}>{content}</button>;
};

// Componente principal
export default function PerfilPage() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState<string>("Usuário");

  const extractFirstName = (fullName: string | undefined) =>
    fullName ? fullName.split(" ")[0] : "Usuário";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        const session = data?.session;

        if (!session || error) {
          console.error("Usuário não logado ou erro ao buscar sessão");
          setIsLoading(false);
          return;
        }

        const fullName = session.user.user_metadata?.full_name || session.user.email || "Usuário";
        const firstName = extractFirstName(fullName);
        setFirstName(firstName);

        // Mock de dados do perfil
        const mockData: Profile = {
          username: firstName,
          title: "Barbeiro Profissional",
          experience: "5 anos de experiência",
          appointments: 152,
          rating: 4.9,
          certificates: 3,
        };

        setProfileData(mockData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const ProfileCardContent = () => {
    if (isLoading) return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
        <p className="mt-4 text-gray-400 font-medium">Carregando dados do perfil...</p>
      </div>
    );

    if (!profileData) return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="mt-4 text-red-400 font-medium">Ocorreu um erro ao carregar o perfil.</p>
      </div>
    );

    return (
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border-4 border-amber-400/30 shadow-xl">
            <User className="w-14 h-14 text-amber-400" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-20" />
        </div>

        <h2 className="text-xl font-bold text-amber-400 mb-1">{profileData.username}</h2>
        <p className="text-gray-300 text-sm">{profileData.title} | {profileData.experience}</p>

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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{backgroundImage: "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.2) 0%, transparent 50%)"}}
        />
      </div>

      <header className="relative px-6 pt-14 pb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wide">Meu Perfil</h1>
        <p className="text-gray-300 mt-2 text-sm italic flex justify-center items-center gap-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400"/> Controle sua conta e informações <Star className="w-4 h-4 text-amber-400 fill-amber-400"/>
        </p>
      </header>

      <main className="relative flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-2xl border border-amber-500/30 min-h-64">
            <ProfileCardContent />
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-3xl blur-lg" />
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-xl border border-gray-700/30 space-y-4">
            <ActionButton icon={<Calendar className="w-5 h-5 text-amber-400"/>} label="Ver Minha Agenda" href="/agenda"/>
            <ActionButton icon={<Scissors className="w-5 h-5 text-amber-400"/>} label="Serviços e Preços" href="/servicos"/>
            <ActionButton icon={<Settings className="w-5 h-5 text-amber-400"/>} label="Configurações da Conta" href="/configuracoes"/>
            <ActionButton icon={<LogOut className="w-5 h-5 text-red-400"/>} label="Sair da Conta" onClick={() => console.log("Logout realizado")} variant="danger"/>
          </div>
        </section>
      </main>
    </div>
  );
}
