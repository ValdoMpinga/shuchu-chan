const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const replyEmbed = require('../embeds/reply-embeds')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notify-doro')
        .setDescription('Send the "time\'s up" message for the Pomodoro timer')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    ,
    async execute(interaction)
    {
        await interaction.reply({ embeds: [replyEmbed(pomodoroActivityDetails.currentPomodoroStatus, `Remaining break time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)] });

    },
};
