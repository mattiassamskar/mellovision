import { useState, useEffect } from "react";
import { Vote } from "./types";

export const calculateVoteScore = (vote: Vote) => {
  return vote.music * 3 + vote.performance * 2 + vote.clothes * 1;
};

export const useDebounce = <T extends unknown>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
