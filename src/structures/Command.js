const Discord = require("discord.js");
const { prefix } =  require("../Data/config.json");
/**
 * 
 * @param {Discord.Message} message 
 * @param {String[]} args 
 * @param {Discord.Client} client 
 */

function runFunction(message, args, client) {}

module.exports = class Command {
    /**
     * @typedef {{name: String, description: String, type: String , example: String, run: runFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.example = options.example;
        this.type = options.type;
        this.run = options.run;
    }
}