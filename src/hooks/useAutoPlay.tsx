import { useEffect } from 'react';

export const useAutoPlay = (
  isActive: boolean,
  callback: () => void,
  intervalDuration = 6000
) => {
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(callback, intervalDuration);
    return () => clearInterval(interval);
  }, [isActive, callback, intervalDuration]);
};
