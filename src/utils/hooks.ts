import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current!();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
