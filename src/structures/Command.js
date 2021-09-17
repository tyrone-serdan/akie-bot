const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 * @param {Discord.Client} client 
 */

function runFunction(message, args, client) {}

module.exports = class Command {
    /**
     * @typedef {{name: String, description: String, run: runFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}