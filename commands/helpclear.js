module.exports = {
    name : 'help',
    aliases: ['help clear'],
    execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setColor('#00B2B2')
        .setTitle('**Clear Help**')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`This command clears messages for example ${process.env.prefix}clear 5.`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
    }
}