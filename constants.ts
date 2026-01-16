import { User, Course, Appointment, AppointmentStatus, Client } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  firstName: 'Carlos',
  lastName: 'Silva',
  email: 'carlos.barber@stylohub.com',
  level: 'Master Barber',
  xp: 2450,
  nextLevelXp: 3000,
  avatarUrl: 'https://picsum.photos/150/150',
  bio: 'Barbeiro há 5 anos',
  rating: 4.8
};

// --- ACADEMY MOCK DATA ---

export const MOCK_COURSES: Course[] = [
  {
    id: 'c_fade_master',
    title: 'Fade do Zero ao Avançado (Demo)',
    instructor: 'Eduardo Tesoura',
    thumbnail: 'https://picsum.photos/600/400?random=101',
    progress: 0,
    totalModules: 3,
    completedModules: 0,
    duration: '2h 30m',
    category: 'Corte',
    description: 'Domine a arte do degradê perfeito. Aprenda marcações, uso dos pentes e como fazer a conexão perfeita com o topo.',
    isPartner: true,
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos e Marcação',
        lessons: [
          {
            id: 'l1_1',
            title: 'Introdução aos Materiais',
            duration: '05:00',
            provider: 'youtube',
            videoId: 'tgbNymZ7vqY', // Example video ID
            xpReward: 50,
            isCompleted: false,
            description: 'Conheça as máquinas e tesouras essenciais para um bom fade.'
          },
          {
            id: 'l1_2',
            title: 'Primeira Marcação (Zero Baixa)',
            duration: '12:30',
            provider: 'youtube',
            videoId: 'HyHNuVaZJ-k', // Example video ID
            xpReward: 100,
            isCompleted: false,
            description: 'Aprenda a definir a altura do fade e limpar a área inicial.'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Módulo 2: Graduação e Disfarce',
        lessons: [
          {
            id: 'l2_1',
            title: 'Técnica de Pente Corrido',
            duration: '15:00',
            provider: 'youtube',
            videoId: 'V1Z8v4bH5_I', // Example video ID
            xpReward: 150,
            isCompleted: false
          },
          {
            id: 'l2_2',
            title: 'Removendo a Marca da Zero',
            duration: '10:00',
            provider: 'youtube',
            videoId: 'KJgpSaRk_K4', // Example video ID
            xpReward: 150,
            isCompleted: false
          },
          {
            id: 'l2_3',
            title: 'Conexão com a Aresta',
            duration: '08:45',
            provider: 'youtube',
            videoId: 'J9u1_O5c_y8', // Example video ID
            xpReward: 150,
            isCompleted: false
          }
        ]
      },
      {
        id: 'm3',
        title: 'Módulo 3: Finalização',
        lessons: [
          {
            id: 'l3_1',
            title: 'Pezinho e Acabamento',
            duration: '06:00',
            provider: 'youtube',
            videoId: '3vK1h8x9mB8', // Example video ID
            xpReward: 100,
            isCompleted: false
          },
           {
            id: 'l3_2',
            title: 'Fotografia do Corte',
            duration: '04:00',
            provider: 'youtube',
            videoId: '7e90gBu4pas', // Example video ID
            xpReward: 50,
            isCompleted: false
          }
        ]
      }
    ]
  },
  {
    id: 'c_service_pro',
    title: 'Atendimento & Pós-venda (Demo)',
    instructor: 'Ana Salles',
    thumbnail: 'https://picsum.photos/600/400?random=102',
    progress: 30, // Mock initial progress
    totalModules: 2,
    completedModules: 0,
    duration: '1h 15m',
    category: 'Negócios',
    description: 'Não basta cortar bem, tem que encantar. Aprenda a fidelizar clientes e aumentar seu ticket médio.',
    modules: [
      {
        id: 'm_srv_1',
        title: 'A Experiência do Cliente',
        lessons: [
          {
            id: 'l_srv_1',
            title: 'A Recepção Perfeita',
            duration: '08:00',
            provider: 'youtube',
            videoId: 'UB1O30fR-EE',
            xpReward: 100,
            isCompleted: true // Pre-completed
          },
          {
            id: 'l_srv_2',
            title: 'Consultoria de Visagismo Básica',
            duration: '12:00',
            provider: 'youtube',
            videoId: 'Wjdr038q7J0',
            xpReward: 150,
            isCompleted: false
          }
        ]
      },
      {
        id: 'm_srv_2',
        title: 'Pós-Venda e Fidelização',
        lessons: [
          {
            id: 'l_srv_3',
            title: 'Uso do WhatsApp para Retenção',
            duration: '10:00',
            provider: 'youtube',
            videoId: 'XjV4_3J_1gI',
            xpReward: 120,
            isCompleted: false
          },
          {
            id: 'l_srv_4',
            title: 'Como pedir Avaliações',
            duration: '05:00',
            provider: 'youtube',
            videoId: 'dQw4w9WgXcQ', // Rick Roll just for fun/demo safe id
            xpReward: 80,
            isCompleted: false
          }
        ]
      }
    ]
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    clientName: 'João Victor',
    service: 'Corte Degradê + Barba',
    time: '14:00',
    date: new Date().toISOString().split('T')[0], // Today
    duration: 45,
    price: 70,
    status: AppointmentStatus.CONFIRMED,
    avatarUrl: 'https://picsum.photos/64/64?random=10'
  },
  {
    id: 'a2',
    clientName: 'Pedro Henrique',
    service: 'Corte Simples',
    time: '15:00',
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    price: 40,
    status: AppointmentStatus.PENDING,
    avatarUrl: 'https://picsum.photos/64/64?random=11'
  },
  {
    id: 'a3',
    clientName: 'Lucas Almeida',
    service: 'Barba Terapia',
    time: '16:00',
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    price: 50,
    status: AppointmentStatus.CONFIRMED,
    avatarUrl: 'https://picsum.photos/64/64?random=12'
  },
  {
    id: 'a0',
    clientName: 'Matheus Costa',
    service: 'Corte Infantil',
    time: '10:00',
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    price: 35,
    status: AppointmentStatus.COMPLETED, // Already done
    avatarUrl: 'https://picsum.photos/64/64?random=13'
  }
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'cl1',
    name: 'João Victor',
    phone: '(11) 99999-1234',
    avatarUrl: 'https://picsum.photos/64/64?random=10',
    lastVisit: '2023-10-25',
    totalVisits: 12,
    totalSpent: 840,
    notes: 'Gosta do degradê bem baixo na 0. Usar pós-barba mentolado.',
    history: [
      { date: '2023-10-25', service: 'Corte Degradê + Barba', price: 70 },
      { date: '2023-09-15', service: 'Corte Simples', price: 40 },
    ]
  },
  {
    id: 'cl2',
    name: 'Pedro Henrique',
    phone: '(11) 98888-5678',
    avatarUrl: 'https://picsum.photos/64/64?random=11',
    lastVisit: '2023-10-10',
    totalVisits: 5,
    totalSpent: 200,
    notes: 'Cliente novo, prefere tesoura no topo.',
    history: [
      { date: '2023-10-10', service: 'Corte Simples', price: 40 },
    ]
  },
  {
    id: 'cl3',
    name: 'Lucas Almeida',
    phone: '(11) 97777-9999',
    avatarUrl: 'https://picsum.photos/64/64?random=12',
    lastVisit: '2023-10-01',
    totalVisits: 20,
    totalSpent: 1200,
    notes: 'Cliente fiel. Aniversário em Novembro.',
    history: [
      { date: '2023-10-01', service: 'Barba Terapia', price: 50 },
      { date: '2023-09-01', service: 'Corte + Barba', price: 70 },
    ]
  }
];