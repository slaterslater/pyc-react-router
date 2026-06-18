import { useCallback, useState } from 'react';

export function useCyclicCounter(max: number, initial: number = 0) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => {
    setCount((c) => (c < max - 1 ? c + 1 : 0));
  }, [max]);

  const decrement = useCallback(() => {
    setCount((c) => (c > 0 ? c - 1 : max - 1));
  }, [max]);

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  return { count, increment, decrement, reset, setCount };
}