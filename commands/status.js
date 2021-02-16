const { aliases } = require("./clear");

module.exports = {
    name: 'status',
    async execute(client, message, args, cmd)
    {
        if (!message.member.hasPermission("ADMINISTRATOR")) return;    
        const content = message.content.replace('-status', '');
        client.user.setPresence({
            activity: {
                name: content,
                type: 'WATCHING',
            },
        })
    }
}