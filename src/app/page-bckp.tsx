'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Scissors, 
  Calendar, 
  Calculator, 
  Download, 
  Users, 
  TrendingUp,
  Star,
  CheckCircle,
  Play,
  Menu,
  X,
  ChevronDown,
  Award,
  BookOpen,
  Target,
  Clock,
  UserCheck,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const faqs = [
    {
      question: "O que é o StyloHub?",
      answer: "O StyloHub é uma plataforma premium completa para barbeiros profissionais, oferecendo cursos exclusivos, agenda inteligente, calculadora de faturamento e ferramentas para alavancar sua carreira na barbearia."
    },
    {
      question: "O plano gratuito é realmente grátis?",
      answer: "Sim! O plano gratuito oferece acesso a cursos fundamentais, agenda básica e ferramentas essenciais. Sem custo algum e sem necessidade de cartão de crédito para começar."
    },
    {
      question: "Preciso de cartão de crédito para começar?",
      answer: "Não! Você pode se cadastrar e começar no plano gratuito sem informar nenhum dado de cartão de crédito. O pagamento só é solicitado se você decidir upgrade para planos premium."
    },
    {
      question: "O curso de Reflexo de Bolinha está incluso?",
      answer: "O curso de Reflexo de Bolinha está disponível nos planos Premium e Deluxe. É um conteúdo avançado exclusivo para membros premium que desejam dominar essa técnica sofisticada."
    },
    {
      question: "A agenda tem limite de clientes?",
      answer: "No plano gratuito você pode cadastrar até 50 clientes. Nos planos Premium e Deluxe não há limite de clientes, permitindo expandir sua base de clientes ilimitadamente."
    },
    {
      question: "Posso cancelar ou mudar de plano quando quiser?",
      answer: "Sim! Você pode cancelar ou alterar seu plano a qualquer momento. Sem taxas de cancelamento e sem multas contratuais. Total flexibilidade para você."
    },
    {
      question: "Terei certificado ao concluir os cursos?",
      answer: "Sim! Todos os cursos concluídos emitem certificado profissional válidos, que você pode adicionar ao seu portfólio e redes sociais para comprovar sua qualificação."
    },
    {
      question: "Funciona em celular e computador?",
      answer: "Sim! O StyloHub é 100% responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar sua conta de qualquer dispositivo."
    },
    {
      question: "Como funcionam os planos Premium e Deluxe?",
      answer: "O plano Premium oferece acesso a todos os cursos, agenda ilimitada e calculadora de faturamento. O plano Deluxe inclui tudo do Premium mais downloads offline, mentorias mensais e equipe profissional."
    },
    {
      question: "E se eu tiver dificuldades? Existe suporte?",
      answer: "Sim! Oferecemos suporte completo por email, chat e vídeos tutoriais. Além disso, nossa comunidade de barbeiros está sempre disponível para ajudar e compartilhar experiências."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Navbar Fixa */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-background" />
              </div>
              <a href="/"><span className="text-xl font-bold text-gold">StyloHub</span></a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('recursos')}
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                Recursos
              </button>
              <Link 
              href="/planos"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              Planos
            </Link>
              <button 
                onClick={() => scrollToSection('cursos')}
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                Cursos
              </button>
              <button className="text-muted-foreground hover:text-gold transition-colors">
                Entrar
              </button>
              <Button className="gold-gradient hover:gold-gradient-hover text-background font-semibold gold-glow shimmer rounded-lg">
                Começar Agora
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-border/50">
              <button 
                onClick={() => scrollToSection('recursos')}
                className="block w-full text-left text-muted-foreground hover:text-gold transition-colors py-2"
              >
                Recursos
              </button>
              <Link 
              href="/planos"
              className="block w-full text-left text-muted-foreground hover:text-gold transition-colors py-2"
            >
              Planos
            </Link>
              <button 
                onClick={() => scrollToSection('cursos')}
                className="block w-full text-left text-muted-foreground hover:text-gold transition-colors py-2"
              >
                Cursos
              </button>
              <button className="block w-full text-left text-muted-foreground hover:text-gold transition-colors py-2">
                Entrar
              </button>
              <Button className="w-full gold-gradient hover:gold-gradient-hover text-background font-semibold gold-glow shimmer rounded-lg">
                Começar Agora
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <Badge className="mb-6 px-4 py-2 text-gold border-gold bg-card">
              🚀 Plataforma #1 para Barbeiros Profissionais
            </Badge>

            {/* Título Principal */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Domine a Arte da
              <span className="block text-gold">Barbearia Profissional</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Aprenda com os melhores, organize sua agenda e construa um império na barbearia. 
              Tudo em uma plataforma premium criada para profissionais como você.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="gold-gradient hover:gold-gradient-hover text-background font-semibold text-lg px-8 py-4 gold-glow shimmer pulse-gold rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Começar Gratuitamente
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gold text-gold hover:bg-gold hover:text-background font-semibold text-lg px-8 py-4 gold-border-glow shimmer rounded-lg"
              >
                <Link href="/planos" className="flex items-center gap-2">
                  Ver Planos
                </Link>
              </Button>
            </div>

            {/* Microtexto */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <span>2.500+ Barbeiros</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold" />
                <span>4.9 Avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Certificado Profissional</span>
              </div>
            </div>

            {/* Garantia */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-green-600">Garantia de 7 dias</span> - Teste sem risco, cancele quando quiser
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Para Quem é o StyloHub */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para Quem é o <span className="text-gold">StyloHub</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conteúdo personalizado para cada etapa da sua jornada profissional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="glass hover-lift border-border/50 animate-slide-in-left">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-background" />
                </div>
                <CardTitle className="text-xl font-semibold">Aspirantes a Barbeiro</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Para quem está começando do zero e quer aprender os fundamentos da barbearia.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="glass hover-lift border-border/50 animate-slide-up">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-background" />
                </div>
                <CardTitle className="text-xl font-semibold">Barbeiros Iniciantes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Profissionais que desejam evoluir rápido, aprender técnicas modernas e organizar sua agenda.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="glass hover-lift border-border/50 animate-slide-in-right">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-background" />
                </div>
                <CardTitle className="text-xl font-semibold">Barbeiros Experientes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Especialistas que querem dominar técnicas avançadas — como Reflexo de Bolinha — e ampliar seu faturamento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo o Que Você Precisa para <span className="text-gold">Alcançar o Sucesso</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas profissionais desenvolvidas especialmente para barbeiros que buscam excelência.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recurso 1 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Aprendizado Profissional</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cursos completos em vídeo e PDF sobre as melhores técnicas de barbearia.
                </p>
              </CardContent>
            </Card>

            {/* Recurso 2 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Agenda Inteligente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize atendimentos, liste clientes e acompanhe estatísticas.
                </p>
              </CardContent>
            </Card>

            {/* Recurso 3 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Calculadora de Faturamento</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Veja o faturamento diário, semanal e mensal (exclusivo Premium e Deluxe).
                </p>
              </CardContent>
            </Card>

            {/* Recurso 4 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Downloads Offline</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Baixe aulas para assistir sem internet (exclusivo Deluxe).
                </p>
              </CardContent>
            </Card>

            {/* Recurso 5 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Mentoria Mensal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Uma reunião em vídeo com um dos professores por mês (Deluxe).
                </p>
              </CardContent>
            </Card>

            {/* Recurso 6 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">Equipe Profissional</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cadastre até 2 barbeiros extras para trabalhar com você (Deluxe).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de Cursos em Destaque */}
      <section id="cursos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aprenda com os <span className="text-gold">Melhores Mestres</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conteúdo exclusivo com técnicas atualizadas e certificadas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Curso 1 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Iniciante</Badge>
                  <Play className="w-4 h-4 text-gold" />
                </div>
                <CardTitle className="text-lg">Fundamentos da Barbearia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>12 aulas</span>
                    <span>8h de conteúdo</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Progresso 0%</p>
              </CardContent>
            </Card>

            {/* Curso 2 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Intermediário</Badge>
                  <Play className="w-4 h-4 text-gold" />
                </div>
                <CardTitle className="text-lg">Técnicas de Degradê</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>18 aulas</span>
                    <span>12h de conteúdo</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Progresso 0%</p>
              </CardContent>
            </Card>

            {/* Curso 3 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-gold text-background">Avançado</Badge>
                  <Play className="w-4 h-4 text-gold" />
                </div>
                <CardTitle className="text-lg">Reflexo de Bolinha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>24 aulas</span>
                    <span>16h de conteúdo</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Progresso 0%</p>
              </CardContent>
            </Card>

            {/* Curso 4 */}
            <Card className="glass hover-lift border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Intermediário</Badge>
                  <Play className="w-4 h-4 text-gold" />
                </div>
                <CardTitle className="text-lg">Corte na Tesoura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex justify-between">
                    <span>15 aulas</span>
                    <span>10h de conteúdo</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Progresso 0%</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-background font-semibold gold-border-glow shimmer rounded-lg"
            >
              <Link href="/planos" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Descubra as Vantagens do Plano Plus
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Métricas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">2.500+</div>
              <div className="text-muted-foreground">Barbeiros Ativos</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">15.000+</div>
              <div className="text-muted-foreground">Cursos Concluídos</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">4.9/5</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">200+</div>
              <div className="text-muted-foreground">Horas de Conteúdo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grande CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gold-gradient rounded-2xl p-12 text-center text-background animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Elevar Sua Barbearia?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Junte-se a milhares de barbeiros que estão transformando suas carreiras com o StyloHub.
            </p>
            
            {/* Garantia no CTA */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm opacity-90">
                <span className="font-semibold">Garantia de 7 dias</span> - Teste sem compromisso
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
		<a href="/cadastro">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-4 gold-glow shimmer rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Começar Minha Jornada
                </span>
              </Button>
		</a>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-background text-background hover:bg-background hover:text-foreground font-semibold text-lg px-8 py-4 gold-border-glow shimmer rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Já Tenho Conta
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-gold">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre o StyloHub
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass border-border/50">
                <CardHeader>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <CardTitle className="text-lg flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                    <ChevronDown 
                      className={`w-5 h-5 text-gold transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent>
                    <p className="text-muted-foreground pl-8">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-bold text-gold">StyloHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Plataforma premium para barbeiros profissionais que buscam excelência e sucesso.
              </p>
            </div>

            {/* Links Úteis */}
            <div>
              <h3 className="font-semibold mb-4 text-gold">Links Úteis</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Sobre</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Cursos</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Recursos</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Planos</button></li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h3 className="font-semibold mb-4 text-gold">Suporte</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Entrar</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Central de Ajuda</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Política de Privacidade</button></li>
                <li><button className="text-muted-foreground hover:text-gold transition-colors">Termos de Uso</button></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="font-semibold mb-4 text-gold">Contato</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>suporte.stylohub@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(21) 99709-0192</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Rio de Janeiro, brasil</span>
                </li>
              </ul>
              
              {/* Redes Sociais */}
              <div className="flex gap-3 mt-4">
                <button className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform">
                  <Youtube className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <Separator className="my-8 border-border/50" />

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 StyloHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}