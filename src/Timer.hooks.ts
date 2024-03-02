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

const getTargetTimestamp = ({duration, timeStatus}: TimerInfo) => {
  const 초 = 1000;
  const 분 = 초 * 60;

  if (timeStatus === TimerStatus.Minute) return duration * 분;
  if (timeStatus === TimerStatus.Second) return duration * 초;
  return duration;
}


export function useTimerInfo() {
  const [timerInfo, dispatch] = useReducer(timeInfoReducer, {duration: 0, timeStatus: TimerStatus.Minute});

  const changeTimerDuration = (value: number) => dispatch({type: 'CHANGE_DURATION', payload: value});

  const changeTimerStatus = (value: TimerStatus) => dispatch({type: 'CHANGE_STATUS', payload: value});


  return {timerInfo, changeTimerDuration, changeTimerStatus};
}


export function useTimer(timerInfo: TimerInfo) {
  const [targetTimestamp, setTargetTimestamp] = useState(0);
  const [currentTimestamp, setCurrentTimestamp] = useState(0);
  const [running, setRunning] = useState(false)
  const timerRef = useRef(-1);

  const timestamp = targetTimestamp - currentTimestamp;

  const reset = () => {
    setTargetTimestamp(0);
    setCurrentTimestamp(0);
  }

  const stop = () => {
    if (!running) return;

    setRunning(false)
    cancelAnimationFrame(timerRef.current)
  }

  const play = () => {
    setCurrentTimestamp(() => Date.now());
    timerRef.current = requestAnimationFrame(play);
  }

  const start = () => {
    if (running) return
    setRunning(true)
    setTargetTimestamp(Date.now() + getTargetTimestamp(timerInfo));
    setCurrentTimestamp(Date.now());
    play();
  }

  useEffect(() => {
    if (timestamp >= 0) return;

    stop();
    reset();
    alert('타이머가 종료되었습니다.')
  }, [timestamp]);

  return {timestamp, start, stop};
}
