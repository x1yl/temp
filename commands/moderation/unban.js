const { SlashCommandBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Select a member and unban them.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The member to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for unbanning the member")
    ),
  category: "moderation",
  async execute(interaction) {
    const member = interaction.options.getString("user");
    const reason = interaction.options.getString("reason");

    // Check if the member has the necessary permissions to kick
    if (
      interaction.member.permissions.has(
        PermissionsBitField.Flags.BanMembers
      ) == false
    ) {
      return interaction.reply({
        content: "You don't have permission to unban members.",
        ephemeral: true,
      });
    }

    // Attempt to kick the member
    try {
        await interaction.guild.bans.remove(member, reason)
      return interaction.reply({
        content: `Unbanned ${member.user.tag} successfully for the reason: ${reason}.`,
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
