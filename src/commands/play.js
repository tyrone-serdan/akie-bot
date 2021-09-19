const Commands = require("../structures/Command.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const DiscordVoice = require("@discordjs/voice");
const fs = require("fs");

/**
 * @param {String} arg 
 * @returns True//False
 */
function isValidURL(arg) {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(arg)) {
        return false;
    } else {
        return true;
    }
}

module.exports = new Commands({
    name: 'Play',
    description: 'plays music from youtube.',
    example: 'a?play https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    async run(message,args,client) {
        let channel = message.member.voice.channel;
        if (!channel) return message.reply("You are not in a voice channel :(");
    
        
        
        if (!args[1]) return message.reply("A url was not included :(");
        if (isValidURL(args[1])) {
            // const url = args[1];
            // const stream = ytdl(url, {filter: 'audioonly'})
            //                 .pipe(fs.createWriteStream('youtube/video.mp4'));

            // const player = DiscordVoice.createAudioPlayer();
            // const resource = DiscordVoice.createAudioResource('youtube/video.mp4');
            // const connection = await DiscordVoice.joinVoiceChannel({
            //     channelId: channel.id,
            //     guildId: channel.guild.id,
            //     adapterCreator: channel.guild.voiceAdapterCreator
            // });

            // setTimeout( ()=> {
            //     player.play(resource);
            //     connection.subscribe(player);
            // }, 2000);
        }
    }
})