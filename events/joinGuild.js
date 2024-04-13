const config = require('../config.json');
module.exports = {
	name: 'guildCreate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Guild} guild
	 */
	async execute(guild, client) {
		const notok = await client.pushcmds(guild.id, config.defaultCommands);
		if (notok) return;
		client.guildlist[guild.id] = config.defaultCommands;
	},
};