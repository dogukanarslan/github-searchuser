import { useEffect, useState } from 'react';

export const useDebouncedValue = (value: string, delay = 2000) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
