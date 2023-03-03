const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

module.exports = function pomodoroReseter()
{
    clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId)
    clearInterval(pomodoroActivityDetails.followUpTimerintervalId)
    
    pomodoroActivityDetails.isTimerPaused = true
    pomodoroActivityDetails.isPomodoroActive = false
    pomodoroActivityDetails.pomodoroCounter = 1
    pomodoroActivityDetails.pomodoroTimerintervalId = null
    pomodoroActivityDetails.followUpTimerintervalId = null
    pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.WORK_DURATION
    pomodoroActivityDetails.currentPomodoroStatus = POMODORO_STATUS.WORK_TIME_STATUS
}
