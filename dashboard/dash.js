const app = require('express')();
const { join } = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * @param {import('discord.js').Client} client
 */
module.exports = client => {
	app.get('/server/*', async (req, res) => {
		let guild = client.guilds.cache.get(req.url.split('/')[2]);
		if (!guild) guild = await client.guilds.fetch(req.url.split('/')[2]);
		if (!guild) return res.status(404).send(`The server ${req.url.split('/')[2]} was not found`);
		res.sendFile('server.html', { root: join(__dirname, '/') });
	});

	app.get('/guild/*', async (req, res) => {
		const guild = client.guilds.cache.get(req.url.split('/')[2]);
		const data = {
			guild: {
				name: guild.name,
				icon: guild.iconURL({ extension:'webp' }),
				banner: guild.bannerURL({ extension: 'webp' }),
			},
			commands: client.guildlist[guild.id],
			totalcommands: client.commands.map(command => command.data.name),
		};
		res.send(data);
	});

	app.post('/guild/*', async (req, res) => {
		let guild = client.guilds.cache.get(req.url.split('/')[2]);
		if (!guild) guild = await client.guilds.fetch(req.url.split('/')[2]);
		if (!guild) return res.status(404).send(`The server ${req.url.split('/')[2]} was not found`);
		const notok = await client.pushcmds(req.url.split('/')[2], req.body.commands);
		if (notok) return res.status(500).send();
		client.guildlist[guild.id] = req.body.commands;
		res.status(204).send();
	});

	app.get('/guilds', (req, res) => {
		let guilds = [];
		client.guilds.cache.map(g => guilds.push({ name: g.name, id: g.id, icon: g.iconURL({ extension:'webp' }) }));
		res.status(200).send(guilds);
	});

	app.get('/', (req, res) => {
		res.sendFile('index.html', { root: join(__dirname, '/') });
	});

	app.listen(80, () => {
		console.log('Listening at port 80');
	});
};