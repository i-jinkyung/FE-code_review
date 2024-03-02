import {getTimeFormat} from "./utils";
import {useStopWatch} from "./StopWatch.hooks.ts";

export default function StopWatch() {
  const {time, start, stop, reset} = useStopWatch();

  return (
    <div>
      <h1>스탑워치</h1>
      <div>{getTimeFormat(time)}</div>
      <div>
        <button onClick={start}>START</button>
        <button onClick={stop}>STOP</button>
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
