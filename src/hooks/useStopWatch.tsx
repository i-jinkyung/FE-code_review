import {useRef, useState} from "react";

export const useStopWatch = () => {
    const [currentTime, setCurrentTime] = useState(Date.now())
    const [startTime, setStartTime] = useState(Date.now())
    const [isRunning, setIsRunning] = useState(false);
    const timeRef = useRef(0)

    const duration = currentTime - startTime;

    const play = () =>{
        if(isRunning) return;

        setIsRunning(true)
        setCurrentTime(Date.now())
        timeRef.current = requestAnimationFrame(play)
    }

    const stop = () =>{
        if(!isRunning) return;

        setIsRunning(false)
        cancelAnimationFrame(timeRef.current)
    }

    const start = () => play()

    const reset = () => {
        setCurrentTime(Date.now)
        setStartTime(Date.now)
    }

    return {start, stop, reset, duration}
}