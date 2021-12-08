const { Collection } = require("discord.js");
module.exports = class Queue {
    constructor() {
        /**
         * @type {Collection<String, String[]>}
         */
        this.queues = new Collection();
    }

    /**
     * 
     * @param {String} guildID 
     */
    findQueue(guildID) {
        return this.queues.findKey(guildID);
    }

    /**
     * 
     * @param {String} guildID 
     * @param {String} song 
     * @returns 
     */
    createQueue(guildID, song) {
        if (this.queues.findKey(guildID)) return;
        
        this.queues.set(guildID, (song ? [song] : [])); 
    }
    /**
     * 
     * @param {String} guildID 
     */
    deleteQueue(guildID) {
        if (this.queues.findKey(guildID)) this.queues.delete(guildID);
    }

    /**
     * 
     * @param {String} guildID 
     * @param {String} song  
     */
    addSong(guildID, song) {
        this.queues.get(guildID).push(song);
    }

    /**
     * 
     * @param {String} guildID 
     * @param {String} song  
     */
    removeSong(guildID, song) {
        const queue = this.queues.get(guildID)
        let newQueue = queue.filter(qs => qs !== song);
    }

    /**
     * 
     * @param {String} guildID 
     */
    skipSong(guildID) {
        const queue = this.queues.get(guildID);
        this.removeSong(guildID, queue[0]);
    }
}