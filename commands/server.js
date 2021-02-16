module.exports = {
    name: 'server',
    aliases: ['se', 's', 'سثقرثق'],
    execute(client, message, args, Discord)
    {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('#C40000')
        .setFooter(message.guild.name)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL())   
        .addFields({
           name: 'Name',
           value:  message.guild.name,
        },{
            name: 'ID',
            value: message.guild.id,
        },{           
            name: 'Owner',
            value: message.guild.owner.user.username,
        },{
            name: 'Region',
            value: message.guild.region,
        },{
            name: 'Creation Date',
            value: new Date(message.channel.guild.createdAt).toLocaleDateString(),
        },{
            name: "server roles: ",
            value: message.guild.roles.cache.size - 1,
        },)
        message.channel.send(embed) 
    }   
}