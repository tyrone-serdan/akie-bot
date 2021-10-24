const Command = require("../../Structures/Command.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { prefix } = require("../../Data/config.json");

const commandName = "disconnect"
module.exports = new Command({
    name: commandName,
    description: "Disconnects the bot from the call",
    example:`${prefix}${commandName}`,
    async run(message, args, client) {
        const bot = client.user.id;
        const user = message.author.id;
        //message.guild.channels.cache.some(c => c.type === 'GUILD_VOICE' && c.members.has(client.user.id));
        const connection = getVoiceConnection(message.guild.id);
        const sameChannel = message.guild.channels.cache.some(c => c.type === 'GUILD_VOICE' && c.members.has(bot) && c.members.has(user));

        if (sameChannel && connection) {
            connection.destroy();
            return message.reply("I have left the call!");
        } else {
            const isUserFault = !message.guild.channels.cache.some(c => c.type === 'GUILD_VOICE' && c.members.has(user));
            return message.reply(`${isUserFault ? `You are not in a voice channel!` : `I'm not in a voice channel`}`);
        }
    }
})