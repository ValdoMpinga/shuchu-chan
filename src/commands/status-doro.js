const { SlashCommandBuilder } = require('discord.js');
const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { POMODORO_STATUS, pomodoroActivityDetails } = require('../globals/pomodoroGlobals')
const  pomodoroStateIdentifier  = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')
const  pomodoroPeriodIdentifier  = require('../helpers/pomodoroHelpers/pomodoroPeriodIdentifier')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('status-doro')
        .setDescription('Gets the actual pomodoro status'),
    async execute(interaction)
    {

        if (!pomodoroActivityDetails.isPomodoroActive)
            await interaction.reply("Pomodoro isn't currently active")
        else
        {
            console.log(pomodoroActivityDetails.isTimerPaused);
            let pomodoroState = pomodoroStateIdentifier()
            if (pomodoroState == POMODORO_STATUS.WORK_TIME_STATUS)
                await interaction.reply(
                    `Its work time!\nthe timer is ${pomodoroActivityDetails.isTimerPaused ? "not running" : "running"}\nremaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}\nThis is ${pomodoroPeriodIdentifier()}`)
            else if (pomodoroState == POMODORO_STATUS.SHORT_BREAK_STATUS)
                await interaction.reply(
                    `Its short break time!\nthe timer is ${pomodoroActivityDetails.isTimerPaused ? "not running" : "running"}\nremaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}\nThis is ${pomodoroPeriodIdentifier()}`)
            else if (pomodoroState == POMODORO_STATUS.LONG_BREAK_STATUS)
                await interaction.reply(
                    `Its long time!\nthe timer is ${pomodoroActivityDetails.isTimerPaused ? "not running" : "running"}\nremaining time: ${formatTime(pomodoroActivityDetails.remainingTime)}\nThis is ${pomodoroPeriodIdentifier()}`)
        }
    },
};
