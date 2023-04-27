const { SlashCommandBuilder } = require('discord.js');
const {  pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const pomodoroReseter = require('../helpers/pomodoroHelpers/pomodoroReseter')


try
{
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
} catch (e)
{
    console.log(e);
}

