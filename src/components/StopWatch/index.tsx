import {getTimeFormat} from "../../utils";
import {useStopWatch} from "../../hooks/useStopWatch";

export const StopWatch = () =>{
    const {duration, start, stop, reset} = useStopWatch()

    return (
        <section className='w-fit p-10 text-center border-r'>
            <h1 className='font-bold text-lg'>⏱️ 스탑워치</h1>

            <div className='text-2xl py-10 font-semibold'>{getTimeFormat(duration)}</div>

            <div className='flex gap-3'>
                <button onClick={start} className='btn btn-sm btn-primary'>START</button>
                <button onClick={stop} className='btn btn-sm btn-error'>STOP</button>
                <button onClick={reset} className='btn btn-sm'>RESET</button>
            </div>
        </section>)

}