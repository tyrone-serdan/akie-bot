const Command = require("../../Structures/Command.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { prefix } = require("../../Data/config.json");

const commandName = "disconnect"
module.exports = new Command({
    name: commandName,
    description: "Disconnects the bot from the call",
    example:`${prefix}${commandName}`,
    async run(message, args, client) {
        const connection = getVoiceConnection(message.guild.id);
        const memberChannel = message.member.voice.channel;

        if (connection) {
            return;
        }

    }
})