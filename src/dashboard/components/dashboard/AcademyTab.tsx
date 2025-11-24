import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, ProgressBar } from '@/dashboard/components/ui/Primitives';
import { Icons } from '@/dashboard/components/ui/Icons';
import { useStore } from '@/dashboard/store/useStore';
import { useRouter } from '@/dashboard/hooks/useRouter';

export const AcademyTab: React.FC = () => {
  const { courses } = useStore();
  const { push } = useRouter();

  // Sort by progress to get the most active one first
  const inProgressCourses = courses
    .filter(c => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.progress - a.progress);

  const heroCourse = inProgressCourses[0];
  const otherInProgress = inProgressCourses.slice(1);
  const exploreCourses = courses.filter(c => c.progress === 0 || c.progress === 100);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">StyloHub Academy</h2>
          <p className="text-zinc-400 mt-1">Evolua sua carreira com cursos exclusivos.</p>
        </div>
        <Button variant="outline" size="sm">
          <Icons.BookOpen className="w-4 h-4 mr-2" />
          Meus Certificados
        </Button>
      </div>

      {/* Hero Section: Continue Watching (Golden Card) */}
      {heroCourse && (
        <section>
          <Card 
            className="bg-gradient-to-br from-amber-400 to-amber-600 border-none shadow-lg shadow-amber-500/20 group cursor-pointer overflow-hidden relative"
            onClick={() => push(`/cursos/${heroCourse.id}`)}
          >
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
               <Icons.Play className="w-64 h-64 text-black rotate-12" />
            </div>

            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                
                {/* Image Section */}
                <div className="relative md:w-2/5 h-64 md:h-auto">
                  <img 
                    src={heroCourse.thumbnail} 
                    alt={heroCourse.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-all">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Icons.Play className="w-8 h-8 text-white fill-white translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-black/20 text-black border-none backdrop-blur-sm px-3 py-1">
                      Continue Assistindo
                    </Badge>
                    <span className="text-black/60 font-semibold text-sm flex items-center gap-1">
                      <Icons.Clock className="w-3 h-3" />
                      Restam {Math.round((100 - heroCourse.progress) * 0.5)} min
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 leading-tight">
                    {heroCourse.title}
                  </h3>
                  
                  <p className="text-black/80 font-medium text-lg mb-6">
                    Módulo {heroCourse.completedModules + 1}: Aula Prática
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between items-end text-black/70 font-semibold text-sm">
                      <span>Progresso Geral</span>
                      <span>{heroCourse.progress}%</span>
                    </div>
                    {/* Custom Dark Progress Bar for Gold Card */}
                    <div className="h-3 w-full overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full bg-black transition-all duration-500 ease-out"
                        style={{ width: `${heroCourse.progress}%` }}
                      />
                    </div>
                    <div className="pt-4">
                      <Button className="bg-black text-white border-none hover:bg-zinc-900 w-full sm:w-auto h-12 px-8 font-bold shadow-xl">
                        Continuar Agora
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Secondary In Progress Section */}
      {otherInProgress.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
            <Icons.Play className="w-4 h-4 text-amber-500" />
            Outros em andamento
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {otherInProgress.map(course => (
              <Card key={course.id} className="group hover:border-zinc-600 cursor-pointer transition-all" onClick={() => push(`/cursos/${course.id}`)}>
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-48 h-48 sm:h-auto relative shrink-0">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <Icons.Play className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CardContent className="flex-1 flex flex-col justify-center p-5">
                    <div className="flex justify-between items-start mb-2">
                       <Badge variant="gold">{course.category}</Badge>
                       <span className="text-xs text-zinc-500">{course.duration}</span>
                    </div>
                    <h4 className="font-bold text-white text-lg mb-1">{course.title}</h4>
                    <p className="text-sm text-zinc-400 mb-4">{course.instructor}</p>
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-300">Progresso</span>
                        <span className="text-amber-500">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Courses Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
          <Icons.GraduationCap className="w-5 h-5 text-amber-500" />
          Explorar Cursos
        </h3>
        
        {/* Simple Category Filter Mockup */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
           {['Todos', 'Corte', 'Negócios', 'Técnica', 'Química'].map((cat, i) => (
             <button key={cat} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${i === 0 ? 'bg-zinc-100 text-zinc-900 font-medium' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>
               {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreCourses.map(course => (
            <Card key={course.id} className="flex flex-col h-full group hover:border-zinc-600 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-amber-500/5">
              <div className="relative h-48 overflow-hidden">
                 <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute top-3 right-3">
                    <Badge className="bg-black/60 backdrop-blur-sm border-none text-white">{course.category}</Badge>
                 </div>
              </div>
              <CardContent className="flex-1 flex flex-col p-5">
                <h4 className="font-bold text-white text-lg mb-2 line-clamp-2">{course.title}</h4>
                <p className="text-sm text-zinc-400 mb-4">{course.instructor}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center text-xs text-zinc-500 gap-1">
                    <Icons.Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 gap-1">
                    <Icons.BookOpen className="w-3 h-3" />
                    {course.totalModules} Módulos
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};