'use client'

import { Home, GraduationCap, Calendar, User, Star, Play, Award, CheckCircle, Clock, BookOpen, Lock, ChevronRight, TrendingUp, Users } from 'lucide-react'

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.2) 0%, transparent 50%)`
        }} />
      </div>

      {/* Cabeçalho */}
      <header className="relative px-6 pt-14 pb-8">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-30 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent mb-3 tracking-wide">
          Academy
        </h1>
        
        <p className="text-center text-gray-300 text-lg font-medium">
          Aprenda técnicas avançadas e evolua seu nível.
        </p>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative flex-1 px-6 pb-24 space-y-8">
        {/* Continue de Onde Parou - Hero Principal */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-amber-500/20 to-amber-600/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-7 shadow-2xl border border-amber-300/20">
            {/* Header do card */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-black text-xl font-bold">Continue de Onde Parou</h2>
                  <p className="text-black/70 text-sm">Você está quase lá!</p>
                </div>
              </div>
              <div className="bg-black/20 px-3 py-1 rounded-full">
                <span className="text-black text-xs font-bold">EM ANDAMENTO</span>
              </div>
            </div>
            
            <div className="bg-black/10 rounded-2xl p-6 mb-6">
              {/* Thumbnail mockada */}
              <div className="relative h-40 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white/80 text-sm">Reflexo Caraço — Efeito Profissional</p>
                  </div>
                </div>
                {/* Efeito de ferramentas borradas */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-lg blur-sm transform rotate-12" />
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full blur-sm" />
              </div>
              
              {/* Barra de progresso */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-black font-semibold">Progresso: 75%</span>
                  <span className="text-black/70 text-sm">Próxima: Finalização do Reflexo</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 h-3 rounded-full transition-all duration-700 relative"
                    style={{ width: '75%' }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                </div>
              </div>
              
              <p className="text-black/80 text-sm mb-4">
                Continue aprimorando seu reflexo profissional e domine a técnica que diferencia os especialistas.
              </p>
              
              <button className="w-full bg-black text-white py-4 px-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                <Play className="w-5 h-5" />
                <span className="font-bold text-lg">Continuar Aula</span>
              </button>
            </div>
          </div>
        </section>

        {/* Trilha de Cursos */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-3xl blur-lg" />
          
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-7 shadow-2xl border border-gray-700/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-amber-400" />
                Trilha de Cursos
              </h2>
              <div className="flex items-center text-amber-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Seu progresso</span>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                {/* Curso 1 - Reflexo de Bolinha */}
                <div className="relative bg-gray-800 rounded-2xl p-4 border border-amber-500/30">
                  <div className="absolute top-2 right-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  
                  <div className="h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1">Reflexo de Bolinha</h3>
                  <p className="text-amber-400 text-xs mb-2">Intermediário</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">75% concluído</span>
                      <span className="text-gray-400">12 aulas</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  
                  <button className="w-full bg-amber-500/20 text-amber-400 py-2 px-3 rounded-xl text-xs font-semibold hover:bg-amber-500/30 transition-colors">
                    Ver aulas
                  </button>
                </div>

                {/* Curso 2 - Degradê na Tesoura */}
                <div className="relative bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <div className="h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1">Degradê na Tesoura</h3>
                  <p className="text-amber-400 text-xs mb-2">Avançado</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">15% concluído</span>
                      <span className="text-gray-400">8 aulas</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  
                  <button className="w-full bg-gray-700/50 text-gray-300 py-2 px-3 rounded-xl text-xs font-semibold hover:bg-gray-700/70 transition-colors">
                    Ver aulas
                  </button>
                </div>

                {/* Curso 3 - Corte na Máquina Base Zero */}
                <div className="relative bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <div className="h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1">Corte Máquina Base Zero</h3>
                  <p className="text-green-400 text-xs mb-2">Básico</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Não iniciado</span>
                      <span className="text-gray-400">6 aulas</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-500/20 text-green-400 py-2 px-3 rounded-xl text-xs font-semibold hover:bg-green-500/30 transition-colors">
                    Começar curso
                  </button>
                </div>

                {/* Curso 4 - Barba Contorno Fino */}
                <div className="relative bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <div className="h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1">Barba Contorno Fino</h3>
                  <p className="text-amber-400 text-xs mb-2">Intermediário</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">45% concluído</span>
                      <span className="text-gray-400">10 aulas</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  
                  <button className="w-full bg-amber-500/20 text-amber-400 py-2 px-3 rounded-xl text-xs font-semibold hover:bg-amber-500/30 transition-colors">
                    Ver aulas
                  </button>
                </div>

                {/* Curso 5 - Alinhamento de Sobrancelha */}
                <div className="relative bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <div className="h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mb-1 mx-auto">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-sm mb-1">Alinhamento Sobrancelha</h3>
                  <p className="text-green-400 text-xs mb-2">Básico</p>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Não iniciado</span>
                      <span className="text-gray-400">5 aulas</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-500/20 text-green-400 py-2 px-3 rounded-xl text-xs font-semibold hover:bg-green-500/30 transition-colors">
                    Começar curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aulas Recomendadas Para Você */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-3xl blur-lg" />
          
          <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-3xl p-7 shadow-2xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold flex items-center">
                <Star className="w-5 h-5 mr-2 text-purple-400" />
                Aulas Recomendadas Para Você
              </h2>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {/* Aula 1 */}
              <div className="flex-shrink-0 w-64 bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="relative h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mb-3 flex items-center justify-center">
                  <div className="absolute top-2 right-2">
                    <Play className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm px-2">Finalização Corte Degradê</p>
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-sm mb-1">Finalização de Corte Degradê com Textura</h3>
                <p className="text-gray-400 text-xs mb-2">4m 12s</p>
                <p className="text-purple-400 text-xs italic">Popular entre barbeiros avançados</p>
              </div>

              {/* Aula 2 */}
              <div className="flex-shrink-0 w-64 bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="relative h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mb-3 flex items-center justify-center">
                  <div className="absolute top-2 right-2">
                    <Play className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm px-2">Reflexo Caraço</p>
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-sm mb-1">Como Fazer o Reflexo Caraço Sem Mancha</h3>
                <p className="text-gray-400 text-xs mb-2">6m 10s</p>
                <p className="text-purple-400 text-xs italic">Técnica exclusiva</p>
              </div>

              {/* Aula 3 */}
              <div className="flex-shrink-0 w-64 bg-gray-800 rounded-2xl p-4 border border-gray-700">
                <div className="relative h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl mb-3 flex items-center justify-center">
                  <div className="absolute top-2 right-2">
                    <Play className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm px-2">Corte Tesoura</p>
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-sm mb-1">Corte na Tesoura em Movimento</h3>
                <p className="text-gray-400 text-xs mb-2">3m 59s</p>
                <p className="text-purple-400 text-xs italic">Aula rápida e prática</p>
              </div>
            </div>
          </div>
        </section>

        {/* Suas Conquistas */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-3xl blur-lg" />
          
          <div className="relative bg-gradient-to-br from-gray-900 via-amber-900/20 to-gray-900 rounded-3xl p-7 shadow-2xl border border-amber-500/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold flex items-center">
                <Award className="w-5 h-5 mr-2 text-amber-400" />
                Suas Conquistas
              </h2>
              <div className="bg-amber-500/20 px-3 py-1 rounded-full">
                <span className="text-amber-300 text-xs font-bold">NÍVEL 1</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Conquista 1 */}
              <div className="relative bg-gray-800 rounded-2xl p-4 border border-green-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm">Certificado de Reflexo Profissional</h3>
                    <p className="text-green-400 text-xs">Conquistado em 12/03/2024</p>
                  </div>
                </div>
              </div>

              {/* Conquista 2 */}
              <div className="relative bg-gray-800 rounded-2xl p-4 border border-amber-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm">Especialista em Degradê Avançado</h3>
                    <p className="text-amber-400 text-xs">Em progresso (75%)</p>
                  </div>
                </div>
              </div>

              {/* Conquista 3 */}
              <div className="relative bg-gray-800 rounded-2xl p-4 border border-amber-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm">Barbeiro Premium — Nível 1</h3>
                    <p className="text-amber-400 text-xs">Desbloqueado recentemente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Barra de Navegação Inferior */}
      <nav className="relative fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-black border-t border-amber-500/30 backdrop-blur-xl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="grid grid-cols-4 py-3">
          {/* Home */}
          <button className="flex flex-col items-center py-2 space-y-1 group">
            <Home className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
            <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Home</span>
          </button>
          
          {/* Academy - Ativo */}
          <button className="flex flex-col items-center py-2 space-y-1 relative group">
            <div className="relative">
              <GraduationCap className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md" />
            </div>
            <span className="text-xs text-amber-400 font-medium">Academy</span>
            <div className="absolute bottom-0 w-4 h-0.5 bg-amber-400 rounded-full" />
          </button>
          
          {/* Agenda */}
          <button className="flex flex-col items-center py-2 space-y-1 group">
            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
            <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Agenda</span>
          </button>
          
          {/* Perfil */}
          <button className="flex flex-col items-center py-2 space-y-1 group">
            <User className="w-5 h-5 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
            <span className="text-xs text-gray-400 group-hover:text-amber-400 transition-colors">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  )
}