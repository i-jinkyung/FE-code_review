export enum TimerStatus {
  Minute,
  Second,
  MilliSecond
}

export type TimerInfo = {
  duration: number;
  timeStatus: TimerStatus;
}
