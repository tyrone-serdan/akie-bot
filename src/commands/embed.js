const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
	name: "Embed",
	description: "Shows an embed.",
	async run(message, args, client) {
		const embed = new Discord.MessageEmbed();
		const userMentioned = message.mentions.users.first();

        console.log(userMentioned);

        if (userMentioned === undefined) {
            message.reply("Can't find mentioned user :(");
            return;
        }

        embed
            .setTitle(userMentioned.username)
            .setAuthor(
                `Requested by ${message.author.username}`,
                message.author.avatarURL({ dynamic: true })
            )
            .setDescription(`The person's name is ${userMentioned.username}`)
            .setColor("RANDOM")
            .setThumbnail(userMentioned.avatarURL({ dynamic: true }));

		message.reply({ embeds: [embed] });
	}
});