const { joinVoiceChannel } = require('@discordjs/voice'); 
const { ChannelType } = require('discord.js');

module.exports = {
  delete: false,
  devOnly:true,
  name: 'join',
  description: 'Join a voice channel.',
  type: 1, 
  options: [
    {
      name: 'channel',
      description: 'The voice channel to join',
      type: 7, 
      required: true,
      channel_types: [ChannelType.GuildVoice], 
    },
  ],

  async callback(client, interaction) {
    const channelOption = interaction.options.getChannel('channel');
    console.log(channelOption.id);
    console.log(channelOption.guild.id);
    console.log(channelOption.guild);

    if (!channelOption || channelOption.type !== ChannelType.GuildVoice) {
      return interaction.reply({
        content: 'Please select a valid voice channel!',
        ephemeral: true,
      });
    }

    try {
      joinVoiceChannel({
        channelId: channelOption.id,
        guildId: channelOption.guild.id,
        adapterCreator: channelOption.guild.voiceAdapterCreator, 
      });

      await interaction.reply({
        content:`Joined voice channel: ${channelOption.name}!`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error joining voice channel:', error);
      await interaction.reply({
        content: `Failed to join the voice channel: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};
