import { useState, useEffect, useCallback } from 'react';
import { User, Appointment, Course, AppointmentStatus } from '@/types/dashboard';
import { MOCK_USER, MOCK_APPOINTMENTS, MOCK_COURSES } from '@/dashboard/constants';

// Simple event emitter for "global" state simulation without Context for simplicity in this demo
const listeners:  Set<() => void> = new Set();

let globalState = {
  user: MOCK_USER,
  appointments: MOCK_APPOINTMENTS,
  courses: MOCK_COURSES,
  notifications: [] as any[],
};

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const useStore = () => {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    const listener = () => setState({ ...globalState });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const updateXP = useCallback((amount: number) => {
    globalState = {
      ...globalState,
      user: {
        ...globalState.user,
        xp: globalState.user.xp + amount
      }
    };
    notifyListeners();
  }, []);

  const completeAppointment = useCallback((id: string) => {
    const appt = globalState.appointments.find(a => a.id === id);
    if (appt && appt.status !== AppointmentStatus.COMPLETED) {
      // Update appointment status
      const updatedAppointments = globalState.appointments.map(a => 
        a.id === id ? { ...a, status: AppointmentStatus.COMPLETED } : a
      );
      
      // Update state
      globalState = {
        ...globalState,
        appointments: updatedAppointments,
      };
      notifyListeners();
      
      // Add XP
      updateXP(50);
    }
  }, [updateXP]);

  return {
    user: state.user,
    appointments: state.appointments,
    courses: state.courses,
    completeAppointment,
    updateXP
  };
};