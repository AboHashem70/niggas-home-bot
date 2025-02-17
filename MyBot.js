require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'events_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN);