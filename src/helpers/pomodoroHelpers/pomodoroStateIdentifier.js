const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

function pomodoroStateIdentifier(counter)
{
    switch (true)
    {
        // If the counter is odd, it's time to work
        case pomodoroActivityDetails.pomodoroCounter % 2 !== 0:
            return POMODORO_STATUS.WORK_TIME_STATUS
        // If the counter is even and not 8, it's time for a short break
        case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter !== 8:
            return POMODORO_STATUS.SHORT_BREAK_STATUS

        // If the counter is even and 8, it's time for a long break
        case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter === 8:
            return POMODORO_STATUS.LONG_BREAK_STATUS

        // Handle any invalid pomodoro counter values
        default:
            return POMODORO_STATUS.WORK_TIME_STATUS
    }
}

module.exports = { pomodoroStateIdentifier }
