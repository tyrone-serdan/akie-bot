const Command = require("../structures/Command.js");
const Discord = require("discord.js");

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

/**
 * @param {Array} msg 
 */
 function putWordsIntoString(msg) {
    let content = new String();

    msg.forEach(word => {
            word = word + " ";
            content += word;
    });

    return content;

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
    async run(message, args, client) {
        console.log(args);
        if (!args[1]) return message.reply("mentions or names were not included :(");

        let selfName = new String();
        let otherName = new String();

        const embed = new Discord.MessageEmbed();
        const whoAsked = message.author.username;

        if (!args[2]) {
            selfName = message.author.username;

            if (args[2].startsWith("<@")) {
                otherName = message.mentions.users.first().username;
            } else {
                otherName = args[2];
            }

        } else if (args[2]) {

            if (!args[1].startsWith("<@")) {
                
                selfName = args[1];
                otherName = args[2];

            } else {

                const mentions = message.mentions.users.first(2);

                selfName = mentions[0].username;
                otherName = mentions[1].username;

            }

            console.log(`selfname = ${selfName}\n otherName = ${otherName}`);
        }

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
            .setDescription(`${putWordsIntoString(embedDescription)}`)
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