const Command = require("./Command.js");
const Discord = require("discord.js");
const fs = require("fs");

const intents = new Discord.Intents(32767);

module.exports = class Client extends Discord.Client {
    constructor() {
        super({ intents });
        /**
         * @type {Discord.Collection<String, Command>}
         */
        this.commands = new Discord.Collection();
    }
    start(token) {
        this.login(token);
        
        fs.readdirSync("./src/commands")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            /**
             * @type {Command}
             */
            const command = require(`../commands/${file}`);
            console.log(`command ${command.name} is now loaded!`);

            this.commands.set(command.name, command);
        });
    }

    getCommands() {
        /**
         * @returns {Discord.Collection}
         */
        return this.commands;
    }
};