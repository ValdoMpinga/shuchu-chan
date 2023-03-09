const { pomodoroActivityDetails, POMODORO_PERIODS } = require('../../globals/pomodoroGlobals')
const pomodoroPeriodIdentifier = require('../pomodoroHelpers/pomodoroPeriodIdentifier')
const pauseTimer = require('../pomodoroHelpers/pauseTimer')
const pomodoroStatusUpdater = require('../pomodoroHelpers/pomodoroStatusUpdater')

const pomodoroSkipOutput = "Pomodoro Skipped Successfully!"

module.exports = function pomodoroPeriodSkipper(periodsToSkip)
{
    try
    {
        let currentPomodoroPeriod = pomodoroPeriodIdentifier()

        switch (currentPomodoroPeriod)
        {
            case POMODORO_PERIODS.FIRST_PERIOD:
                switch (periodsToSkip)
                {
                    case 1:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 2
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter++

                            pomodoroStatusUpdater()
                        } else
                        {
                            pomodoroActivityDetails.isPomodoroActive = true

                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 2
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter++

                            pomodoroStatusUpdater()
                        }

                        return pomodoroSkipOutput
                    case 2:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 4
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter += 3

                            pomodoroStatusUpdater()
                        } else
                        {
                            pomodoroActivityDetails.isPomodoroActive = true

                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 4
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter += 3

                            pomodoroStatusUpdater()
                        }
                        return pomodoroSkipOutput
                    case 3:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 6
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter += 5

                            pomodoroStatusUpdater()
                        } else
                        {
                            pomodoroActivityDetails.isPomodoroActive = true


                            if (pomodoroActivityDetails.pomodoroCounter == 1)
                                pomodoroActivityDetails.pomodoroCounter += 6
                            else if (pomodoroActivityDetails.pomodoroCounter == 2)
                                pomodoroActivityDetails.pomodoroCounter += 5

                            pomodoroStatusUpdater()
                        }
                        return pomodoroSkipOutput
                }
                break;
            case POMODORO_PERIODS.SECOND_PERIOD:
                switch (periodsToSkip)
                {
                    case 1:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 2
                            else if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 1

                            pomodoroStatusUpdater()
                        } else
                        {
                            if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 4
                            else if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 3

                            pomodoroStatusUpdater()
                        }
                        return pomodoroSkipOutput
                    case 2:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 4
                            else if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 3

                            pomodoroStatusUpdater()
                        } else
                        {
                            if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 4
                            else if (pomodoroActivityDetails.pomodoroCounter == 3)
                                pomodoroActivityDetails.pomodoroCounter += 3

                            pomodoroStatusUpdater()
                        }
                        return pomodoroSkipOutput
                    case 3:
                        return "From this period, which is the second you can only skip one period or two period ahead, otherwise it would go beyond the last period, which is the fourth."
                }
                break;
            case POMODORO_PERIODS.THIRD_PERIOD:
                switch (periodsToSkip)
                {
                    case 1:
                        if (!pomodoroActivityDetails.isTimerPaused)
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 5)
                                pomodoroActivityDetails.pomodoroCounter += 2
                            else if (pomodoroActivityDetails.pomodoroCounter == 6)
                                pomodoroActivityDetails.pomodoroCounter += 1

                            pomodoroStatusUpdater()
                        } else
                        {
                            pauseTimer()
                            if (pomodoroActivityDetails.pomodoroCounter == 5)
                                pomodoroActivityDetails.pomodoroCounter += 2
                            else if (pomodoroActivityDetails.pomodoroCounter == 6)
                                pomodoroActivityDetails.pomodoroCounter += 1

                            pomodoroStatusUpdater()
                        }
                        return pomodoroSkipOutput
                    case 2:
                        return "From this period, which is the third, you can only skip one periodahead, otherwise it would go beyond the last period, which is the fourth."
                    case 3:
                        return "From this period, which is the third, you can only skip one periodahead, otherwise it would go beyond the last period, which is the fourth."
                }
                break;
            case POMODORO_PERIODS.FORTH_PERIOD:
                switch (periodsToSkip)
                {
                    case 1:
                        return "From this period, which is the forth and the last, you cant skip any periods, but you can restart the pomodoro using the reset-doro command."
                    case 2:
                        return "From this period, which is the forth and the last, you cant skip any periods, but you can restart the pomodoro using the reset-doro command."
                    case 3:
                        return "From this period, which is the forth and the last, you cant skip any periods, but you can restart the pomodoro using the reset-doro command."
                }
                break;
        }
    } catch (e)
    {
        console.log(e);
    }


}

