const { SlashCommandBuilder } = require('discord.js');
const { POMODORO_SKIP_CODES, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const pomodoroStatusUpdater = require('../helpers/pomodoroHelpers/pomodoroStatusUpdater')
const pauseTimer = require('../helpers/pomodoroHelpers/pauseTimer')
const pomodoroPeriodSkipper = require('../helpers/pomodoroHelpers/pomodoroPeriodSkipper')

try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('skip-doro')
            .setDescription('Skips the ongoing timer. You can skip the current timer or n periods')
            .addIntegerOption(option =>
                option.setName('target')
                    .setDescription('Targets to skip')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Current', value: 0 },
                        { name: 'One Period', value: 1 },
                        { name: 'Two Periods', value: 2 },
                        { name: 'Three Periods', value: 3 },
                    )
            )
        ,
        async execute(interaction)
        {
            let selectedOption = interaction.options.getInteger('target')

            switch (selectedOption)
            {
                case POMODORO_SKIP_CODES.CURRENT:
                    if (pomodoroActivityDetails.isPomodoroActive && pomodoroActivityDetails.pomodoroCounter < 8)
                    {
                        if (pomodoroActivityDetails.isTimerPaused)
                        {
                            pomodoroActivityDetails.pomodoroCounter++
                            pomodoroStatusUpdater()

                            await interaction.reply('Pomodoro section skipped successfully!')
                        } else
                        {
                            pauseTimer()
                            pomodoroActivityDetails.pomodoroCounter++
                            pomodoroStatusUpdater()
                            await interaction.reply('Pomodoro section skipped successfully!')
                        }
                    } else if (pomodoroActivityDetails.pomodoroCounter === 8)
                    {
                        pomodoroActivityDetails.pomodoroCounter = 1
                        pomodoroStatusUpdater()
                        await interaction.reply('Pomodoro section skipped successfully!')
                    }
                    break;
                case POMODORO_SKIP_CODES.ONE_PERIOD:
                    let period_one_output = pomodoroPeriodSkipper(selectedOption)
                    await interaction.reply(period_one_output)

                    break;
                case POMODORO_SKIP_CODES.TWO_PERIODS:
                    let period_two_output = pomodoroPeriodSkipper(selectedOption)
                    await interaction.reply(period_two_output)

                    break;
                case POMODORO_SKIP_CODES.THREE_PERIODS:
                    let period_three_output = pomodoroPeriodSkipper(selectedOption)
                    await interaction.reply(period_three_output)

                    break;
            }
        },
    };

} catch (e)
{
    console.log(e);
}

