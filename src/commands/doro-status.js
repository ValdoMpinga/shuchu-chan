const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_TIMING_DETAILS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('doro-status')
        .setDescription('Gets the actual pomodoro status'),
    async execute(interaction)
    {
        
        if (!pomodoroActivityDetails.isPomodoroActive)
            await interaction.reply("Pomodoro isn't currently active")
        else
            await interaction.reply(`Pomodoro is active... ${pomodoroActivityDetails.pomodoroCounter}`)
    },
};
