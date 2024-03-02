export enum TimeStatus {
    Minute,
    Second ,
    MilliSecond ,
}

export type TimerInfo = {
    duration:number,
    time:TimeStatus
}

export enum ActionStatus {
    CHANGE_DURATION,
    CHANGE_TIME
}