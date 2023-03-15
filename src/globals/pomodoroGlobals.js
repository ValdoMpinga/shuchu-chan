const  ms = require('ms');
const { Client, GatewayIntentBits } = require("discord.js");

const CLIENT = new Client({ intents: [GatewayIntentBits.Guilds] });

// const ALLOWED_CHANNELS = 'developers-test-ground'
const ALLOWED_CHANNELS = 'pomodoro'


const POMODORO_TIMING_DETAILS = {
    WORK_DURATION: ms('10s'),
    SHORT_BREAK_DURATION: ms('5s'),
    LONG_BREAK_DURATION: ms('4s'),
}

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

const POMODORO_SKIP_CODES = {
    CURRENT: 0,
    ONE_PERIOD: 1,
    TWO_PERIODS: 2,
    THREE_PERIODS: 3
}

let pomodoroActivityDetails = {
    isTimerPaused: true,
    isPomodoroActive: false,
    pomodoroCounter: 1,
    pomodoroTimerintervalId: null,
    followUpTimerintervalId: null,
    remainingTime: POMODORO_TIMING_DETAILS.WORK_DURATION,
    currentPomodoroStatus: POMODORO_STATUS.WORK_TIME_STATUS
}

module.exports = { POMODORO_TIMING_DETAILS, POMODORO_PERIODS, POMODORO_STATUS, POMODORO_SKIP_CODES, pomodoroActivityDetails, CLIENT, ALLOWED_CHANNELS }
