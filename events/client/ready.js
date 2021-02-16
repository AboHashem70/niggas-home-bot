module.exports = (Discord, client) => {
    console.log('Niggas Home bot is ready!');
    const memberCounter = require('../guild/member-counter');
    memberCounter(client);
    client.user.setStatus('dnd');
}