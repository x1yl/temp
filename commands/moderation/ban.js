const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for banning the member")
    ),
  category: "moderation",
  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");

    // Check if the member has the necessary permissions to kick
    if (
      interaction.member.permissions.has(
        PermissionsBitField.Flags.BanMembers
      ) == false
    ) {
      return interaction.reply({
        content: "You don't have permission to ban members.",
        ephemeral: true,
      });
    }

    // Attempt to kick the member
    try {
      await member.ban({ reason: reason });
      return interaction.reply({
        content: `Banned ${member.user.tag} successfully for the reason: ${reason}.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content:
          "An error occurred while trying to ban the member. Make sure they do not have a higher role.",
        ephemeral: true,
      });
    }
  },
};
