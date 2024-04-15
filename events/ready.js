const fs = require('fs');
const config = require('../config.json');
module.exports = {
	name: 'ready',
	once: true,
	/**
	 * @param {import('discord.js').Client} client
	 */
	async execute(client) {
		const guildslist = Object.keys(client.guildlist);
		const unguildlist = client.guilds.cache.filter(guild => !guildslist.includes(guild.id));
		for (const value of unguildlist) {
			await new Promise(resolve => setTimeout(resolve, 400));
			const notok = await client.pushcmds(value[1].id, config.defaultCommands);
			if (notok) return;
			console.log(`pushed commands to ${value[1].name} - ${value[1].id}`);
			client.guildlist[value[1].id] = config.defaultCommands;
		}
		if (unguildlist.size != 0) {
			fs.writeFileSync('./guilds.json', `${JSON.stringify(client.guildlist)}`);
			console.log('New guilds have now got commands');
		}
		else { console.log('No new guilds'); }
		setInterval(() => {
			// tysm to @cyposhop for figuring this out :3

			const guildsFile = require('../guilds.json');

			const guildsString = JSON.stringify(guildsFile);
			const clientGuildsString = JSON.stringify(client.guildlist);

			if (guildsString !== clientGuildsString) {
				fs.writeFileSync('./guilds.json', clientGuildsString);
				console.log('Saved guild file');
			}

			delete require.cache[require.resolve('../guilds.json')];
		}, 2 * 1000 * 60);
	},
};