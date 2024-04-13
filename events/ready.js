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
			fs.writeFileSync('./guilds.json', `${JSON.stringify(client.guildlist)}`);
			/*
			idk why but this didn't work for me, if someone can figure out why it isn't working then that'll be great :3

			const guilds = require('../guilds.json');
			console.log('guilds\n', guilds);
			console.log('\nclient guilds\n', client.guildlist);
			if (guilds !== client.guildlist) {
				fs.writeFileSync('./guilds.json', `${JSON.stringify(client.guildlist)}`);
				client.guildlist = guilds;
				console.log('saved guild file');
			}
			else {
				console.log('nothing new to save');
			}
			delete require.cache[require.resolve('../guilds.json')];*/
		}, 2 * 1000 * 60);
	},
};