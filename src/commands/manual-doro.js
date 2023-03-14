const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { COLORS } = require('../globals/colors')
const pauseTimer = require('../helpers/pomodoroHelpers/pauseTimer')


try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('manual-doro')
            .setDescription('Displays the manual of the pomodoro module'),
        async execute(interaction)
        {
            pauseTimer()
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle('Pomodoro module manual')
                    .setColor(COLORS.color4)
                    .setThumbnail('https://th.bing.com/th/id/OIP.w3AdDIgtXOMPe8BENP-vmgHaHa?pid=ImgDet&w=204&h=204&c=7&dpr=2')
                    .setDescription(
                        "Welcome to the Pomodoro module on our Discord server! This module is designed to help you stay focused and productive by using the Pomodoro technique. If you're not familiar with this technique, check out this link: https://en.wikipedia.org/wiki/Pomodoro_Technique\nhis manual provides a guide to using the Pomodoro module. Each command has a specific purpose, which we'll explain below.But first, let's define a few key terms:\n\u2022 Period: A period refers to a single work and break session in the Pomodoro technique. Typically, the work period is 25 minutes and the break period is 5 minutes.")
                    .addFields(
                        { name: '/start-doro', value: 'This command starts a new pomodoro session. Use it to start a new 25 min work timer, then use it again to start the 5 min break timer, and so on.', inline: true },
                        { name: '/pause-doro', value: 'This command pauses the pomodoro.', inline: true },
                        { name: '/status-doro', value: 'This command displays the current status of the Pomodoro session, including how much time is left in the current period.', inline: true },
                        { name: '\u200B', value: '\u200B' }, // This adds an empty field to create a space between the previous field and the footer
                        { name: '/reset-doro', value: 'This command ends the current Pomodoro session and resets the timer to the default settings (25 minutes of work followed by a 5-minute break).', inline: true },
                        { name: '/manual-doro', value: 'Displays the pomodor manual.', inline: true },
                        {
                            name: '/skip-doro', value: "This command allows you to skip ahead to the next Pomodoro period. There are four options you can choose from\n\u2022 Current: Skips the current timer, whether it's a work session or a break session\n\u2022 One Period: Skips one Pomodoro period, consisting of a 25-minute work session and a 5-minute break session\n\u2022 Two Periods: Skips two Pomodoro periods\n\u2022 Three Periods: Skips three Pomodoro periods.", inline: true },// This adds a subtitle field
                       

                    )

                ]
            })
        },
    };
} catch (e)
{
    console.log(e);
}
