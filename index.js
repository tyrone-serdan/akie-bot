console.clear();
// required for bot use

const fs = require("fs");
const config = require("./src/data/config.json");

const Client = require("./src/structures/Client.js");
const client = new Client();

// for small features
const time = require("./src/data/time.js");

// process.on('unhandledRejection', (err) => {
//     console.log(`ERROR MESSAGE: ${err}`);
// });

client.on('messageCreate', message => {
    if (message.author.bot == true) return;
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substring(config.prefix.length).split(/ +/);
    args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    
    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`${args[0]} is not a valid command :(`);

    command.run(message, args, client);
});

client.on('ready', () => {
    const curTime = time.getTime();
    console.log(`akie up & running @ ${curTime}`);
    client.user.setActivity('?commands', {type: 'LISTENING'});
});

client.start(config.token);
