const POMODORO_TIMING_DETAILS = {
    WORK_DURATION: 4000,
    SHORT_BREAK_DURATION: 2000,
    LONG_BREAK_DURATION: 3000,
}

const POMODORO_STATUS = {
    WORK_TIME_STATUS : "Time to be productive!",
    SHORT_BREAK_STATUS : "Time for a short break, you deserve it!",
    LONG_BREAK_STATUS : "Well done, long break time, enjoy it",
}

let pomodoroActivityDetails = {
    isTimerPaused: true,
    isPomodoroActive: false,
    pomodoroCounter: 1,
    intervalId:null,
    remainingTime: POMODORO_TIMING_DETAILS.WORK_DURATION
}

module.exports = { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails }
