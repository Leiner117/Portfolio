"use client";
import { useEffect, useRef, useState } from "react";

type UseTypingResult = {
  display: string;
  finished: boolean;
  typing: boolean;
};

export const useTyping = (text: string, speed = 50, start = true): UseTypingResult => {
  const [display, setDisplay] = useState("");
  const [finished, setFinished] = useState(false);
  const [typing, setTyping] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start || finished) return;
    if (!text) {
      setDisplay("");
      setFinished(true);
      setTyping(false);
      return;
    }

    indexRef.current = 0;
    setDisplay("");
    setTyping(true);

    intervalRef.current = window.setInterval(() => {
      indexRef.current += 1;
      setDisplay(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
  setFinished(true);
  setTyping(false);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [start, speed, text, finished]);

  return { display, finished, typing };
}
