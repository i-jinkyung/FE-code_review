import {useRef, useState} from "react";

export function useStopWatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const currentTimer = useRef(-1);

  const start = () => {
    if (running) return;

    setRunning(true)
    currentTimer.current = setInterval(() => {
      setTime(prev => prev + 1)
    }, 10)
  }

  const stop = () => {
    setRunning(false)
    clearInterval(currentTimer.current)
  }

  const reset = () => {
    setRunning(false)
    clearInterval(currentTimer.current)
  }

  return {time, start, stop, reset};
}
