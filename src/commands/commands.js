const Command = require("../structures/Command.js");
const Client = require("../structures/Client.js")
const Discord = require("discord.js");
const fs = require("fs");

const client = new Client();

/**
 * 
 * @param {Array} array 
 */
function beautifyCommandsList(array) {
    // decision, helpful, fun

    let CMDList = new Array();
    let decision = new String();
    let helpful = new String();
    let fun = new String();
    let music = new String();
    
    array.forEach((element) => {

        switch (element.type) {
            case "Decision":
                decision += `\`${element.name}\` `;
                break;
                
            case "Helpful":
                helpful += `\`${element.name}\` `;
                break;

            case "Fun":
                fun += `\`${element.name}\` `;
                break;

            case "Music":
                music += `\`${element.name}\` `;
                break;
            
            default:
                console.log(`${element.name} has no type! please add one.`);
        }
            CMDList = [decision, helpful, fun, music];
    });
    return CMDList;
}


module.exports = new Command({
	name: "Commands",
	description: "Shows a list of commands.\nshows a command's description.",
    example: "a?commands\n?commands ask",
    type: "Helpful",
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
                .setFooter(`requested by ${message.author.username}`)
        
                message.reply({ embeds: [embed] });
            }

        } else {

            let Commands = beautifyCommandsList(arrayOfCommands);
        
        
            embed
                .setTitle("List of Commands for Akie")
                .setDescription(`Requested by ${message.author.username}`)
                .addFields(
                    { name: "Decision Commands", value: Commands[0] },
                    { name: "Helpful Commands", value: Commands[1] },
                    { name: "Fun Commands", value: Commands[2] },
                    { name: "Music Commands", value: Commands[3] }
                    )
                .setColor("WHITE")
                .setTimestamp()
                .setFooter('do debug?commands <command> for help info')
        
            message.reply({ embeds: [embed] });
        }
	}
});