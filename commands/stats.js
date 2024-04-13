const { EmbedBuilder, SlashCommandBuilder, version } = require('discord.js');
const os = require('node:os');
const osu = require('node-os-utils');
require('loadavg-windows');
const cpuStat = require('cpu-stat');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Get information about the bot')
		.setDMPermission(true),
	/**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     * @param {import('discord.js').Client} client
     */
	async execute(interaction, client) {
		const msg = await interaction.reply({ embeds: [new EmbedBuilder().setTitle('🏓 | Fetching statistics...').setColor('Red')] });

		const meminfo = await osu.mem.info();
		const usedPercent = meminfo.usedMemPercentage;
		const freePercent = meminfo.freeMemPercentage;
		const usedMem = os.totalmem() - os.freemem();

		const cpu = os.cpus()[0];

		try {
			const statsEmbed = new EmbedBuilder()
				.setTitle(`${client.user.username}'s Statistics`)
				.setColor('Random')
				.setDescription(`\`\`\`yml\nName: ${client.user.username}#${client.user.discriminator} [${client.user.id}]\nAPI ping: ${client.ws.ping}ms\nPing: ${Math.floor(msg.createdAt - interaction.createdAt)}ms\nUptime: ${formatUptime(client.uptime)}\`\`\``)
				.addFields([
					{
						name: ':bar_chart: General Statistics',
						value: `\`\`\`yml\nGuilds: ${client.guilds.cache.size}\nUsers: ${client.guilds.cache.map((e) => e.memberCount).reduce((a, b) => a + b, 0).toLocaleString()}\nDiscordJS: v${version}\nNodeJS: ${process.version}\`\`\``,
						inline: false,
					},
					{
						name: ':gear: System Statistics',
						value: `\`\`\`yml\nOS: ${os.type().replace('Windows_NT', 'Windows').replace('Darwin', 'macOS')}\nOS Version: ${os.platform() + ' ' + os.release()}\nUptime: ${formatUptime(os.uptime())}\nArchitecture: ${os.arch()}\`\`\``,
						inline: false,
					},
					{
						name: '<:cpu:1228398271966220358> CPU Statistics',
						value: `\`\`\`yml\nModel: ${cpu?.model}\nSpeed: ${cpuStat.avgClockMHz().toFixed(0)} MHz\nCores: ${osu.cpu.count()}\nUsage: ${calculateCpuUsage()}% / 50%\`\`\``,
						inline: false,
					},
					{
						name: '<:ram:1228400262864179282> RAM Statistics',
						value: `\`\`\`yml\nTotal Memory: ${formatBytes(os.totalmem())}\nFree Memory: ${formatBytes(os.freemem())} (${freePercent}%)\nUsed Memory: ${formatBytes(usedMem)} (${usedPercent.toFixed(1)}%)\nCached Memory: ${calculateCachedMemoryGB()} GB\`\`\``,
						inline: true,
					},
					{

						name: 'Miscellaneous Statistics',
						value: `\`\`\`yml\nSlashCommands: ${client.commands.size}\nChannels: ${client.channels.cache.size.toLocaleString()}\nEmojis: ${client.emojis.cache.size.toLocaleString()}\`\`\``,
						inline: true,

					},
				])
				.setFooter({ text: 'Build: v5.8.0' });
			await interaction.editReply({ embeds: [statsEmbed] });
		}
		catch (error) {
			console.log(error);
		}


	},
};


function calculateCachedMemoryGB() {
	const totalMemoryGB = os.totalmem() / (1024 * 1024 * 1024); // Total system memory in GB
	const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024); // Free system memory in GB
	const usedMemoryGB = totalMemoryGB - freeMemoryGB; // Used system memory in GB

	// Calculate cached memory as the difference between used memory and actual application memory
	const cachedMemoryGB = usedMemoryGB - (process.memoryUsage().heapUsed / (1024 * 1024 * 1024));

	return cachedMemoryGB.toFixed(0);
}

// Function to calculate adjusted CPU usage percentage based on 0.5 vCores (50% limit)
function calculateCpuUsage() {
	const cpus = os.cpus();
	const adjustedTotalCores = cpus.length / 2;

	// Calculate total usage across all CPU cores
	const totalUsage = cpus.reduce((acc, core) => acc + core.times.user + core.times.nice + core.times.sys + core.times.idle, 0);

	// Calculate CPU usage percentage based on adjusted total cores
	const cpuPercentage = ((1 - cpus[0].times.idle / totalUsage) * adjustedTotalCores) / 10;

	return cpuPercentage.toFixed(2);
}

function formatUptime(uptime) {
	const seconds = Math.floor(uptime % 60);
	const minutes = Math.floor((uptime / 60) % 60);
	const hours = Math.floor((uptime / (60 * 60)) % 24);
	const days = Math.floor(uptime / (60 * 60 * 24));

	return `d ${days}・h ${hours}・m ${minutes}・s ${seconds}`;
}

function formatBytes(bytes) {
	let size;
	if (bytes < 1000) size = `${bytes} B`;
	else if (bytes < 1000000) size = `${(bytes / 1000).toFixed(2)} KB`;
	else if (bytes < 1000000000) size = `${(bytes / 1000000).toFixed(2)} MB`;
	else if (bytes < 1000000000000) size = `${(bytes / 1000000000).toFixed(2)} GB`;
	else if (bytes < 1000000000000000) size = `${(bytes / 1000000000000).toFixed(2)} TB`;
	return size;
}