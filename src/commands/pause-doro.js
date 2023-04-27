const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const pauseTimer = require('../helpers/pomodoroHelpers/pauseTimer')

try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('pause-doro')
            .setDescription('Pauses the pomodoro'),
        async execute(interaction)
        {
            if (!pomodoroActivityDetails.isPomodoroActive)
                await interaction.reply("Pomodoro must be active to be able to pause sessions!")
            else
            {
                pauseTimer()
                await interaction.reply(`Timer paused, remaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)
            }
        },
    };
} catch (e)
{
    console.log(e);
}
