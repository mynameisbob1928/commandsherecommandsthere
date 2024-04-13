module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Interaction} interaction
	 */
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		try { await command.execute(interaction, client); }
		catch (error) {
			console.error(error);
			interaction.channel.send({ content: 'There was an error executing this command.' }).catch(() => { /* empty :3 */ });
		}
	},
};