import { Client, Events, GatewayIntentBits, Message } from "discord.js";
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("messageCreate", (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  if(message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
        content: "Generating Short ID for " + url,
    })
  }
  message.reply({
    content: "Hii From Bot",
  });
});

// Handle slash commands
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  }
});

client.login(process.env.DISCORD_TOKEN);
