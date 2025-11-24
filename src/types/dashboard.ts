export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  xp: number;
  nextLevelXp: number;
  avatarUrl: string;
  bio?: string;
  rating?: number;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number; // 0-100
  totalModules: number;
  completedModules: number;
  duration: string;
  category: string;
}

export enum AppointmentStatus {
  CONFIRMED = 'Confirmado',
  PENDING = 'Pendente',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  date: string; // YYYY-MM-DD
  duration: number; // minutes
  price: number;
  status: AppointmentStatus;
  avatarUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}