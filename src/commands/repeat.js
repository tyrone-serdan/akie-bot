const Command = require("../structures/Command.js");
const { Misc } = require("../Data/misc.js");
const misc = new Misc();

module.exports = new Command({
    name: "Repeat",
    description: "Repeats what the user said.",
    example: "a?repeat Gibberish Here",
    type: "Fun",
    async run(message, args, client) {

        let content = misc.stringifyArray(args);
        await message.reply(content);
        
    }
});