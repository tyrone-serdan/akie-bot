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

module.exports = new Command({
    name: "Repeat",
    description: "Repeats what the user said.",
    example: "a?repeat Gibberish Here",
    type: "Fun",
    async run(message, args, client) {

        let content = putWordsIntoString(args);
        await message.reply(content);
        
    }
});