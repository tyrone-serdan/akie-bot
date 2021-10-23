const Command = require("../../Structures/Command.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { prefix } = require("../../Data/config.json");

const commandName = "join";
module.exports = new Command({
    name: commandName,
    description:"joins the voice channel.",
    example:`${prefix}${commandName}`,
    async run(message, args, client) {
        console.log("bruhvrivh");
        const userChannel = message.member.voice.channel;
        let connection;
        if (userChannel) {
            connection = await joinVoiceChannel({
                channelId: userChannel.id,
                guildId: userChannel.guild.id,
                adapterCreator: userChannel.guild.voiceAdapterCreator
            });
        } else {
            return message.reply(`I'm sorry, but you are not in a voice channel!`);
        }
    }
})