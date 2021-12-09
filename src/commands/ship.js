const Command = require("../structures/Command.js");
const Discord = require("discord.js");
const { Misc } = require("../Data/misc.js");
const misc = new Misc();

/**
 * @param {Number} amountOfHearts
 * @param {Array} array 
 */
function calculateShip(amountOfHearts, array) {

    const reactions = 
                    [
                        "enemies 😡", 
                        "alright, i guess... 🙄", 
                        "good friends 😄",
                        "happily in love 🥰", 
                        "engaged 💍",
                    ];

    for (let index = 0; index < amountOfHearts; index++) {
        array.push("💖");
    }
    const amountofRedHearts = array.length;

    if (amountofRedHearts < 5) {
        while (array.length < 5) {
            array.push("💔");
        }
    }
    console.log(array);
    array.push(amountofRedHearts);
    array.push(reactions[amountofRedHearts - 1]);
}

function shipPercent() {
    const MAX = 100;
    const shipPercentage = Math.floor(Math.random() * MAX + 1);
    let amountOfHearts = Math.round(shipPercentage / 20);
    return amountOfHearts;
}


module.exports = new Command({
    name: "Ship",
    description: "calculate ship",
    example: "a?ship @akie @akire \n a?ship @akie",
    type: "Fun",
    async run(message, args, client) {
        console.log(args);
        if (!args[1]) return message.reply("mentions or names were not included :(");

        let selfName = new String();
        let otherName = new String();

        const embed = new Discord.MessageEmbed();
        const whoAsked = message.author.username;

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

        console.log(`selfName = ${selfName}\notherName = ${otherName}`);

        let amountOfHearts = new Array();
        let embedDescription = new Array();

        calculateShip(shipPercent(), amountOfHearts);

        for (let index = 0; index < amountOfHearts.length - 2; index++) {
            const element = amountOfHearts[index];
            embedDescription.push(element);
        }



        embed
            .setAuthor(
                `shipping ${selfName} & ${otherName}.`,
                message.author.avatarURL({ dynamic: true })
            )
            .setTitle(`${client.user.username} thinks that ${selfName} & ${otherName} are...`)
            .setDescription(`${misc.stringifyArray(embedDescription)}`)
            .addField(
                `${amountOfHearts[amountOfHearts.length - 2]}/5 💖!`,
                amountOfHearts[amountOfHearts.length - 1]
            )
            .setColor("RED")
            .setFooter("akie !!")
            .setTimestamp();

            message.reply({ embeds: [embed] });
    }
});