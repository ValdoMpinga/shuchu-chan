const { pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

module.exports = async function pauseTimer()
{
    try
    {
        pomodoroActivityDetails.isTimerPaused = true;
        clearInterval(pomodoroActivityDetails.pomodoroTimerintervalId);
        clearInterval(pomodoroActivityDetails.followUpTimerintervalId);
    } catch (e)
    {
        console.log(e);
    }
}
