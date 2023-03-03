const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')
const formatTime = require('../../helpers/pomodoroHelpers/formatTime')
const pomodoroStatusUpdater = require('../../helpers/pomodoroHelpers/pomodoroStatusUpdater')

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

                pomodoroStatusUpdater()
            }

            !pomodoroActivityDetails.isTimerPaused ? console.log(`Remaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}`) : console.log("Timer completed");
        }, 1000);
    } catch (e)
    {
        console.log(e);
    }
}
