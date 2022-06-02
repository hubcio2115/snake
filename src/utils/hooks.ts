import { useEffect, useRef } from 'react';

// I found this hook in this article:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/#extracting-a-hook

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
