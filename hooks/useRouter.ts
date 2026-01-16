import { useCallback } from 'react';

export const useRouter = () => {
  const push = useCallback((path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom or next/navigation
    // For this demo, we attempt to set the hash but gracefully handle environments where this is restricted (like blob URLs)
    try {
      if (typeof window !== 'undefined' && window.location) {
        window.location.hash = path;
      }
    } catch (e) {
      console.warn("Navigation update restricted in this environment:", e);
    }
  }, []);

  return { push };
};