const Command = require("../structures/Command.js");
const Discord = require("discord.js");
const DiscordVoice = require("@discordjs/voice");
const ytdl = require("ytdl-core");

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
    name: "Music",
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
            const resource = DiscordVoice.createAudioResource(
                ytdl(chosenGenre[0], 
                    {filter: "audioonly"}
                    )
                );
        
            player.play(resource);
            connection.subscribe(player);
    
            const songName = (await ytdl.getInfo(chosenGenre[0])).videoDetails;
    
            console.log(songName.thumbnails)
            embed
                .setColor("RED")
                .setAuthor(
                    message.author.username,
                    message.author.avatarURL({ dynamic: true })
                )
                .setTitle(`Now playing ${songName.title}!`)
                .setURL(chosenGenre[0])
                .setTimestamp()
                .setImage(
                    songName.thumbnails[4].url
                )
                .setFooter('akie !!');
    
            return message.reply({ embeds: [embed] });
        } else {
            embed
            .setTitle(chosenGenre[0])
            .setFooter("akie !!")
            .setTimestamp();
            
            return message.reply({ embeds: [embed] });
        }
        // const jazzLinks = ["lj4VncsqFQw","neV3EPgvZ3g","305FjhbMagc"];
        // const getRandomJazz = jazzLinks[Math.floor(Math.random() * jazzLinks.length)];
        // const jazzChosen = `https://www.youtube.com/watch?v=${getRandomJazz}`;
        // console.log(jazzChosen);
        // const stream = ytdl(jazzChosen, {filter: 'audioonly'});
    }
});