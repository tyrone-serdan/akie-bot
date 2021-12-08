const Command = require("../../Structures/Command.js");
const { prefix } = require("../../Data/config.json");

const commandName = "play";
module.exports = new Command ({
    name: commandName,
    description: "plays the song from the given link",
    example: `${prefix}${commandName}`,
    async run(message, args, client) {
    }
})