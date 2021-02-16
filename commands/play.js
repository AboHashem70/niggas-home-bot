const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../events/guild/message');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();
module.exports = {
    name: 'play',
    aliases: ['skip','leave', 'pause', 'stop','seek', 'p','queue', 'st', 'sk', 'سنهح', 'سفخح'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(client, message, args, Discord, cmd){

        client.on('voiceStateUpdate', (oldState, newState) => {
            // check if someone connects or disconnects
            if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
            // check if the bot is disconnecting
            if (newState.id !== 723480089638993930) return queue.delete(oldState.guild.id);
            // clear the queue
            return;
            
        });

        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('```fix\nYou need to be in a channel to execute this command!```');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('```fix\nYou dont have the correct permissions```');
        if (!permissions.has('SPEAK')) return message.channel.send('```fix\nYou dont have the correct permissions```');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play' || cmd === 'p' || cmd === 'ح'){
            if (!args.length) return message.channel.send('```fix\nYou need to send the second argument!```');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, thumbnail: song_info.videoDetails.thumbnail, duration: song_info.videoDetails.duration}
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url, thumbnail: video.thumbnail, duration: video.duration, dfdf: video.timestamp }
                } else {
                     message.channel.send('```fix\nError finding video.```');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('```fix\nThere was an error connecting!```');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(cmd === 'skip' || cmd === 'sk' || cmd === 'سنهح') skip_song(message, server_queue);
        else if(cmd === 'stop' || cmd === 'st' || cmd === 'سفخح' || cmd === 'leave') stop_song(message, server_queue);
        else if(cmd === 'queue') queue_command(Discord, client, message, server_queue);
        else if(cmd === 'seek') seek_command(message, server_queue, args);
        else if(cmd === 'pause') pause_command(message, server_queue);
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('```fix\nYou need to be in a channel to execute this command!```');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('```fix\nYou need to be in a channel to execute this command!```');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const queue_command = (Discord, client, message, server_queue) => {
    let index = 1;
    let string = "";
    if(!server_queue){
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .setColor("#D4E200")
        .setDescription("No song currently in queue!")
        .setTimestamp()
        .setFooter(`Requested by ${message.author.username}`);
        return message.channel.send(embed);
    } 
    if(server_queue.songs[0]) string += `__**Currently playing :arrow_forward: **__\n ${server_queue.songs[0].title}.\n\n`;
    if(server_queue.songs[1]) string += `__**Rest of queue:**__ \n ${server_queue.songs.slice(1, 10).map(x => `${index++}) ${x.title}.`).join("\n")}`;                   
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Current Queue for ${message.guild.name}`, message.guild.iconURL())
        .setThumbnail(server_queue.songs[0].thumbnail)
        .setDescription(string)
        .setTimestamp()
        .setColor("#D4E200")
        .setFooter(`Requested by ${message.author.username}`);
    return message.channel.send(embed);
}

const seek_command = (message, server_queue, args) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }         
    const streamOptions = {
        seek: args[0],
        highWaterMark: 1
    };
    if(!args[0]) return message.channel.send('```fix\nYou need to enter the time to seek!```')
    let stream = ytdl(server_queue.songs[0].url,{filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25});
    server_queue.connection.play(stream, streamOptions, { type: 'opus'})
    server_queue.connection.on("finish", () => {
         if(server_queue.loop){
             let last = server_queue.songs.shift();
             server_queue.songs.push(last);
             module.exports.play(server_queue.songs[0], message);
         }else{
        server_queue.songs.shift();
         module.exports.play(server_queue.songs[0], message);
         }

     })
     server_queue.connection.on("error", (err) => {
         console.error(err);
         server_queue.songs.shift();
         module.exports.play(server_queue.songs[0], message);
     });
}

const pause_command = (message, server_queue) => {

    if (!message.member.voice.channel) return message.channel.send('```fix\nYou need to be in a channel to execute this command!```');
    if(!server_queue) return message.channel.send(`There are no songs in queue 😔`);
    if(server_queue.connection.dispatcher.paused) return server_queue.connection.dispatcher.resume();
    server_queue.connection.dispatcher.pause();
}