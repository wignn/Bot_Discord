const { SlashCommandBuilder, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    deleted: false,
    name: "purge",
    description: "Hapus sejumlah pesan dari pengguna",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "Pengguna yang pesannya akan dihapus",
            required: true,
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: "amount",
            description: "Jumlah pesan yang akan dihapus (maksimal 100)",
            required: true,
            minValue: 1,
            maxValue: 100,
        },
    ],

    async callback(client, interaction) {
        const user = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("amount");

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply("Bot tidak memiliki izin untuk mengelola pesan.", { ephemeral: true });
        }

        try {

            const messages = await interaction.channel.messages.fetch({ limit: 100 });
            

            const userMessages = messages.filter((msg) => msg.author.id === user.id);
            
    
            const messagesToDelete = userMessages.first(amount);

            if (messagesToDelete.size === 0) {
                return interaction.reply("Tidak ada pesan yang ditemukan untuk dihapus.", { ephemeral: true });
            }

            await interaction.channel.bulkDelete(messagesToDelete);

            const embed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("Pesan Dihapus")
                .setDescription(`${messagesToDelete.length} pesan dari ${user.tag} telah dihapus.`)
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], fetchReply: true });

            // Delete the reply after 5 seconds
            setTimeout(() => {
                reply.delete().catch(console.error);
            }, 5000); // Embed akan hilang setelah 5 detik

        } catch (error) {
            console.error("Gagal menghapus pesan:", error);
            return interaction.reply("Gagal menghapus pesan.", { ephemeral: true });
        }
    },
};

process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});
