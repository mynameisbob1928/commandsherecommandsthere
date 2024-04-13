const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('It\'s a ping bro')
		.setDMPermission(true),
	/**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     * @param {import('discord.js').Client} client
     */
	async execute(interaction, client) {
		const reply = await interaction.reply('pinging...');
		try {
			// Uptime
			const uptime = process.uptime();
			const uptimeString = formatUptime(uptime);

			await interaction.editReply({
				content: '',
				embeds: [new EmbedBuilder()
					.setTitle('Bot Info')
					.setDescription('API - Ping - Uptime')
					.setColor('DarkBlue')
					.setTimestamp(Date.now())
					.setFooter({
						iconURL: interaction.user.displayAvatarURL(),
						text: interaction.user.tag,
					})
					.addFields([
						{
							name: '• API Latency',
							value: `> \`🟢 ${client.ws.ping}ms\``,
							inline: true,
						},
						{
							name: '• Ping',
							value: `> \`🟠 ${reply.createdTimestamp - interaction.createdTimestamp} ms\``,
							inline: true,
						},
						{
							name: '• Uptime',
							value: `> \`🟢 ${uptimeString}\``,
							inline: false,
						},
					])],
			});
		}
		catch (err) {
			console.error(err);
			interaction.editReply({ content: 'There was an error while executing this command.' });
		}
	},
};

// Uptime Function
function formatUptime(uptime) {
	const seconds = Math.floor(uptime % 60);
	const minutes = Math.floor((uptime / 60) % 60);
	const hours = Math.floor((uptime / (60 * 60)) % 24);
	const days = Math.floor(uptime / (60 * 60 * 24));

	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}