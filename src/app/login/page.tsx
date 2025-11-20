'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.senha
    });

    setIsLoading(false);

    if (error) {
      alert("Erro ao fazer login: " + error.message);
      return;
    }

    // LOGIN OK → Redirecionar para dashboard (quando existir)
    router.push("/dashboard");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gold">StyloHub</span>
            </Link>
            <Link href="/cadastro">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-background">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="glass border-border/50">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gold">Acessar minha conta</CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Entre com seu e-mail e senha para continuar
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <label htmlFor="senha" className="text-sm font-medium">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      placeholder="Sua senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gold-gradient text-background font-semibold py-3 shimmer"
                >
                  {isLoading ? "Entrando..." : (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-5 h-5" />
                      Entrar
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground mt-6">
                Não tem conta?{" "}
                <Link href="/cadastro" className="text-gold font-semibold">
                  Criar conta
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
