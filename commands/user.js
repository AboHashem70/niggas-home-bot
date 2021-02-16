module.exports = {
    name : 'user',
    aliases: ['us', 'u', 'عسثق'],
    execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle("User Info:")
        .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(message.author.tag)
        .setFooter("𝐍𝐢𝐠𝐠𝐚𝐬 𝐇𝐨𝐦𝐞 𝐒𝐞𝐫𝐯𝐞𝐫")
        .setColor("#C40000")
        .setTimestamp()
        .addFields({
            name: "Joined Discord at: ",
            value: new Date(message.author.createdTimestamp).toLocaleDateString()
        },{
            name: "Joined Server at:",
            value: new Date(message.member.joinedTimestamp).toLocaleDateString()
        },{
            name: "Status: ",
            value: message.author.presence.status,
        },{
            name: "Playing: ",
            value: message.author.presence.activities[0] ? message.author.presence.activities[0].name : "None!",
        },
        {
            name: "Role Count: ",
            value: message.member.roles.cache.size - 1,
        },)
        message.channel.send(embed)
    }
}