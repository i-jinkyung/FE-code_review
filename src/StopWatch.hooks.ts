import {useRef, useState} from "react";

export function useStopWatch() {
  const [startTimestamp, setStartTimestamp] = useState(Date.now());
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());
  const currentTimer = useRef(-1);

  const timestamp = currentTimestamp - startTimestamp;

  const stop = () => cancelAnimationFrame(currentTimer.current);
  const play = () => {
    setCurrentTimestamp(Date.now());
    currentTimer.current = requestAnimationFrame(play);
  }

  const start = () => play();

  const reset = () => {
    stop();
    setStartTimestamp(Date.now());
    setCurrentTimestamp(Date.now());
  }

  return {timestamp, start, stop, reset};
}
