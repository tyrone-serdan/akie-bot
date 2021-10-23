const Command = require("./Command.js");
const Discord = require("discord.js");
const {readdirSync} = require("fs");

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

        readdirSync('./src/commands')
            .forEach(folder => {
                readdirSync(`./src/commands/${folder}`)
                    .filter(jsFile => jsFile.endsWith(".js"))
                    .forEach(cmd => {
                        /**
                         * @type {Command}
                         */
                        const command = require(`../commands/${folder}/${cmd}`);
                        
                        this.commands.set(command.name, command);
                    });
            })
    }

    getCommands() {
        /**
         * @returns {Discord.Collection}
         */
        return this.commands;
    }
};