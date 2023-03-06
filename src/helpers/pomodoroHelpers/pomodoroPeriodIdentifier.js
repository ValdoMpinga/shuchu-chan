const { pomodoroActivityDetails } = require('../../globals/pomodoroGlobals')

module.exports = function pomodoroPeriodIdentifier()
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
            return "a unknown period, report bug to the developers: valdompinga57@gmail.com"

    }
}
