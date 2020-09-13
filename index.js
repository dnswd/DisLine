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
    comsole.log("Line:", message.content);
  }

  if (message.content.startsWith(PREFIX)) {
    const [cmd, ...args] = message.content.trim().substring(1).split(/\s+/);
    
    console.log("prefix command", cmd); //(debug)

    /**
     * Commands starts here
     */

    if (cmd.toLocaleLowerCase() === "ping") {
      message.reply('Pong!');
    }
    /** Change bot prefix */
    if (cmd === "prefix") {
      if (args.length != 0) PREFIX = args[0];
    }

    if (cmd === "beacon" && message.channel.type === 'text') {
      BEACON_CHANNEL = message.channel.id;
    }
  }
});


client.login(process.env.DISCORD_TOKEN);