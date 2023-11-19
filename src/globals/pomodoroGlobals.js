const ms = require('ms');
const { Client, GatewayIntentBits } = require("discord.js");

const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });

const ALLOWED_CHANNELS = 'group-pomodoro'

const POMODORO_TIMING_DETAILS = {
    WORK_DURATION: ms('25m'),
    SHORT_BREAK_DURATION: ms('5m'),
    LONG_BREAK_DURATION: ms('20m'),
}

// const POMODORO_TIMING_DETAILS = {
//     WORK_DURATION: ms('4s'),
//     SHORT_BREAK_DURATION: ms('3s'),
//     LONG_BREAK_DURATION: ms('5s'),
// }

const INACTIVITY_ALARM_TIMEOUT = ms('2m')

const POMODORO_STATUS = {
    WORK_TIME_STATUS: "Time to be productive!",
    SHORT_BREAK_STATUS: "Time for a short break, you deserve it!",
    LONG_BREAK_STATUS: "Well done, long break time, enjoy it",
}

const POMODORO_PERIODS = {
    FIRST_PERIOD: "first period",
    SECOND_PERIOD: "second period",
    THIRD_PERIOD: "third period",
    FORTH_PERIOD: "forth period",
}

const INTENTS = {
    SKIP_AND_START: "skip and start",
    START: "start",
}

const POMODORO_SKIP_CODES = {
    CURRENT: 0,
    CURRENT_AND_START: 1,
    ONE_PERIOD: 2,
    ONE_PERIOD_AND_START: 3,
    TWO_PERIODS: 4,
    TWO_PERIODS_AND_START: 5,
    THREE_PERIODS: 6,
    THREE_PERIODS_AND_START: 7
}

const POMODORO_RESET_CODES = {
    NO: 0,
    YES: 1
}

let pomodoroActivityDetails = {
    isTimerPaused: true,
    isPomodoroActive: false,
    pomodoroCounter: 1,
    pomodoroTimerintervalId: null,
    followUpTimerintervalId: null,
    inactivityAlarmTimerId: null,
    remainingTime: POMODORO_TIMING_DETAILS.WORK_DURATION,
    currentPomodoroStatus: POMODORO_STATUS.WORK_TIME_STATUS
}

module.exports = { POMODORO_TIMING_DETAILS, POMODORO_PERIODS, POMODORO_STATUS, POMODORO_SKIP_CODES, pomodoroActivityDetails, CLIENT, ALLOWED_CHANNELS, INTENTS, INACTIVITY_ALARM_TIMEOUT, POMODORO_RESET_CODES }
