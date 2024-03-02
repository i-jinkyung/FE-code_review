import {getTimeFormat} from "./utils";
import {useTimer, useTimerInfo} from "./Timer.hooks.ts";
import {ChangeEvent} from "react";
import {TimerStatus} from "./Timer.types.ts";


export default function Timer() {
  const {timerInfo, changeTimerDuration, changeTimerStatus} = useTimerInfo();
  const {timestamp, start, stop} = useTimer(timerInfo);

  const handleChangeDuration = (e: ChangeEvent<HTMLInputElement>) => changeTimerDuration(Number(e.target.value));
  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => changeTimerStatus(Number(e.target.value) as TimerStatus);

  return (
    <div>
      <h1>타이머</h1>
      
      <div>
        <h2>시간설정</h2>
        <input
          type='number'
          placeholder='시간을 입력해주세요'
          defaultValue={timerInfo.duration}
          onChange={handleChangeDuration}
        />
        <select
          onChange={handleChangeStatus}
          defaultValue={timerInfo.timeStatus}>
          <option value={TimerStatus.Minute}>분</option>
          <option value={TimerStatus.Second}>초</option>
          <option value={TimerStatus.MilliSecond}>밀리 초</option>
        </select>
      </div>

      <br/>

      <div>{getTimeFormat(timestamp)}</div>
      <div>
        <button onClick={start}>START</button>
        <button onClick={stop}>STOP</button>
      </div>
    </div>
  )
}
