const dotenv = require('dotenv');
dotenv.config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];

const commandsPath = path.join(__dirname, "commands");

try
{
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles)
  {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }
} catch (e)
{
  console.log(e);
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () =>
{
  try
  {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error)
  {
    console.error(error);
  }
})();
