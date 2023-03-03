const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_STATUS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const { pomodoroStateIdentifier } = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')
const pomodoroReseter = require('../helpers/pomodoroHelpers/pomodoroReseter')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-doro')
        .setDescription('Resets the pomodoro'),
    async execute(interaction)
    {
        if (pomodoroActivityDetails.isPomodoroActive)
        {
            pomodoroReseter()
            await interaction.reply("Pomodoro has been reset!")

        } else
            await interaction.reply("You cant reset a pomodoro that isnt currently active.")

            
    },
};
