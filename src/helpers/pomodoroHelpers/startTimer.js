const { pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')
const formatTime = require('../../helpers/pomodoroHelpers/formatTime')
const pomodoroStatusUpdater = require('../../helpers/pomodoroHelpers/pomodoroStatusUpdater')
const ms = require('ms');

module.exports = function startTimer()
{
    console.log("in");

    return new Promise((resolve, reject) =>
    {
        try
        {
            // Set the start time based on the remaining time
            pomodoroActivityDetails.isPomodoroActive = true
            pomodoroActivityDetails.isTimerPaused = false
            let timeInSeconds = 0

            // Execute the interval function every 1 second (1000 milliseconds)
            pomodoroActivityDetails.pomodoroTimerintervalId = setInterval(() =>
            {
                if (pomodoroActivityDetails.isTimerPaused)
                {
                    clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
                    // clearInterval(pomodoroActivityDetails.followUpTimerintervalId);
                    reject(new Error("Timer stopped before completion"));
                    return;
                }

                // Subtract 1 second from the remaining time
                pomodoroActivityDetails.remainingTime = pomodoroActivityDetails.remainingTime - ms('1s');

                // Check if the remaining time is 0 or negative
                if (pomodoroActivityDetails.remainingTime <= 0)
                {
                    // Stop the timer
                    clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
                    // clearInterval(pomodoroActivityDetails.followUpTimerintervalId);

                    pomodoroActivityDetails.pomodoroCounter++;
                    pomodoroActivityDetails.isTimerPaused = true

                    pomodoroStatusUpdater();
                    resolve();
                }
                timeInSeconds = Math.floor(pomodoroActivityDetails.remainingTime / 60)

                !pomodoroActivityDetails.isTimerPaused ?
                    console.log(`Remaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)
                    :
                    console.log("Timer completed");
            }, ms('1s'));
        } catch (e)
        {
            reject(e);
        }
    });
}
