const { SlashCommandBuilder } = require('discord.js');
const { pomodoroActivityDetails, POMODORO_RESET_CODES } = require('../globals/pomodoroGlobals')
const pomodoroReseter = require('../helpers/pomodoroHelpers/pomodoroReseter')


try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('reset-doro')
            .setDescription('Resets the pomodoro')
            .addIntegerOption(option =>
                option.setName('confirmation')
                    .setRequired(true)
                    .addChoices(
                        { name: 'No', value: 0 },
                        { name: 'Yes', value: 1 }
                    )
            )
        ,
        async execute(interaction)
        {
            if (pomodoroActivityDetails.isPomodoroActive)
            {
                let selectedOption = interaction.options.getInteger('confirmation')

                if (selectedOption == POMODORO_RESET_CODES.YES)
                {
                    pomodoroReseter()

                    clearInterval(pomodoroActivityDetails.inactivityAlarmTimerId);

                    await interaction.reply("Pomodoro has been reset!")
                } 

            } else
                await interaction.reply("You cant reset a pomodoro that isnt currently active.")
        },
    };
} catch (e)
{
    console.log(e);
}
