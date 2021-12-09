console.clear();
// required for bot use
const Client = require("./src/structures/Client.js");
const client = new Client();
const express = require("express");
const app = express();
const port = 3000;
const config = require("./src/data/config.json");
app.all('/', (req,res) => res.send("I'm Alive!"));

app.listen(port, () => console.log(`running on localhost:${port}`));

// for small features
const misc = require("./src/data/misc.js");

let errorMsg;

process.on('unhandledRejection', (err) => {
    errorMsg = `ERROR MESSAGE: ${err}`;
});

client.on('messageCreate', message => {

    if (message.author.bot == true) return;
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.substring(config.prefix.length).split(/ +/);
    args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    
    const command = client.commands.find(cmd => cmd.name == args[0]);

    if (!command) return message.reply(`${args[0]} is not a valid command :(`);

    if (errorMsg) {
        let msg = errorMsg;
        errorMsg = '';
        return message.reply(msg);
    }

    args.shift(); // Removes command when sending args to command

    command.run(message, args, client);

});

client.on('ready', (message) => {
    const curTime = misc.getTime();

    let prettifiedDate = new String();

    for (let i = 0; i < curTime.length; i++) {
        let element = curTime[i];
        if (i == curTime.length - 1) continue;

        prettifiedDate += element;
    }

    console.log(`akie up & running @ ${prettifiedDate}`);

    client.user.setActivity('a?commands', {type: 'LISTENING'});
});

client.start(config.token);
