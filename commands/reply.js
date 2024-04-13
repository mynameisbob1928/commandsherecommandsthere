const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reply')
		.setDescription('Reply to someone else\'s message through the bot')
		.addStringOption(option => option.setName('content').setDescription('The content to reply to the message with').setRequired(true).setMaxLength(1000).setMinLength(5))
		.addStringOption(option => option.setName('messageid').setDescription('The id of the message to reply to.').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel of the message, default is this channel').setRequired(false))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
		.setDMPermission(false),
	/**
     *
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     * @param {import('discord.js').Client} client
     */
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel') ?? interaction.channel;
		if (!channel.isTextBased()) return interaction.reply({ content: 'This is not a valid channel', ephemeral: true });
		await interaction.deferReply({ ephemeral: true });
		const message = await channel.messages.fetch(interaction.options.getString('messageid'));
		if (!message) return interaction.editReply({ content: 'This message was not found, please make sure that this is a message id and not a message link and also that the channel is correct' });
		await message.reply({ embeds: [new EmbedBuilder().setDescription(interaction.options.getString('content')).setFooter({ text: 'Mod note' })] }).catch(err => interaction.editReply({ content: `There was an error replying to this message: ${err}` }));
		interaction.editReply({ content: 'Message replied to.' });
	},
};