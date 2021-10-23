const Command = require("../../Structures/Command.js");
const { MessageEmbed, Collection } = require("discord.js");
const {prefix} = require("../../Data/config.json");

const commandName = "commands";
module.exports = new Command({
    name: commandName,
    description: "Shows a list of all commands\nShows how to use a command",
    example: `${prefix}${commandName} || ${prefix}${commandName} join`,
    async run(message, args, client) {
        const embed = new MessageEmbed();

        /**
         * @type {Collection}
         */
        const commandsLoaded = client.getCommands();

        if (commandsLoaded.has(args[1])) {
            const commandRequested = commandsLoaded.get(args[1]);

            embed
            .setColor("DARK_ORANGE")
            .setTitle(String(commandRequested.name).toUpperCase())
            .setDescription(`${commandRequested.description}\n \`${commandRequested.example}\` `)
            .setFooter(`${client.user.username} !!`, client.user.displayAvatarURL())
            .setTimestamp();

            return message.reply({embeds: [embed]});
        } else {
            let stringOfCommands = new String();
            commandsLoaded.forEach(cmd => stringOfCommands += `\`${String(cmd.name).toUpperCase()}\` `);

            embed
            .setColor("DARK_ORANGE")
            .setTitle(`${client.user.username}'s Commands`)
            .setDescription(stringOfCommands)
            .setTimestamp()
            .setFooter(`do ${prefix}commands <command> for more info`, client.user.displayAvatarURL())

            return message.reply({embeds: [embed]});
        }
    }
})