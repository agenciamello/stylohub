'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Users, 
  Calendar, 
  Calculator, 
  Download, 
  Video, 
  UserPlus, 
  Award,
  BookOpen,
  Clock,
  Zap,
  Crown,
  ArrowLeft,
  Check,
  HelpCircle,
  Scissors
} from 'lucide-react';
import Link from 'next/link';

export default function PlanosPage() {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      name: 'Grátis',
      color: 'orange',
      icon: BookOpen,
      price: 'R$0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        { text: 'Acesso às aulas básicas de barbearia', included: true },
        { text: 'Até 20 agendamentos mensais para clientes', included: true },
        { text: 'Perfil profissional simples', included: true },
        { text: 'Acesso limitado às funcionalidades', included: true },
        { text: 'Acesso a todos os cursos e aulas', included: false },
        { text: 'Calculadora de faturamento', included: false },
        { text: 'Grupos de estudo', included: false },
        { text: 'Suporte prioritário', included: false },
        { text: 'Baixar aulas para ver offline', included: false },
        { text: 'Agendamentos ilimitados', included: false },
        { text: 'Reunião mensal com professores', included: false },
        { text: 'Licença Multi-Barbeiro', included: false },
        { text: 'Área Premium de comunidade', included: false }
      ],
      buttonText: 'Começar Gratuitamente',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: 'PREMIUM',
      color: 'yellow',
      icon: Star,
      price: 'R$47,97',
      period: '/mês',
      description: 'O mais popular entre os profissionais',
      features: [
        { text: 'Acesso a todos os cursos e aulas, incluindo reflexo de bolinha', included: true },
        { text: 'Até 150 agendamentos mensais', included: true },
        { text: 'Perfil profissional completo', included: true },
        { text: 'Acesso total às funcionalidades', included: true },
        { text: 'Calculadora de faturamento', included: true },
        { text: 'Grupos de estudo', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'Baixar aulas para ver offline', included: false },
        { text: 'Agendamentos ilimitados', included: false },
        { text: 'Reunião mensal com professores', included: false },
        { text: 'Licença Multi-Barbeiro', included: false },
        { text: 'Área Premium de comunidade', included: false }
      ],
      buttonText: 'Assinar Premium',
      buttonVariant: 'default',
      popular: true
    },
    {
      name: 'DELUXE',
      color: 'green',
      icon: Crown,
      price: 'R$97,97',
      period: '/mês',
      description: 'Potencialize seu Negócio com Gestão de Equipe',
      features: [
        { text: 'Gestão Multi-Barbeiro (Inclui 4 Licenças de Usuário)', included: true },
        { text: 'Agendamentos ilimitados', included: true },
        { text: 'Perfil profissional premium', included: true },
        { text: 'Acesso total às funcionalidades', included: true },
        { text: 'Acesso total + baixar aulas para ver offline', included: true },
        { text: 'Calculadora avançada de faturamento diário/mensal', included: true },
        { text: 'Arquivos, Guias & Materiais exclusivos', included: true },
        { text: 'Suporte VIP dedicado', included: true },
        { text: 'Downloads offline ilimitados', included: true },
        { text: 'Reunião mensal por vídeo com professores', included: true },
        { text: 'Área Premium de comunidade', included: true }
      ],
      buttonText: 'Assinar Deluxe',
      buttonVariant: 'default',
      popular: false
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange':
        return {
          bg: 'bg-orange-500',
          bgLight: 'bg-orange-100',
          text: 'text-orange-600',
          border: 'border-orange-200',
          gradient: 'from-orange-400 to-orange-600',
          glow: 'shadow-orange-500/20'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-500',
          bgLight: 'bg-yellow-100',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          gradient: 'from-yellow-400 to-yellow-600',
          glow: 'shadow-yellow-500/20'
        };
      case 'green':
        return {
          bg: 'bg-green-500',
          bgLight: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200',
          gradient: 'from-green-400 to-green-600',
          glow: 'shadow-green-500/20'
        };
      default:
        return {
          bg: 'bg-gray-500',
          bgLight: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          gradient: 'from-gray-400 to-gray-600',
          glow: 'shadow-gray-500/20'
        };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-gold">StyloHub</span>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-background">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 text-gold border-gold bg-card">
            <Star className="w-4 h-4 mr-2" />
            Escolha seu plano
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planos para cada etapa da sua <span className="text-gold">jornada profissional</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comece grátis e evolua conforme sua barbearia cresce. Sem taxas escondidas, cancele quando quiser.
          </p>

          {/* Garantia */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-green-600">Garantia de 7 dias</span> - Teste sem risco, reembolso garantido
            </span>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-card rounded-full p-1 flex items-center border border-border/50">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-6 py-2 rounded-full transition-all ${
                  isMonthly 
                    ? 'gold-gradient text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-6 py-2 rounded-full transition-all ${
                  !isMonthly 
                    ? 'gold-gradient text-background' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Anual (2 meses grátis)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const colors = getColorClasses(plan.color);
              
              return (
                <Card 
                  key={plan.name}
                  className={`relative ${
                    plan.popular 
                      ? 'border-2 border-gold gold-glow scale-105' 
                      : 'border-border/50'
                  } hover-lift`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="gold-gradient text-background px-4 py-1 text-sm font-semibold">
                        <Star className="w-4 h-4 mr-1" />
                        MAIS POPULAR
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                      {!isMonthly && plan.name !== 'Grátis' && (
                        <div className="text-sm text-green-600 mt-1">
                          Pague 10 meses e ganhe 2 grátis
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full mb-6 ${
                        plan.buttonVariant === 'default' 
                          ? 'gold-gradient hover:gold-gradient-hover text-background gold-glow shimmer' 
                          : 'bg-gray-800 border-gold text-yellow-400 hover:bg-gray-700 hover:text-yellow-300 gold-border-glow shimmer'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>

                    <Separator className="mb-6 border-border/50" />

                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${
                            feature.included ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-gold">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossos planos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  Posso mudar de plano quando quiser?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim! Você pode fazer upgrade ou downgrade a qualquer momento. 
                  Se fizer upgrade, pagará a diferença proporcional. 
                  Se fizer downgrade, o crédito será usado nos próximos meses.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  Qual forma de pagamento aceitam?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aceitamos cartão de crédito, débito, PIX e boleto bancário. 
                  Para planos anuais, oferecemos 12x sem juros no cartão.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  O plano gratuito tem limite de tempo?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Não! O plano gratuito é vitalício. Use quantos meses quiser 
                  sem custo algum. Ideal para começar e conhecer a plataforma.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  Como funciona a garantia de 7 dias?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Você tem 7 dias para testar qualquer plano pago. 
                  Se não ficar satisfeito, solicite reembolso integral sem burocracia. 
                  Teste sem risco!
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  Como funciona o cancelamento?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cancelamento instantâneo e sem multa. Você continua com acesso 
                  até o final do período pago. Sem burocracia, sem complicações.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gold" />
                  Posso cancelar dentro dos 7 dias?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim! Se cancelar dentro dos 7 dias, recebe reembolso integral. 
                  Depois desse período, cancela quando quiser mas sem reembolso 
                  do período já pago.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gold-gradient rounded-2xl p-12 text-center text-background">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Junte-se a mais de 2.500 barbeiros que estão transformando suas carreiras.
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
              <Button 
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 font-semibold gold-glow shimmer"
              >
                <Zap className="w-5 h-5 mr-2" />
                Começar Gratuitamente
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-background text-background hover:bg-background hover:text-foreground font-semibold gold-border-glow shimmer"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}