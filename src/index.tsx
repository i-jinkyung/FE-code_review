import {memo, useEffect, useRef, useState} from "react";

enum TimeStatus {
    Minute,
    Second,
    MilliSecond
}

type TimerInfo = {
    duration:number;
    time:TimeStatus;
}

export const CodeReview = memo(()=>{
    const [stopWatchTime, setStopWatchTime] = useState<number>(0)
    const [isStopWatchRunning, setIsStopWatchRunning] = useState<boolean>(false)
    const [timerTime, setTimerTime] = useState<number>(0)
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
    const [timerInfo, setTimerInfo] = useState<TimerInfo>({
        duration:0,
        time:TimeStatus.Minute
    })
    const stopWatchRef = useRef<number>(-1);
    const timerRef = useRef<number>(-1);


    useEffect(() => {
        if(timerTime >= 0) return;

        stopTimer() // 타이머 종료
        setTimerTime(0) // 시간 초기화
        alert('타이머가 종료되었습니다.')
    }, [timerTime]);


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

    // 타이머 정지 함수
    const stopTimer = ()=>{
        if(!isTimerRunning) return;

        setIsTimerRunning(false)
        clearInterval(timerRef.current)
    }

    // 타이머 실행 함수
    const startTimer = ()=>{
        if(isTimerRunning) return

        setIsTimerRunning(true)
        const {duration, time} = timerInfo;

        if(time === TimeStatus.MilliSecond) setTimerTime(duration/10)
        if(time === TimeStatus.Second) setTimerTime(duration * 100)
        if(time === TimeStatus.Minute) setTimerTime(duration * 6000)

        timerRef.current = setInterval(()=>{
            setTimerTime(prev => prev - 1)
        },10)
    }

    // 시간 포맷팅 함수
    const getTimeFormat =(duration:number):string=>{
        const milliseconds = String(duration % 100).padStart(2, '0');
        const seconds = String(Math.floor((duration / 100) % 60)).padStart(2, '0');
        const minutes = String(Math.floor(duration / (100 * 60))).padStart(2, '0');

        return `${minutes} : ${seconds} : ${milliseconds}`
    }

    return (
        <>
            <div>
                <h1>스탑워치</h1>
                <div>{getTimeFormat(stopWatchTime)}</div>
                <div >
                    <button onClick={()=>startStopWatch()}>START</button>
                    <button onClick={()=>stopStopWatch()}>STOP</button>
                    <button onClick={()=>setStopWatchTime(0)}>RESET</button>
                </div>
            </div>

            <br />
            <br />

            <div>
                <h1>타이머</h1>
                <div>
                    <h2>시간설정</h2>
                    <input
                        type='number'
                        placeholder='시간을 입력해주세요'
                        defaultValue={timerInfo.duration}
                        onChange={(e) =>
                            setTimerInfo((prev) => ({
                                ...prev,
                                duration:Number(e.target.value)
                            }))
                        }
                    />
                    <select
                        onChange={(e) =>
                            setTimerInfo((prev) => ({
                                ...prev,
                                time:Number(e.target.value)
                            }))
                        }
                        defaultValue={timerInfo.time}>
                        <option value={TimeStatus.Minute}>분</option>
                        <option value={TimeStatus.Second}>초</option>
                        <option value={TimeStatus.MilliSecond}>밀리 초</option>
                    </select>
                </div>
                <br />
                <div>{getTimeFormat(timerTime)}</div>
                <div >
                    <button onClick={()=>startTimer()}>START</button>
                    <button onClick={()=>stopTimer()}>STOP</button>
                </div>
            </div>
        </>
    )
})
