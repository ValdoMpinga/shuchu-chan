const { pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

function pomodoroPeriodIdentifier()
{
    switch (true)
    {
        // If the counter is odd, it's time to work
        case pomodoroActivityDetails.pomodoroCounter <= 2:
            return "first period"
        case pomodoroActivityDetails.pomodoroCounter > 2 && pomodoroActivityDetails.pomodoroCounter <= 4:
            return "second period"
        case pomodoroActivityDetails.pomodoroCounter > 4 && pomodoroActivityDetails.pomodoroCounter <= 6:
            return "third period"
        case pomodoroActivityDetails.pomodoroCounter > 6:
            return "forth period"
        default:
            return "first period"

    }
}

module.exports = { pomodoroPeriodIdentifier }