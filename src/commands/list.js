const Command = require("../Structures/Command.js");
const Client = require("../structures/Client.js")
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client();


module.exports = new Command({
	name: "list",
	description: "shows list of commands",
	async run(message, args, client) {
        const url = "https://cdn.discordapp.com/avatars/888089757811367996/192bb17f3325a9de165f139a71afc678.webp";
		const userMentioned = message.mentions.users.first();
		const embed = new Discord.MessageEmbed();

        let arrayOfCommands = new Array();

        let listOfCommands = new Discord.Collection();
        listOfCommands = client.getCommands();

        listOfCommands.filter(command => arrayOfCommands.push(command));

        embed
            .setTitle("List of Commands for Akie")
            .addFields(
                { name: `${arrayOfCommands[0].name}`, value: `${arrayOfCommands[0].description}`},
                { name: `${arrayOfCommands[1].name}`, value: `${arrayOfCommands[1].description}`},
                { name: `${arrayOfCommands[2].name}`, value: `${arrayOfCommands[2].description}`}
            )
            .setColor("GOLD")
            .setThumbnail(url);

		message.reply({ embeds: [embed] });
	}
});