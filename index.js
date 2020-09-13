require("dotenv").config()
const { Client } = require("discord.js")

const client = new Client();
let PREFIX = "!";
let BEACON_CHANNEL = "0"; // Channel to be forwarded to Line
let TICKET_CHANNEL = "0"; // Ticket if someone ask on Line

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;  // ignore bot's own message
  
  if (message.channel.id === BEACON_CHANNEL) {
    // Push message to Line Bot
    console.log("Line:", message.content);
  }

  if (message.content.startsWith(PREFIX)) {
    const [cmd, ...args] = message.content.trim().substring(1).split(/\s+/);
    
    console.log("prefix command", cmd); //(debug)

    /**
     * Commands starts here
     */

    /** Ping the bot */
    if (cmd.toLocaleLowerCase() === "ping") {
      message.reply('Pong!');
    }

    /** Check bot's latency */
    if (cmd === "latency") {
      var now = new Date();
      var latency = now.getTime - message.createdAt.getTime();
      message.reply(`There are ${latency} ms, between you and the bot.`)
    }

    /** Change bot prefix */
    if (cmd === "prefix") {
      if (args.length != 0) PREFIX = args[0];
    }

    /** Puts beacon on a channel */
    if (cmd === "beacon" && message.channel.type === 'text') {
      BEACON_CHANNEL = message.channel.id;
    }
  }
});


client.login(process.env.DISCORD_TOKEN);