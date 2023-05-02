const { SlashCommandBuilder } = require('discord.js');
const { POMODORO_SKIP_CODES, pomodoroActivityDetails, INTENTS } = require('../globals/pomodoroGlobals')
const pomodoroStatusUpdater = require('../helpers/pomodoroHelpers/pomodoroStatusUpdater')
const pauseTimer = require('../helpers/pomodoroHelpers/pauseTimer')
const pomodoroPeriodSkipper = require('../helpers/pomodoroHelpers/pomodoroPeriodSkipper')
const startDoroInteraction = require('../helpers/pomodoroHelpers/startDoroInteraction')

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
                        { name: 'Current and start', value: 1 },
                        { name: 'One Period', value: 2 },
                        { name: 'One Period and start', value: 3 },
                        { name: 'Two Periods', value: 4 },
                        { name: 'Two Periods and start', value: 5 },
                        { name: 'Three Periods', value: 6 },
                        { name: 'Three Periods and start', value: 7 },
                    )
            )
        ,
        async execute(interaction)
        {
            if (!pomodoroActivityDetails.isPomodoroActive)
                await interaction.reply("Pomodoro must be active to be able to skip sessions!")
            else
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
                case POMODORO_SKIP_CODES.CURRENT_AND_START:
                    if (pomodoroActivityDetails.isPomodoroActive && pomodoroActivityDetails.pomodoroCounter < 8)
                    {
                        if (pomodoroActivityDetails.isTimerPaused)
                        {
                            pomodoroActivityDetails.pomodoroCounter++
                            pomodoroStatusUpdater()

                            await interaction.reply('Pomodoro section skipped successfully!')

                            startDoroInteraction(INTENTS.SKIP_AND_START)
                        } else
                        {
                            pauseTimer()
                            pomodoroActivityDetails.pomodoroCounter++
                            pomodoroStatusUpdater()

                            await interaction.reply('Pomodoro section skipped successfully!')

                            startDoroInteraction(INTENTS.SKIP_AND_START)
                        }
                    } else if (pomodoroActivityDetails.pomodoroCounter === 8)
                    {
                        pomodoroActivityDetails.pomodoroCounter = 1
                        pomodoroStatusUpdater()

                        await interaction.reply('Pomodoro section skipped successfully!')
                        startDoroInteraction(INTENTS.SKIP_AND_START)

                    }
                    break;
                case POMODORO_SKIP_CODES.ONE_PERIOD:
                    let period_one_output = pomodoroPeriodSkipper(1)
                    await interaction.reply(period_one_output)

                    break;
                case POMODORO_SKIP_CODES.ONE_PERIOD_AND_START:
                    let _period_one_output = pomodoroPeriodSkipper(1)

                    await interaction.reply(_period_one_output)
                    startDoroInteraction(INTENTS.SKIP_AND_START)

                    break;
                case POMODORO_SKIP_CODES.TWO_PERIODS:
                    let period_two_output = pomodoroPeriodSkipper(2)
                    await interaction.reply(period_two_output)

                    break;
                case POMODORO_SKIP_CODES.TWO_PERIODS_AND_START:
                    let _period_two_output = pomodoroPeriodSkipper(2)

                    await interaction.reply(_period_two_output)
                    startDoroInteraction(INTENTS.SKIP_AND_START)

                    break;
                case POMODORO_SKIP_CODES.THREE_PERIODS:
                    let period_three_output = pomodoroPeriodSkipper(3)
                    await interaction.reply(period_three_output)

                    break;
                case POMODORO_SKIP_CODES.THREE_PERIODS_AND_START:
                    let _period_three_output = pomodoroPeriodSkipper(3)
                    await interaction.reply(_period_three_output)
                    startDoroInteraction(INTENTS.SKIP_AND_START)

                    break;
            }
        }
        },
    };

} catch (e)
{
    console.log(e);
}

