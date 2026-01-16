import React from 'react';
import { Card, CardContent, Button, Badge } from '../ui/Primitives';
import { Icons } from '../ui/Icons';
import { useStore } from '../../store/useStore';

export const CertificatesTab: React.FC = () => {
  const { courses, setDashboardTab, user } = useStore();

  const completedCourses = courses.filter(c => c.progress === 100);

  return (
    <div className="space-y-6 animate-fade-in relative">
       {/* Back Button */}
      <button 
        onClick={() => setDashboardTab('academy')}
        className="flex items-center text-zinc-400 hover:text-white transition-colors mb-4"
      >
        <Icons.ArrowLeft className="w-4 h-4 mr-1" />
        Voltar para Academy
      </button>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white">Meus Certificados</h2>
        <p className="text-zinc-400 mt-2 max-w-xl mx-auto">
          Comprovantes oficiais de conclusão da StyloHub Academy. Compartilhe suas conquistas com o mundo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {completedCourses.length > 0 ? (
          completedCourses.map(course => (
            <div key={course.id} className="flex flex-col items-center">
              {/* Certificate Seal/Card Design */}
              <div className="relative group perspective-1000 w-full max-w-md">
                 <div className="relative bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                    <div className="bg-zinc-950 p-8 rounded-xl border border-amber-500/30 flex flex-col items-center text-center relative overflow-hidden">
                        
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 to-transparent pointer-events-none" />
                        
                        {/* Top Badge Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 mb-6 border-2 border-amber-100">
                           <Icons.Award className="w-8 h-8 text-black" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 mb-2">
                           {course.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mb-6 uppercase tracking-widest font-medium">Certificado de Conclusão</p>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-6"></div>

                        {/* Details */}
                        <div className="space-y-1 mb-8">
                           <p className="text-zinc-300 text-sm">Concedido a</p>
                           <p className="text-white font-bold text-lg">{user.firstName} {user.lastName}</p>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mb-8">
                             <Badge variant="gold" className="px-3 py-1 flex items-center gap-1">
                                <Icons.CheckCircle className="w-3 h-3" />
                                Verificado StyloHub
                             </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 w-full">
                           <Button className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700">
                              <Icons.Download className="w-4 h-4 mr-2" />
                              PDF
                           </Button>
                           <Button className="flex-1 bg-amber-500 text-black hover:bg-amber-400 border-none font-semibold">
                              <Icons.Share className="w-4 h-4 mr-2" />
                              Compartilhar
                           </Button>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
             <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <Icons.Award className="w-8 h-8 text-zinc-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Nenhum certificado ainda</h3>
             <p className="text-zinc-400 mb-6">Complete 100% de um curso para desbloquear seu selo de especialista.</p>
             <Button variant="gold" onClick={() => setDashboardTab('academy')}>
                Ir para Cursos
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};