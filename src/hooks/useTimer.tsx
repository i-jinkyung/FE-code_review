import {useEffect, useReducer, useRef, useState} from "react";
import {ActionStatus, TimerInfo, TimeStatus} from "../types/timerType";


type TimerDurationAction = {
    type: ActionStatus.CHANGE_DURATION,
    payload: number,
}

type TimerStatusAction = {
    type: ActionStatus.CHANGE_TIME
    payload:TimeStatus ,
}
const timeReducer =(state:TimerInfo, action:TimerDurationAction|TimerStatusAction) =>{
    switch (action.type){
        case ActionStatus.CHANGE_DURATION:
            return {...state, duration:action.payload};
        case ActionStatus.CHANGE_TIME:
            return {...state, time:action.payload};
        default :
            return {...state}
    }
}
export const useTimerInfo = () =>{
    const [timerInfo, dispatch] = useReducer(timeReducer, { duration: 0, time: TimeStatus.Minute });

    const changeDuration = (duration: number) =>
        dispatch({ type: ActionStatus.CHANGE_DURATION, payload: duration });
    const changeTimeStatus = (time:TimeStatus) =>
        dispatch({type: ActionStatus.CHANGE_TIME, payload: time});

    return {changeDuration, changeTimeStatus, timerInfo}
}

const getTimeStamp = (timerInfo:TimerInfo) => {
    const 초 = 1000;
    const 분 =  초 * 60
    const {duration, time} = timerInfo;

    if(time === TimeStatus.Minute) return duration * 분;
    if(time === TimeStatus.Second) return duration * 초;
    return duration
}
export const useTimer = (timerInfo : TimerInfo)=>{
    const [currentTime, setCurrentTime] = useState(0)
    const [targetTime, setTargetTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const timerRef = useRef(0)

    const duration = targetTime - currentTime

    const play = () => {
        setCurrentTime(() => Date.now());
        timerRef.current = requestAnimationFrame(play);
    }

    const start = () => {
        if (isRunning) return

        setIsRunning(true)
        setTargetTime(Date.now() + getTimeStamp(timerInfo));
        setCurrentTime(Date.now());
        play();
    }

    const stop = () =>{
        if(!isRunning) return;

        setIsRunning(false)
        cancelAnimationFrame(timerRef.current);
    }

    const reset = () => {
        setTargetTime(Date.now())
        setCurrentTime(Date.now())
    }

    useEffect(() => {
        if(duration >0) return;

        stop()
        reset()
        alert('타이머가 종료되었습니다.')

    }, [duration]);

    return {duration, start, stop, reset}
}