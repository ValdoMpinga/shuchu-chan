const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

module.exports = async function pauseTimer()
{
    pomodoroActivityDetails.isTimerPaused = true;
    clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
    clearInterval(pomodoroActivityDetails.followUpTimerintervalId);
}
