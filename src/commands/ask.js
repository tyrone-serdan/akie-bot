const Command = require("../structures/Command.js");
const Discord = require("discord.js");


/**
 * 
 * @param {Array} msg 
 * @returns {String}
 */

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

function getResponse() {
    let positiveResponses = ["akie says yes.", "no shit.", "absolutely, yes. as you should.", "yupp truly !!"];
    let neutralResponses = ["yes? no? akie not sure.", "well.", "are you sure you want to know the answer to that?", "think abt it again and reflect."];
    let negativeResponses = ["akie thinks no.", "of course not, are you stupid", "you’re expecting too much. it’s a no", "just give up tbh."];

    let whichResponse = Math.floor(Math.random() * 4);
    if (whichResponse == 0) whichResponse = 1;

    let whichMessage = Math.floor(Math.random() * positiveResponses.length);

    if (whichResponse === 1 || whichResponse === 0) {
        return [positiveResponses[whichMessage], 'GREEN'];
    } else if (whichResponse === 2) {
        return [neutralResponses[whichMessage], 'YELLOW'];
    } else if (whichResponse === 3) {
        return [negativeResponses[whichMessage], 'DARK_RED'];
    } else {
        return "tell turon something broke";
    }
}

module.exports = new Command({
    name: "Ask",
    description: "Asks the bot a yes or no question.",
    example: "a?ask are you awake?",
    type: "Decision",
    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();

        let question = putWordsIntoString(args);
        let response = getResponse();

        embed
            .setTitle(question)
            .setAuthor(
                `asked by ${message.author.username}`,
                message.author.avatarURL({ dynamic: true })
                )
            .setDescription(response[0])
            .setTimestamp()
            .setColor(response[1])
            .setFooter('akie !!');

        message.reply({ embeds: [embed] });
    }
});