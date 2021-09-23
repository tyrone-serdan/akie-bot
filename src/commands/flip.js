const Command = require("../structures/Command.js");
const Discord = require("discord.js");

function coinFlip() {
    let randNum = Math.random();

    if (randNum < 0.5) {
        return "Heads!";
    }
    else if (randNum > 0.5) {
        return "Tails!";
    }
}

function putWordsIntoString(msg) {
    let content = new String();

    msg.forEach(word => {
        if (word == msg[0]) {
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
    name: "Flip",
    description: "flips a coin.",
    example: "a?flip Heads = Do Schoolwork",
    type: "Decision",
    async run(message, args, client) {
        if (!args[1]) return message.reply("a question was not included :(");
        let amountOfMentions = 0;

        console.log(args);

        const user = message.author;
        const embed = new Discord.MessageEmbed();
        const result = coinFlip();

        let question = putWordsIntoString(args);

        embed
            .setAuthor(
                `${user.username} asked...`,
                user.avatarURL({ dynamic: true })
            )
            .setDescription(`${question}\n**${result}**`)
            .setColor("RANDOM")
            .setFooter("akie !!")
            .setTimestamp();

            message.reply({ embeds: [embed] });
    }
});