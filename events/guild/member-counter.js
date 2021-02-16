const { Client, Guild } = require("discord.js");

require('dotenv').config();
module.exports = async (client) => {
    const guild = client.guilds.cache.get(process.env.guildId);
    setInterval(() => {
        const memberCount = guild.memberCount;
        const thechannel = guild.channels.cache.get(process.env.channelId);
        thechannel.setName(`➣❃│ 𝐀𝐥𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬: ${memberCount.toLocaleString()}`);
    }, 10);
}