module.exports = (Discord, client, message) => {
    client.commands.get('badwords').execute(client, message, Discord);
    const prefix = process.env.Prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if(command) command.execute(client, message, args, Discord, cmd);
}
