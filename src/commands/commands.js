const Command = require("../Structures/Command.js");
const Client = require("../structures/Client.js")
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client();

/**
 * 
 * @param {Array} array 
 */
function beautifyCommandsList(array) {
    let list = new String();
    
    array.forEach((element, key) => {
        if (array.length - 1 === key) {
            list += `\`${element.name}\`.`;
        } else {
            list += `\`${element.name}\`,`;
        }
    });
    return list;
}


module.exports = new Command({
	name: "Commands",
	description: "Shows a list of commands. \nshows a command's description.",
    example: "?commands or ?commands ask",
	async run(message, args, client) {
        const url = "https://cdn.discordapp.com/avatars/888089757811367996/192bb17f3325a9de165f139a71afc678.webp";
		const embed = new Discord.MessageEmbed();
        
        let arrayOfCommands = new Array();
        let listOfCommands = new Discord.Collection();
        
        listOfCommands = client.getCommands();
        listOfCommands.filter(command => arrayOfCommands.push(command));
        
        if (args[1] != null) {
            args[1] = args[1].charAt(0).toUpperCase() + args[1].slice(1);

            let cmd;
            for (let index = 0; index < arrayOfCommands.length; index++) {
                if (arrayOfCommands[index].name == args[1]) {
                    
                    cmd = arrayOfCommands[index];
                    break;
                }
            }

            if (cmd == null) {
                message.reply("Command not found :(");
            } else {

                embed
                .setTitle(`?${cmd.name}`)
                .setDescription(`${cmd.description}\n\`${cmd.example}\``)
                .setColor("WHITE")
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}`)
                .setThumbnail(url);
        
                message.reply({ embeds: [embed] });
            }

        } else {

            let Commands = beautifyCommandsList(arrayOfCommands);
        
        
            embed
                .setTitle("List of Commands for Akie")
                .setDescription(`Requested by ${message.author.username}`)
                .addFields({ name: "Commands", value: Commands })
                .setColor("WHITE")
                .setTimestamp()
                .setFooter('do ?commands <command> for help info')
                .setThumbnail(url);
        
            message.reply({ embeds: [embed] });
        }
	}
});