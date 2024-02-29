import {memo, useRef, useState} from "react";

export const CodeReview = memo(()=>{
    const [stopWatchTime, setStopWatchTime] = useState<number>(0)
    const [isStopWatchRunning, setIsStopWatchRunning] = useState<boolean>(false)
    const stopWatchRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    // 스탑워치 실행 함수
    const startStopWatch = ()=>{
        if(isStopWatchRunning) return;

        setIsStopWatchRunning(true)
        stopWatchRef.current = setInterval(()=>{setStopWatchTime(prev=> prev + 1)},10)
    }

    // 스탑워치 정지 함수
    const stopStopWatch = () => {
        if(!isStopWatchRunning) return;

        setIsStopWatchRunning(false)
        clearInterval(stopWatchRef.current)
    }

    // 시간 포맷팅 함수
    const getTimeFormat =(duration:number):string=>{
        const milliseconds = String(duration % 100).padStart(2, '0');
        const seconds = String(Math.floor((duration / 100) % 60)).padStart(2, '0');
        const minutes = String(Math.floor(duration / (100 * 60))).padStart(2, '0');

        return `${minutes} : ${seconds} : ${milliseconds}`
    }

    return (
            <div>
                <h1>스탑워치</h1>
                <div>{getTimeFormat(stopWatchTime)}</div>
                <div >
                    <button onClick={()=>startStopWatch()}>START</button>
                    <button onClick={()=>stopStopWatch()}>STOP</button>
                    <button onClick={()=>setStopWatchTime(0)}>RESET</button>
                </div>
            </div>
    )
})