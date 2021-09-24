const Command = require("../structures/Command.js");
const Discord = require("discord.js");
const DiscordVoice = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const playdl = require("play-dl");
const { crypto_secretstream_xchacha20poly1305_keygen } = require("libsodium-wrappers");


/**
 * 
 * @param {String} arg 
 * @returns array[0] = genre selected, array[1] song selected from genre
 */
function getGenre(arg) {
    arg = arg.toLowerCase();

    const YOUTUBE = "https://www.youtube.com/watch?v=";

    const lofi = ["T7GvvbD6S2Y", "81WBzpwK1Rk", "lTRiuFIWV54"];
    const jazz = ["iEaWam2wVMY", "fSbKuxXP9KE", "km9Il_-FHjw"];
    const japanese = ["N0lwQ3NjcKQ", "1gSe78TIEEk", "UZ7oOhhPEWU"];
    const tswift = [];
    const rnb = [];
    const genres = ["japanese", "lofi", "jazz",];
    
    const randomSong = Math.floor(Math.random() * 3);
    let array = [];

    switch (arg) {
        case "japanese":
            array.push(YOUTUBE + japanese[randomSong]);
            break;

        case "jazz":
            array.push(YOUTUBE + jazz[randomSong]);
            break;

        case "lofi":
            array.push(YOUTUBE + lofi[randomSong]);
            break;
        case "list":
            genres.forEach(genre => {
                genre = `\`${genres}\` `
                array.push(genre);
            })
            break;
        case "disconnect":
            array.push("disconnect");
            break;
        default:
            array.push("That is not a valid subcommand! use \`a?music list\` for a list of subcommands!");
            break;
    }
    return array;
}

module.exports = new Command({
    name: "Genre",
    description: "plays a collection of songs of the given genre",
    example: "a?music japanese",
    type: "Music",
    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();

        if (!args[1]) return message.reply("You do not have params for the music cmd!");
        const chosenGenre = getGenre(args[1]);

        let channel = message.member.voice.channel;

        const player = DiscordVoice.createAudioPlayer();

        const connection = await DiscordVoice.joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        if (!chosenGenre[0].startsWith("https://")) {

            if (chosenGenre[0] == "disconnect") {
                connection.destroy();
                return message.reply("Disconnecting!");
            }
            embed
            .setColor("DARK_RED")
            .setTitle("List of Subcommands for music!")
            .setDescription(
                chosenGenre[0]
            )
            .setFooter("akie !!")
            .setTimestamp();

            return message.reply({embeds : [embed] });

        } else if (!chosenGenre[0].startsWith("That is not a")){

            let ytInfo = await playdl.video_info(chosenGenre[0]);
            let stream = await playdl.stream_from_info(ytInfo);
            const resource = DiscordVoice.createAudioResource(stream.stream, { inputType : stream.type});
        
            player.play(resource);
            connection.subscribe(player);
    
            const songName = ytInfo.video_details.title;
            
            embed
                .setColor("RED")
                .setAuthor(
                    message.author.username,
                    message.author.avatarURL({ dynamic: true })
                )
                .setTitle(`Now playing ${ytInfo.video_details.title}!`)
                .setURL(ytInfo.video_details.url)
                .setImage(ytInfo.video_details.thumbnail.url)
                .setTimestamp()
                .setFooter('akie !!');
    
            return message.reply({ embeds: [embed] });
        } else {
            embed
            .setTitle(chosenGenre[0])
            .setFooter("akie !!")
            .setTimestamp();
            
            return message.reply({ embeds: [embed] });
        }
    }
});