const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
    try {
        console.log('Bot is ready. Deleting commands...');
        
        // Ambil daftar command yang terdaftar
        const commands = await rest.get(Routes.applicationCommands(client.user.id));

        // Hapus setiap command
        for (const command of commands) {
            await rest.delete(Routes.applicationCommand(client.user.id, command.id));
            console.log(`Deleted command: ${command.name}`);
        }

        console.log('All commands have been deleted.');
    } catch (error) {
        console.error('Error deleting commands:', error);
    }
});

client.login(process.env.TOKEN);
