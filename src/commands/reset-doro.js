const { SlashCommandBuilder } = require('discord.js');
const { pomodoroActivityDetails, POMODORO_RESET_CODES } = require('../globals/pomodoroGlobals');
const pomodoroReseter = require('../helpers/pomodoroHelpers/pomodoroReseter');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset-doro')
        .setDescription('Resets the pomodoro timer')
        .addIntegerOption(option =>
            option.setName('confirmation')
                .setDescription('Confirms the intent to reset the timer, it is set to no in default to avoid mistakes')
                .setRequired(true)
                .addChoices(
                    { name: 'No', value: 0 },
                    { name: 'Yes', value: 1 }
                )
        ),
    async execute(interaction)
    {
        try
        {
            if (pomodoroActivityDetails.isPomodoroActive)
            {
                let selectedOption = interaction.options.getInteger('confirmation');

                if (selectedOption == POMODORO_RESET_CODES.YES)
                {
                    pomodoroReseter();
                    clearInterval(pomodoroActivityDetails.inactivityAlarmTimerId);
                    await interaction.reply("Pomodoro has been reset!");
                }
            } else
            {
                await interaction.reply("You can't reset a pomodoro that isn't currently active.");
            }
        } catch (error)
        {
            console.error(error);
        }
    }
};
