import { useCallback } from 'react';

export const useRouter = () => {
  const push = useCallback((path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom or next/navigation
    // For this demo, we just log it or could change window.location.hash
    window.location.hash = path;
  }, []);

  return { push };
};