import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(onExpire: () => void, seconds = 8) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (ref.current) clearInterval(ref.current);
  }, []);

  const reset = useCallback(() => {
    if (ref.current) clearInterval(ref.current);
    setTimeLeft(seconds);
    ref.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (ref.current) clearInterval(ref.current);
          onExpire();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [seconds, onExpire]);

  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);

  return { timeLeft, stop, reset };
}
