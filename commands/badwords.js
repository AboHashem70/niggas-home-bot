var badwords = ["كس إمك",
"كس أمك",
"كس",
"إمك",
"تلحس طيزي",
"تلحس",
"طيزي",
"زبي",
"شلقة",
"كحبة",
"بنيكك",
"ناك",
"ينيك",
"نيك",
"شرموطة",
"طيز",
"زب",
"جواد",
"غواد",
"قواد",
"منيك",
"مرج",
"مارج",
"ممروج",
"مرج",
"dick",
"pussu",
"pussy",
"fuck",
"whore",
"bitch",
"asswhole",
"ass"];

module.exports = {
    name: 'badwords',
    execute(client, message, Discord)
    {
        if (message.member.hasPermission("ADMINISTRATOR") || message.author.bot) return;
        let confirm = false;
        var i;
        for(i = 0;i < badwords.length; i++) {
          
          if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
            confirm = true;
          
        }
        if(confirm) {
            message.delete()
            message.reply('بتعيدها بفلخك!')
            .then(message => {
            message.delete({ timeout:2000})
            })
            var role = message.guild.roles.cache.find(r => r.name === 'Muted');
            message.member.roles.add(role);
            setTimeout(() => {
                message.member.roles.remove(role);
            }, 60000);
            return
          }
    }
}