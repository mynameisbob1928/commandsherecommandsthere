const config = require('../config.json');
module.exports = {
	name: 'messageCreate',
	once: false,
	/**
	 * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
	 */
	async execute(message, client) {
		if (!config.ownerIds.includes(message.author.id)) return;
		if (message.content.toLowerCase().startsWith(',addcmd')) {
			let commands = message.content.split(' ').slice(1);
			if (commands.length == 0) return message.reply('Please specify what commands to add');
			let a;
			for (const command of commands) {
				if (!client.commands.get(command)) {
					a = true;
					message.reply(`Command ${command} does not exist`);
				}
				else if (client.guildlist[message.guild.id].includes(command)) {
					a = true;
					message.reply(`Command ${command} has already been added to this server`);
				}
			}
			if (a) return;
			commands.push(...client.guildlist[message.guild.id]);
			const notok = await client.pushcmds(message.guild.id, commands);
			if (notok) return message.reply(`Failed to push commands: ${notok}`);
			client.guildlist[message.guild.id] = commands;
		}
		else if (message.content.toLowerCase().startsWith(',removecmd')) {
			let commands = message.content.split(' ').slice(1);
			if (commands.length == 0) return message.reply('Please specify what commands to remove');
			let a;
			for (const command of commands) {
				if (!client.commands.get(command)) {
					a = true;
					message.reply(`Command ${command} does not exist`);
				}
				else if (!client.guildlist[message.guild.id].includes(command)) {
					a = true;
					message.reply(`Command ${command} has not been added to this server, therefore it cannot be removed`);
				}
			}
			if (a) return;
			let commandlist = client.guildlist[message.guild.id].filter(command => !commands.includes(command));
			const notok = await client.pushcmds(message.guild.id, commandlist);
			if (notok) return message.reply(`Failed to push commands: ${notok}`);
			client.guildlist[message.guild.id] = commandlist;
		}
		else if (message.content.startsWith(',help')) {
			message.reply('Commands:\n> ,addcmd [command names]\n> ,removecmd [command names]\n> ,help');
		}
	},
};