const formatTime = require('../pomodoroHelpers/formatTime')
const { pomodoroActivityDetails, CLIENT, ALLOWED_CHANNELS } = require('../../globals/pomodoroGlobals')
const startTimer = require('../pomodoroHelpers/startTimer')
const replyEmbed = require('../../embeds/reply-embeds')
const pomodoroStateIdentifier = require('../pomodoroHelpers/pomodoroStateIdentifier')
const ms = require('ms');


module.exports = async function startDoroInteraction(interaction) 
{
    const guild = CLIENT.guilds.cache.get(process.env.GUILD_ID);
    const channel = guild.channels.cache.find(channel => channel.name === ALLOWED_CHANNELS);
    if (channel)
    {
        channel.send({ embeds: [replyEmbed("Timer started, remaining time: " + formatTime(pomodoroActivityDetails.remainingTime), pomodoroStateIdentifier())] });
    }
    startTimer().then(
        () =>
        {
            try
            {
                

                if (channel)
                {
                    console.log("Replying end of the timer to the channel");
                    channel.send({ embeds: [replyEmbed(pomodoroActivityDetails.currentPomodoroStatus, `Remaining activity time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)] });
                }
            } catch (e)
            {
                console.log(e);
            }

        }
    )
}
