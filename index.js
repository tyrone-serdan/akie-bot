console.clear();
// required for bot use
const Client = require("./src/structures/Client.js");
const config = require("./src/data/config.json");
const client = new Client();

// for small features
const time = require("./src/data/time.js");

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

    command.run(message, args, client);

});

client.on('ready', (message) => {
    const curTime = time.getTime();
    const HoursToNotify = [1,4,7,10];
    let prettifiedDate = new String();

    for (let i = 0; i < curTime.length; i++) {
        let element = curTime[i];
        if (i == curTime.length - 1) continue;

        prettifiedDate += element;
    }

    console.log(`akie up & running @ ${prettifiedDate}`);
    
    client.user.setActivity('a?commands', {type: 'LISTENING'});

    setInterval( () => {
        HoursToNotify.forEach(hour => {
            if (hour == curTime[0]) {
                console.log("remind!");
            }
        })
    }, 600000);
});

client.start(config.token);
