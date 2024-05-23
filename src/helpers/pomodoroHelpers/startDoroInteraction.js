const formatTime = require('../pomodoroHelpers/formatTime');
const { pomodoroActivityDetails, CLIENT, ALLOWED_CHANNELS, INTENTS, POMODORO_STATUS, INACTIVITY_ALARM_TIMEOUT } = require('../../globals/pomodoroGlobals');
let { INACTIVITY_ALARM_COUNTER } = require('../../globals/pomodoroGlobals');
const startTimer = require('../pomodoroHelpers/startTimer');
const replyEmbed = require('../../embeds/reply-embeds');
const pomodoroReseter = require('./pomodoroReseter');

module.exports = async function startDoroInteraction(intent)
{
    const guild = CLIENT.guilds.cache.get(process.env.GUILD_ID);
    const channel = guild.channels.cache.find(channel => channel.name === ALLOWED_CHANNELS);

    switch (intent)
    {
        case INTENTS.START:
            startTimer().then(() =>
            {
                sendEndOfTimerMessage(channel);
            });
            break;
        case INTENTS.SKIP_AND_START:
            channel.send({ embeds: [replyEmbed(pomodoroActivityDetails.currentPomodoroStatus, `Remaining activity time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)] });

            startTimer().then(() =>
            {
                sendEndOfTimerMessage(channel);
            });
            break;
    }
};

async function sendEndOfTimerMessage(channel)
{
    try
    {
        if (channel)
        {
            console.log("Replying end of the timer to the channel");
            channel.send({ embeds: [replyEmbed(pomodoroActivityDetails.currentPomodoroStatus, `Remaining activity time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)] });

            if (pomodoroActivityDetails.currentPomodoroStatus === POMODORO_STATUS.WORK_TIME_STATUS && pomodoroActivityDetails.isTimerPaused)
            {
                if (INACTIVITY_ALARM_COUNTER.value == 5)
                {
                    channel.send("Pomodoro is being reset due to max warning limit (5 times)");
                    pomodoroReseter();
                    clearInterval(pomodoroActivityDetails.inactivityAlarmTimerId);
                } else
                {
                    console.log(`Current INACTIVITY_ALARM_COUNTER: ${INACTIVITY_ALARM_COUNTER.value}`);
                    pomodoroActivityDetails.inactivityAlarmTimerId = setInterval(() =>
                    {
                        INACTIVITY_ALARM_COUNTER.value++;
                        console.log(`Incremented INACTIVITY_ALARM_COUNTER: ${INACTIVITY_ALARM_COUNTER.value}`);
                        channel.send("Don't forget to turn on the timer!");

                        if (INACTIVITY_ALARM_COUNTER.value == 5)
                        {
                            channel.send("Pomodoro is being reset due to max warning limit (5 times)");
                            pomodoroReseter();
                            clearInterval(pomodoroActivityDetails.inactivityAlarmTimerId);
                        }
                    }, INACTIVITY_ALARM_TIMEOUT);
                }
            }
        }
    } catch (e)
    {
        console.log(e);
    }
}
