const { SlashCommandBuilder } = require('discord.js');

const { pomodoroActivityDetails, CLIENT, INTENTS } = require('../globals/pomodoroGlobals')
const startDoroInteraction = require('../helpers/pomodoroHelpers/startDoroInteraction')
const replyEmbed = require('../embeds/reply-embeds')
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const pomodoroStateIdentifier = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')

try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('start-doro')
            .setDescription('Starts the default pomodoro'),
        async execute(interaction)
        {
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
                await interaction.reply({ embeds: [replyEmbed("Timer started, remaining time: " + formatTime(pomodoroActivityDetails.remainingTime), pomodoroStateIdentifier())] });

                clearInterval(pomodoroActivityDetails.inactivityAlarmTimerId);

                startDoroInteraction(INTENTS.START)
            }
        },
    };
} catch (e)
{
    console.log(e);
}
