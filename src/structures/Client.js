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
        let folder = new String();
        for (let index = 1; index <= 4; index++) {
            switch (index) {
                case 1:
                    folder = "decision"
                    break;
                case 2:
                    folder = "fun"
                    break;
                case 3:
                    folder = "music"
                    break;
                case 4:
                    folder = "helpful"
                    break;
            
                default:
                    break;
            }
            fs.readdirSync(`./src/commands/${folder}`)
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                /**
                 * @type {Command}
                 */
                const command = require(`../commands/${folder}/${file}`);
                console.log(`command ${command.name} from ${folder} is now loaded!`);
    
                this.commands.set(command.name, command);
            });
        }
    }

    getCommands() {
        /**
         * @returns {Discord.Collection}
         */
        return this.commands;
    }
};