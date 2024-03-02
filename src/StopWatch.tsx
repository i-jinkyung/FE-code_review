import {useRef, useState} from "react";
import {getTimeFormat} from "./utils";

export default function StopWatch() {
  const [stopWatchTime, setStopWatchTime] = useState(0)
  const [isStopWatchRunning, setIsStopWatchRunning] = useState(false)
  const stopWatchRef = useRef<number>(-1);

  const start = () => {
    if (isStopWatchRunning) return;

    setIsStopWatchRunning(true)
    stopWatchRef.current = setInterval(() => {
      setStopWatchTime(prev => prev + 1)
    }, 10)
  }

  const stop = () => {
    setIsStopWatchRunning(false)
    clearInterval(stopWatchRef.current)
  }

  const reset = () => {
    setIsStopWatchRunning(false)
    clearInterval(stopWatchRef.current)
  }

  return (
    <div>
      <h1>스탑워치</h1>
      <div>{getTimeFormat(stopWatchTime)}</div>
      <div>
        <button onClick={start}>START</button>
        <button onClick={stop}>STOP</button>
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
