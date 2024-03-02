import {useEffect, useReducer, useRef, useState} from "react";
import {TimerInfo, TimerStatus} from "./Timer.types";

type TimerDurationAction = {
  type: 'CHANGE_DURATION',
  payload: number,
}

type TimerStatusAction = {
  type: 'CHANGE_STATUS',
  payload: TimerStatus,
}

const timeInfoReducer = (state: TimerInfo, action: TimerDurationAction | TimerStatusAction) => {
  switch (action.type) {
    case "CHANGE_DURATION":
      return {...state, duration: action.payload,}
    case "CHANGE_STATUS":
      return {...state, timeStatus: action.payload,}
    default:
      return state
  }
}


export function useTimerInfo() {
  const [timerInfo, dispatch] = useReducer(timeInfoReducer, {duration: 0, timeStatus: TimerStatus.Minute});

  const changeTimerDuration = (value: number) => dispatch({type: 'CHANGE_DURATION', payload: value});

  const changeTimerStatus = (value: TimerStatus) => dispatch({type: 'CHANGE_STATUS', payload: value});


  return {timerInfo, changeTimerDuration, changeTimerStatus};
}


export function useTimer(timerInfo: TimerInfo) {
  const [timestamp, setTimestamp] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<number>(-1);


  const stop = () => {
    if (!running) return;

    setRunning(false)
    clearInterval(timerRef.current)
  }

  const start = () => {
    if (running) return

    setRunning(true)
    const {duration, timeStatus} = timerInfo;

    if (timeStatus === TimerStatus.MilliSecond) setTimestamp(duration / 10)
    if (timeStatus === TimerStatus.Second) setTimestamp(duration * 100)
    if (timeStatus === TimerStatus.Minute) setTimestamp(duration * 6000)

    timerRef.current = setInterval(() => {
      setTimestamp(prev => prev - 1)
    }, 10)
  }

  useEffect(() => {
    if (timestamp >= 0) return;

    stop() // 타이머 종료
    setTimestamp(0) // 시간 초기화
    alert('타이머가 종료되었습니다.')
  }, [timestamp]);

  return {timestamp, start, stop};
}
