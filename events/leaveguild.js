module.exports = {
	name: 'guildDelete',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Guild} guild
	 */
	async execute(guild, client) {
		delete client.guildlist[guild.id];
	},
};