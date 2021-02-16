module.exports = (Discord, client, member) => {
    if (member.bot) return;
    const welcomeRole = member.guild.roles.cache.find(role => role.name === '𝐍𝐢𝐠𝐠𝐚𝐬');
    member.roles.add(welcomeRole);
    const embed = new Discord.MessageEmbed()
    .setTitle("Welcome to our Server")
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor(`${member.user.tag}`)
    .setFooter("𝐍𝐢𝐠𝐠𝐚𝐬 𝐇𝐨𝐦𝐞 𝐒𝐞𝐫𝐯𝐞𝐫")
    .setColor("#C40000")
    .addFields({
        name:`انت دخلت الديسكورد بتاريخ:`,
        value: new Date(member.user.createdTimestamp).toLocaleDateString(),
    },{
        name: `ومن لحظة دخولك السيرفر:`,
        value: `${new Date(guildMember.joinedTimestamp).toLocaleDateString()} انت منا وفينا`
    },{
        name: 'إن شاء الله بتزيد رتبك مع الوقت ',
        value: ':wink:',
    },)
    .setTimestamp()
    member.guild.channels.cache.get(process.env.welcomeChannel).send(embed)    
    member.guild.channels.cache.get(process.env.welcomeChannel).send(`:sparkles:سيرفر نيجاز هوم يرحب بك :sparkles:\n- user : <@${member.user.id}>\n:crown: نور السيرفر بوجودك :crown:`);
}