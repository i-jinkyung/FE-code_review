import {getTimeFormat} from "../../utils";
import {TimeStatus} from "../../types/timerType";
import {useTimer, useTimerInfo} from "../../hooks/useTimer";
import {ChangeEvent} from "react";

export const Timer = () =>{
    const {changeDuration, changeTimeStatus, timerInfo} = useTimerInfo();
    const {duration, start, stop, reset} = useTimer(timerInfo)


    const onChangeDuration = (e:ChangeEvent<HTMLInputElement>) => changeDuration(Number(e.target.value))
    const onChangeTimeStatus = (e:ChangeEvent<HTMLSelectElement>) => changeTimeStatus(Number(e.target.value) as TimeStatus);



    return (
        <section className='w-fit p-10 text-center flex flex-col gap-5'>
            <h1 className='font-bold text-lg'>⏰ 타이머</h1>

            <div className='text-2xl font-semibold'>{getTimeFormat(duration)}</div>

            <div className="border border-gray-500 rounded-box p-2 max-w-xs flex items-center justify-between focus:outline-none">
                <input
                    onChange={(e)=>onChangeDuration(e)}
                    type='number'
                    placeholder='시간을 입력해주세요'
                    className='input input-sm'
                />
                <select onChange={(e)=>onChangeTimeStatus(e)} className='select select-bordered select-sm'>
                    <option value={TimeStatus.Minute}>분</option>
                    <option value={TimeStatus.Second}>초</option>
                    <option value={TimeStatus.MilliSecond}>밀리초</option>
                </select>
            </div>

            <div className='flex gap-3 w-fit mx-auto'>
                <button onClick={start} className='btn btn-sm btn-primary'>START</button>
                <button onClick={stop} className='btn btn-sm btn-error'>STOP</button>
                <button onClick={reset} className='btn btn-sm'>RESET</button>
            </div>
    </section>)
}