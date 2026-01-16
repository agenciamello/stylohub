import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, ProgressBar } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';
import { Course, Lesson, Module } from '../../types';

// --- Internal Video Player Component ---
const CoursePlayer: React.FC<{ course: Course; onBack: () => void; }> = ({ course, onBack }) => {
  const { completeLesson } = useStore();
  
  // Find first uncompleted lesson to be active by default, or just the first one
  const getInitialLesson = (): { lesson: Lesson, moduleId: string } | null => {
    if (!course.modules || course.modules.length === 0) return null;
    
    for (const mod of course.modules) {
        for (const less of mod.lessons) {
            if (!less.isCompleted) return { lesson: less, moduleId: mod.id };
        }
    }
    // All completed? Return first.
    return { lesson: course.modules[0].lessons[0], moduleId: course.modules[0].id };
  };

  const [activeData, setActiveData] = useState<{ lesson: Lesson, moduleId: string } | null>(getInitialLesson());
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    setVideoLoading(true);
  }, [activeData?.lesson.id]);

  const handleLessonSelect = (modId: string, lesson: Lesson) => {
     setActiveData({ lesson, moduleId: modId });
     // Scroll top on mobile
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = () => {
    if (activeData) {
        completeLesson(course.id, activeData.moduleId, activeData.lesson.id);
        // Optional: Auto-advance could be implemented here
    }
  };

  if (!activeData) return <div className="text-white">Curso sem conteúdo.</div>;

  const { lesson: activeLesson } = activeData;

  // Calculate stats
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);

  return (
    <div className="animate-slide-in space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-zinc-400 hover:text-white pl-0">
          <Icons.ArrowLeft className="w-5 h-5 mr-1" />
          Voltar para Catálogo
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT COLUMN: Player & Details */}
          <div className="lg:w-2/3 space-y-6">
             
             {/* Player Wrapper */}
             <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 ring-1 ring-white/10 group">
                
                {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                        <div className="flex flex-col items-center gap-3 animate-pulse">
                            <Icons.Play className="w-12 h-12 text-amber-500" />
                            <span className="text-zinc-500 text-sm font-medium">Carregando aula...</span>
                        </div>
                    </div>
                )}

                {activeLesson.provider === 'youtube' && activeLesson.videoId ? (
                   <iframe 
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${activeLesson.videoId}?rel=0&modestbranding=1&autoplay=0`}
                        title={activeLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => setVideoLoading(false)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-zinc-500" onLoad={() => setVideoLoading(false)}>
                        <Icons.Lock className="w-12 h-12 mb-2" />
                        <p>Vídeo indisponível ou formato não suportado.</p>
                    </div>
                )}
             </div>
             
             {/* Fallback Link */}
             {activeLesson.provider === 'youtube' && (
                 <div className="text-right">
                    <a 
                        href={`https://www.youtube.com/watch?v=${activeLesson.videoId}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-zinc-500 hover:text-amber-500 underline"
                    >
                        Problemas com o vídeo? Abrir no YouTube
                    </a>
                 </div>
             )}

             {/* Lesson Info & Actions */}
             <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                   <h1 className="text-2xl font-bold text-white mb-2 leading-tight">{activeLesson.title}</h1>
                   <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                      <span className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded">
                         <Icons.User className="w-3 h-3 text-amber-500" /> {course.instructor}
                      </span>
                      <span className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded">
                         <Icons.Clock className="w-3 h-3 text-amber-500" /> {activeLesson.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded text-amber-400 font-medium">
                         <Icons.Award className="w-3 h-3" /> +{activeLesson.xpReward} XP
                      </span>
                   </div>
                   {activeLesson.description && (
                       <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-2xl">
                           {activeLesson.description}
                       </p>
                   )}
                </div>

                <div className="shrink-0">
                    {!activeLesson.isCompleted ? (
                        <Button 
                            variant="gold" 
                            className="w-full sm:w-auto shadow-lg shadow-amber-500/20"
                            onClick={handleCompleteLesson}
                        >
                            <Icons.CheckCircle className="w-4 h-4 mr-2" />
                            Concluir Aula
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2.5 rounded-xl border border-emerald-500/20 font-medium cursor-default">
                             <Icons.CheckCircle className="w-5 h-5 fill-emerald-500/20" />
                             Aula Concluída
                        </div>
                    )}
                </div>
             </div>

          </div>

          {/* RIGHT COLUMN: Curriculum */}
          <div className="lg:w-1/3">
             <Card className="sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col">
                <CardHeader className="bg-zinc-900 border-b border-zinc-800 pb-4">
                   <CardTitle className="text-lg">Conteúdo do Curso</CardTitle>
                   <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-zinc-400">
                         <span>{completedLessons}/{totalLessons} Aulas</span>
                         <span>{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} className="h-1.5" />
                   </div>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto custom-scrollbar flex-1">
                   <div className="divide-y divide-zinc-800">
                      {course.modules?.map((module, modIndex) => (
                          <div key={module.id} className="bg-zinc-900/30">
                              <div className="px-4 py-3 bg-zinc-900/80 sticky top-0 z-10 backdrop-blur-sm border-b border-zinc-800/50">
                                  <h4 className="text-sm font-semibold text-zinc-300">Módulo {modIndex + 1}: {module.title}</h4>
                              </div>
                              <div>
                                  {module.lessons.map((lesson, lessonIndex) => {
                                      const isActive = activeLesson.id === lesson.id;
                                      return (
                                          <button
                                              key={lesson.id}
                                              onClick={() => handleLessonSelect(module.id, lesson)}
                                              className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-zinc-800/50 ${isActive ? 'bg-amber-500/10 border-l-2 border-amber-500' : 'border-l-2 border-transparent'}`}
                                          >
                                              <div className="mt-0.5">
                                                  {lesson.isCompleted ? (
                                                      <Icons.CheckCircle className="w-4 h-4 text-emerald-500" />
                                                  ) : isActive ? (
                                                      <Icons.Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                  ) : (
                                                      <div className="w-4 h-4 rounded-full border border-zinc-600 flex items-center justify-center text-[8px] text-zinc-500">
                                                          {lessonIndex + 1}
                                                      </div>
                                                  )}
                                              </div>
                                              <div className="flex-1">
                                                  <p className={`text-sm font-medium ${isActive ? 'text-amber-500' : lesson.isCompleted ? 'text-zinc-400' : 'text-zinc-200'}`}>
                                                      {lesson.title}
                                                  </p>
                                                  <span className="text-xs text-zinc-500 mt-1 block">{lesson.duration}</span>
                                              </div>
                                          </button>
                                      );
                                  })}
                              </div>
                          </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </div>

      </div>
    </div>
  );
};


// --- Main Academy Tab ---
export const AcademyTab: React.FC = () => {
  const { courses, setDashboardTab } = useStore();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Determine current view for Player
  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  // Filter Logic
  const displayedCourses = useMemo(() => {
      let list = courses;
      if (selectedCategory !== 'Todos') {
          list = list.filter(c => c.category === selectedCategory);
      }
      return list;
  }, [courses, selectedCategory]);

  // If a course is selected, show the player
  if (selectedCourse) {
    return (
      <CoursePlayer 
        course={selectedCourse} 
        onBack={() => setSelectedCourseId(null)} 
      />
    );
  }

  // Calculate generic stats for the dashboard view
  const activeCourse = courses.find(c => c.progress > 0 && c.progress < 100);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">StyloHub Academy</h2>
          <p className="text-zinc-400 mt-1">Evolua sua carreira com cursos exclusivos.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setDashboardTab('certificates')}>
          <Icons.Award className="w-4 h-4 mr-2 text-amber-500" />
          Meus Certificados
        </Button>
      </div>

      {/* Hero / Active Course Widget */}
      {activeCourse && (
          <div 
            onClick={() => setSelectedCourseId(activeCourse.id)}
            className="relative bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-800 shadow-xl overflow-hidden group cursor-pointer"
          >
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/50 to-transparent z-0"></div>
              <img 
                  src={activeCourse.thumbnail} 
                  alt="Background" 
                  className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-4 max-w-xl">
                      <Badge className="bg-amber-500 text-black border-none hover:bg-amber-400">Continue Assistindo</Badge>
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{activeCourse.title}</h3>
                          <p className="text-zinc-400 text-sm">Instrutor: {activeCourse.instructor}</p>
                      </div>
                      <div className="space-y-2 max-w-sm">
                          <div className="flex justify-between text-xs text-zinc-400">
                              <span>Progresso</span>
                              <span>{activeCourse.progress}%</span>
                          </div>
                          <ProgressBar value={activeCourse.progress} />
                      </div>
                  </div>
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-all shadow-lg shrink-0">
                      <Icons.Play className="w-6 h-6 fill-current" />
                  </div>
              </div>
          </div>
      )}

      {/* Catalog Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
           <h3 className="text-lg font-semibold text-zinc-200">Catálogo de Cursos</h3>
           
           {/* Category Filter */}
           <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto hide-scrollbar">
                {['Todos', 'Corte', 'Negócios'].map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors border ${selectedCategory === cat ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-medium' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
                  >
                    {cat}
                  </button>
                ))}
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(course => (
              <Card 
                key={course.id} 
                className="group hover:border-amber-500/30 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/10 flex flex-col h-full" 
                onClick={() => setSelectedCourseId(course.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 flex gap-2">
                      {course.isPartner && <Badge variant="gold" className="shadow-lg">Parceiro</Badge>}
                      <Badge className="bg-black/60 backdrop-blur-sm border-none text-white">{course.category}</Badge>
                  </div>
                  {/* Progress Overlay */}
                  {course.progress > 0 && (
                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800/50">
                        <div className="h-full bg-amber-500" style={{ width: `${course.progress}%` }}></div>
                     </div>
                  )}
                </div>
                
                <CardContent className="flex-1 flex flex-col p-5">
                  <h4 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">{course.title}</h4>
                  <p className="text-sm text-zinc-400 mb-4">{course.instructor}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center text-xs text-zinc-500 gap-1.5">
                      <Icons.List className="w-3.5 h-3.5" />
                      {course.modules ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 0} Aulas
                    </div>
                    <div className="flex items-center text-xs text-zinc-500 gap-1.5">
                      <Icons.Clock className="w-3.5 h-3.5" />
                      {course.duration}
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