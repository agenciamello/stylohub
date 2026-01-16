export interface UserPreferences {
  avgPrice: number;
  clientsPerDay: number;
  daysPerWeek: number;
}

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
  city?: string;
  preferences?: UserPreferences;
}

export type CourseProvider = 'internal' | 'youtube' | 'youtube_playlist' | 'gdrive';

export interface Lesson {
  id: string;
  title: string;
  duration: string; // ex: "10:00"
  provider: CourseProvider;
  videoId?: string; // YouTube ID
  fileId?: string; // For other providers
  xpReward: number;
  isCompleted: boolean;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number; // 0-100 (Calculated based on completed lessons)
  totalModules: number;
  completedModules: number; // Deprecated in favor of dynamic calculation, but kept for compatibility
  duration: string;
  category: string;
  description?: string;
  isPartner?: boolean;
  modules: Module[]; // New Structure
}

export enum AppointmentStatus {
  SCHEDULED = 'Agendado',
  CONFIRMED = 'Confirmado',
  PENDING = 'Pendente',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado',
  NO_SHOW = 'Faltou'
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
  cancellationAccepted?: boolean; // Policy acceptance
  confirmedAt?: string;
  createdAt?: string;
}

export interface ClientHistory {
  date: string;
  service: string;
  price: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  notes?: string;
  history: ClientHistory[];
}

export interface NotificationJob {
  id: string;
  appointmentId: string;
  type: 'confirm_request' | 'reminder_24h' | 'reminder_2h';
  scheduledFor: number; // timestamp
  processed: boolean;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: number;
  read: boolean;
  appointmentId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}