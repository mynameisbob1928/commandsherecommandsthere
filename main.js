const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();
client.guildlist = require('./guilds.json');
delete require.cache[require.resolve('./guilds.json')];
client.once('ready', () => require('./dashboard/dash.js')(client));

(async () => {
	fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	});
	fs.readdirSync('./events').filter(file => file.endsWith('.js')).forEach(file => {
		const event = require(`./events/${file}`);
		if (!event.once) {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
		else {
			client.once(event.name, (...args) => event.execute(...args, client));
		}
	});
	client.login(process.env.token);
})();


const rest = new REST({ version: '9' }).setToken(process.env.token);

/**
 * @param {string} guildid The guild id to send the commands to
 * @param {Array} commands An array of each command **name**
 */
client.pushcmds = async (guildid, commands) => {
	const commandArray = [];
	for (const command of commands) { commandArray.push(client.commands.get(command).data.toJSON()); }
	try {
		await rest.put(
			Routes.applicationGuildCommands(client.user.id, guildid), {
				body: commandArray,
			},
		);
		return;
	}
	catch (err) {
		console.error(err);
		return err;
	}
};