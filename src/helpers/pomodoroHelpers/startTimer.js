const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')
const formatTime = require('../../helpers/pomodoroHelpers/formatTime')


module.exports = async function startTimer()
{
    try
    {
        // Set the start time based on the remaining time
        pomodoroActivityDetails.isPomodoroActive = true
        pomodoroActivityDetails.isTimerPaused = false
        startTime = Date.now() - pomodoroActivityDetails.remainingTime;

        // Execute the interval function every 1 second (1000 milliseconds)
        pomodoroActivityDetails.pomodoroTimerintervalId = setInterval(() =>
        {
            if (pomodoroActivityDetails.isTimerPaused)
            {
                clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
                // clearInterval(pomodoroActivityDetails.followUpTimerintervalId);
                return;
            }

            // Subtract 1 second from the remaining time
            pomodoroActivityDetails.remainingTime = pomodoroActivityDetails.remainingTime - 1000;

            // Check if the remaining time is 0 or negative
            if (pomodoroActivityDetails.remainingTime <= 0)
            {
                // Stop the timer
                clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
                // clearInterval(pomodoroActivityDetails.followUpTimerintervalId);

                pomodoroActivityDetails.pomodoroCounter++;
                pomodoroActivityDetails.isTimerPaused = true

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
                        pomodoroActivityDetails.pomodoroCounter = 1;
                        pomodoroActivityDetails.isPomodoroActive = false
                        console.log(POMODORO_STATUS.LONG_BREAK_STATUS);
                        pomodoroActivityDetails.currentPomodoroStatus = POMODORO_STATUS.LONG_BREAK_STATUS
                        pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.LONG_BREAK_DURATION;
                        break;
                    // Handle any invalid pomodoro counter values
                    default:
                        console.log(`Invalid pomodoro counter value: ${pomodoroActivityDetails.pomodoroCounter}`);
                }
            }

            !pomodoroActivityDetails.isTimerPaused ? console.log(`Remaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}`) : console.log("Timer completed");
        }, 1000);
    } catch (e)
    {
        console.log(e);
    }
}
