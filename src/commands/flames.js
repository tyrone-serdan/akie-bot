const Command = require("../structures/Command.js");
const Discord = require("discord.js");


// Get the name of the messager and the person @ed,
// foreach letter of both names, check if they are the same letter,
// if yes, add them to array, if not, return.
// get the amount of letters left over.
// then use up the letters left over to count flames until we end at a letter.


module.exports = new Command({
    name: "Flames",
    description: "Plays flames with the user/users mentioned",
    example: "a?flames @akie @akire\na?flames @akie",
    type: "Fun",
    async run(message, args, client) {

        const FLAMES = ["friends","lovers","acquaintances", "married", "enemies", "sweethearts"];
        const embed = new Discord.MessageEmbed();

        let arrayofLetters = new Array();
        let biggerArray = new Array();
        let smallerArray = new Array();

        let selfName = new String();
        let otherName = new String();
        
        if (!args[1]) return message.reply("mention/mentions are not included :(");

        // I swear ill clean this up when i find a better way
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
        } else {
            selfName = args[1];
            otherName = args[2];
        }

        
        selfName = selfName.toLowerCase();
        otherName = otherName.toLowerCase();

        if (otherName.length < selfName.length) {
            biggerArray = otherName;
            smallerArray = selfName;
        } else {
            biggerArray = selfName;
            smallerArray = otherName;
        }

        // small [turon]
        // big [aaron]


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