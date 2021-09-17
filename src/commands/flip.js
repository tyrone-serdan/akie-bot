const Command = require("../structures/Command.js");

function coinFlip() {
    let randNum = Math.random();

    if (randNum < 0.5) {
        return true;
    }
    else if (randNum > 0.5) {
        return false;
    }
}


module.exports = new Command({
    name: "Flip",
    description: "flips a coin.",
    example: "?flip",
    async run(message, args, client) {
        const result = coinFlip();

        if (result === true) {
            message.reply("Heads!");
        }
        else {
            message.reply("Tails!");
        }
        
    }
});