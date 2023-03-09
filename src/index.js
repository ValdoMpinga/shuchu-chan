const dotenv = require('dotenv');
dotenv.config();

const fs = require("fs");
const path = require("path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles)
{
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on('debug', console.log);
client.on('warn', console.warn);
client.on('error', console.error);

client.once(Events.ClientReady, () =>
{
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) =>
{
  try
  {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

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

  client.login(process.env.DISCORD_TOKEN);
} catch (e)
{
  console.log(e);
}
