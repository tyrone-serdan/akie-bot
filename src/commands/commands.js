const Command = require("../Structures/Command.js");
const Client = require("../structures/Client.js")
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client();

module.exports = new Command({
	name: "Commands",
	description: "Shows list of commands.",
    example: "|| ?commands",
	async run(message, args, client) {
        const url = "https://cdn.discordapp.com/avatars/888089757811367996/192bb17f3325a9de165f139a71afc678.webp";
		const embed = new Discord.MessageEmbed();

        let arrayOfCommands = new Array();
        let listOfCommands = new Discord.Collection();

        listOfCommands = client.getCommands();
        listOfCommands.filter(command => arrayOfCommands.push(command));

        embed
            .setTitle("List of Commands for Akie")
            .setDescription(`Requested by ${message.author.username}`)
            .addFields(
                { name: `${arrayOfCommands[0].name}`, value: `${arrayOfCommands[0].description}\n${arrayOfCommands[0].example}`,},
                { name: `${arrayOfCommands[1].name}`, value: `${arrayOfCommands[1].description}\n${arrayOfCommands[1].example}`},
                { name: `${arrayOfCommands[2].name}`, value: `${arrayOfCommands[2].description}\n${arrayOfCommands[2].example}`}
            )
            .setColor("GOLD")
            .setThumbnail(url);

		message.reply({ embeds: [embed] });
	}
});