const dotenv = require('dotenv');
dotenv.config();

const fs = require("fs");
const path = require("path");
const {  Collection, Events } = require("discord.js");

const { CLIENT } = require('./globals/pomodoroGlobals')



CLIENT.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles)
{
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  CLIENT.commands.set(command.data.name, command);
}

// console.log(CLIENT.commands);

// CLIENT.on('debug', console.log);
// CLIENT.on('warn', console.warn);
// CLIENT.on('error', console.error);

CLIENT.once(Events.ClientReady, () =>
{
  console.log("Ready!");
});

CLIENT.on(Events.InteractionCreate, async (interaction) =>
{
  try
  {
    if (!interaction.isChatInputCommand()) return;

    const command = CLIENT.commands.get(interaction.commandName);

    if (!command) return;

    try
    {
      await command.execute(interaction);
    } catch (error)
    {
      console.error(error);
      if (interaction.replied || interaction.deferred)
      {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else
      {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } catch (e)
  {
    console.log(e);
  }
});

try
{

  CLIENT.login(process.env.DISCORD_TOKEN);
} catch (e)
{
  console.log(e);
}
