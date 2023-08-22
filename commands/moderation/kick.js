const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	category: 'moderation',
	async execute(interaction) {
		const member = interaction.options.getMember('target');
	
		// Check if the member has the necessary permissions to kick
		if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers) == false) {
		  return interaction.reply({ content: "You don't have permission to kick members.", ephemeral: true });
		}
	
		// Attempt to kick the member
		try {
		  await member.kick();
		  return interaction.reply({ content: `Kicked ${member.user.tag} successfully.`, ephemeral: true });
		} catch (error) {
		  console.error(error);
		  return interaction.reply({ content: 'An error occurred while trying to kick the member. Make sure they do not have a higher role.', ephemeral: true });
		}
	  },
};