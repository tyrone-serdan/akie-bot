const Command = require("../structures/Command.js");

const Discord = require("discord.js");

/**
 * @param {Array} msg 
 */
 function putWordsIntoString(msg) {
    let content = new String();

    msg.forEach(word => {
        if (word == msg[0]) {
            return;
        }
        else {
            if (word == msg[1]) {
                return;
            }

            word = word + " ";
            content += word;
        }
    });

    return content;
}

function getRandomQuote(user) {
    let quote = ["somehow, somewhere.","many moons ago.",`back in ${user.username}'s day.`,"actually just happened",];
    let whichQuote = Math.floor(Math.random() * quote.length);

    return quote[whichQuote];
}


module.exports = new Command({
	name: "Quote",
	description: "quotes a user.",
    example: "a?quote @akie text here",
    type: "Fun",
	async run(message, args, client) {
		const embed = new Discord.MessageEmbed();
		const userMentioned = message.mentions.users.first();

        if (userMentioned === undefined) {
            message.reply("Can't find mentioned user :(");
            return;
        }

        embed
            .setAuthor(
                userMentioned.username,
                userMentioned.avatarURL({ dynamic: true })
            )
            .setDescription(putWordsIntoString(args))
            .setColor("RANDOM")
            .setFooter(`sent | ${getRandomQuote(userMentioned)}`)
            .setTimestamp()

		message.reply({ embeds: [embed] });
	}
});