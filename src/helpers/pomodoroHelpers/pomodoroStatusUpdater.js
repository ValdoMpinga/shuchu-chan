const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

module.exports = function pomodoroStatusUpdater()
{
    try
    {
        switch (true)
        {
            // If the counter is odd, it's time to work
            case pomodoroActivityDetails.pomodoroCounter % 2 !== 0:
                console.log(POMODORO_STATUS.WORK_TIME_STATUS);
                pomodoroActivityDetails.currentPomodoroStatus = POMODORO_STATUS.WORK_TIME_STATUS
                pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.WORK_DURATION;
                break;

            // If the counter is even and not 8, it's time for a short break
            case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter !== 8:
                console.log(POMODORO_STATUS.SHORT_BREAK_STATUS);
                pomodoroActivityDetails.currentPomodoroStatus = POMODORO_STATUS.SHORT_BREAK_STATUS
                pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.SHORT_BREAK_DURATION;
                break;

            // If the counter is even and 8, it's time for a long break
            case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter === 8:
                pomodoroActivityDetails.pomodoroCounter = 0;
                // pomodoroActivityDetails.isPomodoroActive = false
                console.log(POMODORO_STATUS.LONG_BREAK_STATUS);
                pomodoroActivityDetails.currentPomodoroStatus = POMODORO_STATUS.LONG_BREAK_STATUS
                pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.LONG_BREAK_DURATION;
                break;
            // Handle any invalid pomodoro counter values
            default:
                console.log(`Invalid pomodoro counter value: ${pomodoroActivityDetails.pomodoroCounter}`);
        }
    } catch (e)
    {
        console.log(e);
    }
}
