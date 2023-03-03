const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_STATUS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const { pomodoroStateIdentifier } = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')
const { pomodoroPeriodIdentifier } = require('../helpers/pomodoroHelpers/pomodoroPeriodIdentifier')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip-doro')
        .setDescription('Skips the ongoing timer. You can skip the current timer or n periods')
        .addIntegerOption(option =>
            option.setName('target')
                .setDescription('Targets to skip')
                .setRequired(true)
                .addChoices(
                    { name: 'Current', value: 0},
                    { name: 'One Period', value: 1 },
                    { name: 'Two Periods', value: 2 },
                    { name: 'Three Periods', value: 3 },
                )
        )
    ,
    async execute(interaction)
    {
        console.log(interaction.options.getInteger('target'));

        console.log(interaction.options.getInteger('target'));
        if (!pomodoroActivityDetails.isTimerPaused)
            console.log('do smtn');
        
        await interaction.reply("skipped")
    },
};
