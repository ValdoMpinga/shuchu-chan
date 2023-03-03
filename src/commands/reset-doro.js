const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_STATUS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const { pomodoroStateIdentifier } = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')
const { pomodoroPeriodIdentifier } = require('../helpers/pomodoroHelpers/pomodoroPeriodIdentifier')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-doro')
        .setDescription('Resets the pomodoro'),
    async execute(interaction)
    {
        await interaction.reply("Reset done!")
    },
};
