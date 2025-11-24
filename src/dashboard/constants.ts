import { User, Course, Appointment, AppointmentStatus } from '@/types/dashboard';

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

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Fade Masterclass: Técnicas Avançadas',
    instructor: 'Eduardo Tesoura',
    thumbnail: 'https://picsum.photos/300/180?random=1',
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    duration: '4h 30m',
    category: 'Corte',
  },
  {
    id: 'c2',
    title: 'Gestão de Barbearia 2.0',
    instructor: 'Ana Salles',
    thumbnail: 'https://picsum.photos/300/180?random=2',
    progress: 0,
    totalModules: 8,
    completedModules: 0,
    duration: '3h 15m',
    category: 'Negócios',
  },
  {
    id: 'c3',
    title: 'Barboterapia e Relaxamento',
    instructor: 'Marcos Zen',
    thumbnail: 'https://picsum.photos/300/180?random=3',
    progress: 10,
    totalModules: 6,
    completedModules: 0,
    duration: '2h 00m',
    category: 'Técnica',
  },
  {
    id: 'c4',
    title: 'Colorimetria para Homens',
    instructor: 'Julia Colors',
    thumbnail: 'https://picsum.photos/300/180?random=4',
    progress: 0,
    totalModules: 10,
    completedModules: 0,
    duration: '5h 00m',
    category: 'Química',
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