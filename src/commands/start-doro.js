const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_TIMING_DETAILS, POMODORO_STATUS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')

let currentPomodoroStatus = POMODORO_STATUS.WORK_TIME_STATUS

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-doro')
        .setDescription('Starts the default pomodoro'),
    async execute(interaction)
    {
        // await interaction.reply("15 secounds pomodoro started!")
        if (!pomodoroActivityDetails.isTimerPaused)
        {
            switch (true)
            {
                // If the counter is odd, it's time to work
                case pomodoroActivityDetails.pomodoroCounter % 2 !== 0:
                    await interaction.reply("Work time timer is already running, if you want you can reset the pomodoro!")
                    break;

                // If the counter is even and not 8, it's time for a short break
                case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter !== 8:
                    await interaction.reply("Short break timer is running, but if you want, you can reset or even skip the break.")

                    break;

                // If the counter is even and 8, it's time for a long break
                case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter === 8:
                    await interaction.reply("Long break timer is running, but if you want, you can reset or even skip the break.")
                    break;
                // Handle any invalid pomodoro counter values
                default:
                    await interaction.reply("Something went wrong, contact the programmer: valdompinga2@gmail.com")
            }


        } else
        {
            if (pomodoroActivityDetails.isTimerPaused)
                await interaction.reply("Timer started, remaining time: " +formatTime(pomodoroActivityDetails.remainingTime));

            startTimer()

            setTimeout(() =>
            {
                interaction.followUp(currentPomodoroStatus);
            }, pomodoroActivityDetails.remainingTime + 2000)
        }
    },
};



async function startTimer()
{
    try
    {
        // Set the start time based on the remaining time
        pomodoroActivityDetails.isPomodoroActive = true
        pomodoroActivityDetails.isTimerPaused = false
        startTime = Date.now() - pomodoroActivityDetails.remainingTime;

        // Execute the interval function every 1 second (1000 milliseconds)
        pomodoroActivityDetails.intervalId = setInterval(() =>
        {
            if (pomodoroActivityDetails.isTimerPaused)
            {
                clearInterval(pomodoroActivityDetails.intervalId);
                return;
            }

            // Subtract 1 second from the remaining time
            pomodoroActivityDetails.remainingTime = pomodoroActivityDetails.remainingTime - 1000;

            // Check if the remaining time is 0 or negative
            if (pomodoroActivityDetails.remainingTime <= 0)
            {
                // Stop the timer
                clearInterval(pomodoroActivityDetails.intervalId);
                pomodoroActivityDetails.pomodoroCounter++;
                pomodoroActivityDetails.isTimerPaused = true

                switch (true)
                {
                    // If the counter is odd, it's time to work
                    case pomodoroActivityDetails.pomodoroCounter % 2 !== 0:
                        console.log(POMODORO_STATUS.WORK_TIME_STATUS);
                        currentPomodoroStatus = POMODORO_STATUS.WORK_TIME_STATUS
                        pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.WORK_DURATION;
                        break;

                    // If the counter is even and not 8, it's time for a short break
                    case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter !== 8:
                        console.log(POMODORO_STATUS.SHORT_BREAK_STATUS);
                        currentPomodoroStatus = POMODORO_STATUS.SHORT_BREAK_STATUS
                        pomodoroActivityDetails.remainingTime = POMODORO_TIMING_DETAILS.SHORT_BREAK_DURATION;
                        break;

                    // If the counter is even and 8, it's time for a long break
                    case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter === 8:
                        pomodoroActivityDetails.pomodoroCounter = 1;
                        pomodoroActivityDetails.isPomodoroActive = false
                        console.log(POMODORO_STATUS.LONG_BREAK_STATUS);
                        currentPomodoroStatus = POMODORO_STATUS.LONG_BREAK_STATUS
                        // currentState = 'rest';
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






