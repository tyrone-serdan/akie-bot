console.clear();
// required for bot use
const Client = require("./src/structures/Client.js");
const config = require("./src/Data/config.json");
const client = new Client();
const port = 3000;

// ONLY FOR REPLIT STUFF
const express = require("express");
express().all('/', (req,res) => res.send("I'm Alive!"));
express().listen(port, () => console.log(`running on localhost:${port}`));


process.on('unhandledRejection', (err) => {
    console.log(err);
});

client.on('messageCreate', message => {
    if (message.author.bot == true) return;
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substring(config.prefix.length).split(/ +/);
    args[0] = args[0].toLowerCase();
    
    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`${args[0]} is not a valid command :(`);

    command.run(message, args, client);

});

client.on('ready', () => {
    console.log(`akie up & running!`);
    client.user.setActivity(`${config.prefix}commands`, {type: 'LISTENING'});
});

client.start(config.token);
