<<<<<<< HEAD:src/commands/repeat.js
const Command = require("../structures/Command.js");
const { Misc } = require("../Data/misc.js");
const misc = new Misc();
=======
const Command = require("../../structures/Command.js");

/**
 * @param {Array} msg 
 */
function putWordsIntoString(msg) {
    let content = new String();

    msg.forEach(word => {
        if (word == msg[0]) {
            console.log(`skipping ${word}`);
            return;
        }
        else {
            word = word + " ";
            content += word;
        }
    });

    return content;

}
>>>>>>> 28d8f975d5fe73f481dd18ead2c205007b4dbcdb:src/commands/fun/repeat.js

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