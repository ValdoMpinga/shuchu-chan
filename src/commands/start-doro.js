const { SlashCommandBuilder} = require('discord.js');

const formatTime = require('../helpers/pomodoroHelpers/formatTime')
const { pomodoroActivityDetails,CLIENT } = require('../globals/pomodoroGlobals')
const startTimer = require('../helpers/pomodoroHelpers/startTimer')
const replyEmbed = require('../embeds/reply-embeds')
const pomodoroStateIdentifier = require('../helpers/pomodoroHelpers/pomodoroStateIdentifier')
const ms = require('ms');

try
{
    module.exports = {
        data: new SlashCommandBuilder()
            .setName('start-doro')
            .setDescription('Starts the default pomodoro'),
        async execute(interaction)
        {
            await interaction.deferReply();
            const originalInteractionId = interaction.id;
            const originalInteractionToken = interaction.token;

            // await interaction.reply("15 secounds pomodoro started!")
            if (!pomodoroActivityDetails.isTimerPaused)
            {
                switch (true)
                {
                    // If the counter is odd, it's time to work
                    case pomodoroActivityDetails.pomodoroCounter % 2 !== 0:
                        await interaction.followUp("Work time timer is already running, if you want you can reset the pomodoro!")
                        break;

                    // If the counter is even and not 8, it's time for a short break
                    case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter !== 8:
                        await interaction.followUp("Short break timer is running, but if you want, you can reset or even skip the break.")

                        break;

                    // If the counter is even and 8, it's time for a long break
                    case pomodoroActivityDetails.pomodoroCounter % 2 === 0 && pomodoroActivityDetails.pomodoroCounter === 8:
                        await interaction.followUp("Long break timer is running, but if you want, you can reset or even skip the break.")
                        break;
                    // Handle any invalid pomodoro counter values
                    default:
                        await interaction.followUp("Something went wrong, contact the programmer: valdompinga2@gmail.com")
                }
            } else
            {
                await interaction.editReply({ embeds: [replyEmbed("Timer started, remaining time: " + formatTime(pomodoroActivityDetails.remainingTime), pomodoroStateIdentifier())] });

                startTimer()


                pomodoroActivityDetails.followUpTimerintervalId = setTimeout(async () =>
                {
                   // notifyCommand.execute(interaction);
                    const channelName = 'developers-test-ground';

                    const channel = CLIENT.channels.cache.find(channel => channel.name === channelName);

                    if (channel)
                    {
                        channel.send('Break time!!!!');
                    } else
                    {
                        console.log('Could not find channel');
                    }
        
                  
                
          

                    // interaction.followUp({ embeds: [replyEmbed(pomodoroActivityDetails.currentPomodoroStatus, `Remaining break time: ${formatTime(pomodoroActivityDetails.remainingTime)}`)] });
                }, pomodoroActivityDetails.remainingTime + ms('2s'))
            }
        },
    };
} catch (e)
{
    console.log(e);
}

