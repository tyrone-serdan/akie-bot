const Command = require("../../structures/Command.js");
const Discord = require("discord.js");

<<<<<<< HEAD:src/commands/flames.js
=======
/**
 * 
 * @param {Array} args
 * @param {Discord.Message | Discord.Interaction} message
 * @param {String} selfName
 * @param {String} otherName
 */
function getNames(args, message, selfName, otherName) {

    if (args[1].startsWith("<@") && !args[2].startsWith("<@")) {

        selfName = message.mentions.users.first().username;
        otherName = args[2];

    } else if (!args[1].startsWith("<@") && args[2].startsWith("<@")) {

        selfName = args[1];
        otherName = message.mentions.users.first().username;

    } else if (args[1].startsWith("<@") && args[2].startsWith("<@")) {

        const mentions = message.mentions.users.first(2);
        selfName = mentions[0].username;
        otherName = mentions[1].username;

    } else if (args[1] && args[2]) {

        selfName = args[1];
        otherName = args[2];
>>>>>>> 28d8f975d5fe73f481dd18ead2c205007b4dbcdb:src/commands/fun/flames.js

    } else {

        selfName = message.author.username;
        otherName = message.mentions.users.first().username;

    }

    selfName = selfName.toLowerCase();
    otherName = otherName.toLowerCase();
}

module.exports = new Command({
    name: "Flames",
    description: "Plays flames with the user/users mentioned",
    example: "a?flames @akie @akire\na?flames @akie",
    type: "Fun",
    async run(message, args, client) {

        if (!args[1]) return message.reply("user/users are not included :(");

        const FLAMES = ["friends","lovers","acquaintances", "married", "enemies", "sweethearts"];
        const embed = new Discord.MessageEmbed();

        let arrayofLetters = new Array();
        let biggerArray = new Array();
        let smallerArray = new Array();

        let selfName = new String();
        let otherName = new String();
    

        getNames(args, message, selfName, otherName);
        

        if (otherName.length < selfName.length) {
            biggerArray = otherName;
            smallerArray = selfName;
        } else {
            biggerArray = selfName;
            smallerArray = otherName;
        }



        for (let index = 0; index < smallerArray.length; index++) {
            const letterToCompare = smallerArray[index];

            for (let i = 0; i < biggerArray.length; i++) {
                const whatToCompareTo = biggerArray[i];

                if (letterToCompare == ' ' || whatToCompareTo == ' ') {
                    continue;
                }

                if (letterToCompare === whatToCompareTo) {
                    arrayofLetters.push(letterToCompare);
                }
            }
            
        }
    

        let amountOfLetters = arrayofLetters.length;

        while (amountOfLetters > 6) {
            amountOfLetters = amountOfLetters - 6;
        }

        if (amountOfLetters - 1 == -1) {
            amountOfLetters = 1
        }
        

        const result = FLAMES[amountOfLetters - 1];

        embed
            .setAuthor(
                `FLAMES`,
            )
            .setTitle(`testing ${selfName} & ${otherName}'s compatibility!`)
            .setDescription(`They could be ${result}!`)
            .setColor("RED")
            .setFooter(`akie !!`)
            .setTimestamp()

		message.reply({ embeds: [embed] });
    }
});