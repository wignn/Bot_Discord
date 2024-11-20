const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'automod',
  description: 'Manage the auto mod',
  options: [
    {
      name: 'enable',
      description: 'Enable a certain auto mod rule.',
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: 'flagged-words',
          description: 'Block profanity, sexual content',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'channel',
              description: 'The channel to send alerts',
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              required: true,
            },
          ],
        },
        {
          name: 'spam',
          description: 'Block any spam messages suspected of spam',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'channel',
              description: 'The channel to send alerts',
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              required: true,
            },
          ],
        },
        {
          name: 'mention-spam',
          description: 'Block any mention-spam messages suspected of spam',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'channel',
              description: 'The channel to send alerts',
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              required: true,
            },
            {
              name: 'limit',
              description: 'Limit mention user',
              type: ApplicationCommandOptionType.Integer,
              required: true,
            },
            {
              name: 'timeout',
              description: 'Give the user a timeout when the rule is triggered',
              type: ApplicationCommandOptionType.Boolean,
              required: true,
            },
            {
              name: 'time',
              description: 'The time user for.',
              type: ApplicationCommandOptionType.String,
              choices: [
                { name: '60 Seconds', value: '60s' },
                { name: '5 Minutes', value: '5m' },
                { name: '10 Minutes', value: '10m' },
                { name: '1 Hour', value: '1h' },
                { name: '1 day', value: '1d' },
                { name: '1 week', value: '1w' },
              ],
            },
          ],
        },
        {
          name: 'keywords',
          description: 'Block any message containing certain keywords',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'channel',
              description: 'The channel to send alerts',
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText],
              required: true,
            },
            {
              name: 'keyword',
              description: 'The keywords to block',
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'disable',
      description: 'Disable automod rules',
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: 'all',
          description: 'Disable all auto rules',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    },
  ],

  userPermission: [PermissionFlagsBits.ManageGuild],
  botPermission: [PermissionFlagsBits.ManageGuild],

  callback: async (client, interaction) => {
    const { options, guild } = interaction;
    const subgrp = options.getSubcommandGroup();
    const sub = options.getSubcommand();
    let channel, rule;

    const eEmbed = new EmbedBuilder()
      .setTitle('Automod')
      .setDescription('☑️ Successfully enabled the auto mod system')
      .setColor('Green')
      .setTimestamp();

    const dEmbed = new EmbedBuilder()
      .setTitle('Automod')
      .setDescription('❌ Successfully disabled the auto mod system')
      .setColor('Red')
      .setTimestamp();

    switch (subgrp) {
      case 'enable':
        switch (sub) {
          case 'flagged-words':
            await interaction.reply({ content: '<a:1107120114932924519> | Loading...' });

            channel = options.getChannel('channel');
            rule = await guild.autoModerationRules.create({
              name: 'Block profanity, sexual content, and slurs. (TNS)',
              creatorId: client.user.id,
              enabled: true,
              eventType: 1,
              triggerType: 4,
              triggerMetadata: { presets: [1, 2, 3] },
              actions: [
                { type: 1, metadata: { customMessage: `This message was prevented by ${client.user.username}'s auto mod system.` } },
                { type: 2, metadata: { channel } },
              ],
            }).catch(async (err) => {
              await interaction.reply({ content: 'You cannot have more than 1 of this rule.' });
            });

            if (!rule) return;

            await interaction.editReply({ content: '', embeds: [eEmbed] });
            break;

          case 'keywords':
            await interaction.reply({ content: '<a:1107120114932924519> | Loading...' });
            const word = options.getString('keyword');
            channel = options.getChannel('channel');
            rule = await guild.autoModerationRules.create({
              name: `Prevents ${word} from being used. (TNS)`,
              creatorId: client.user.id,
              enabled: true,
              eventType: 1,
              triggerType: 1,
              triggerMetadata: { keywordFilter: [`${word}`] },
              actions: [
                { type: 1, metadata: { customMessage: `This message was prevented by ${client.user.username}'s auto mod system.` } },
                { type: 2, metadata: { channel } },
              ],
            }).catch(async (err) => {
              await interaction.reply({ content: 'You cannot have more than 1 of this rule.' });
            });

            if (!rule) return;

            eEmbed.addFields({ name: 'Blocked word', value: `${word}` });
            await interaction.editReply({ content: '', embeds: [eEmbed] });
            break;

          case 'spam':
            await interaction.reply({ content: '<a:1107120114932924519> | Loading...' });
            channel = options.getChannel('channel');

            rule = await guild.autoModerationRules.create({
              name: 'Prevent spam messages. (TNS)',
              creatorId: client.user.id,
              enabled: true,
              eventType: 1,
              triggerType: 3,
              actions: [
                { type: 1, metadata: { customMessage: `This message was prevented by ${client.user.username}'s auto mod system.` } },
                { type: 2, metadata: { channel } },
              ],
            }).catch(async (err) => {
              await interaction.reply({ content: 'You cannot have more than 1 of this rule.' });
            });

            if (!rule) return;

            await interaction.editReply({ content: '', embeds: [eEmbed] });
            break;

          case 'mention-spam':
            await interaction.reply({ content: '<a:1107120114932924519> | Loading...' });
            const limit = options.getInteger('limit');
            const timeout = options.getBoolean('timeout');
            channel = options.getChannel('channel');
            let time = options.getString('time');

            if (!time) time = '5m';

            let timeSeconds = ms(time) / 1000;

            if (timeout) {
              rule = await guild.autoModerationRules.create({
                name: 'Prevent mention spam. (TNS)',
                creatorId: client.user.id,
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata: { mentionTotalLimit: limit },
                actions: [
                  { type: 1, metadata: { customMessage: `This message was prevented by ${client.user.username}'s auto mod system.` } },
                  { type: 2, metadata: { channel } },
                  { type: 3, metadata: { durationSeconds: timeSeconds } },
                ],
              }).catch(async (err) => {
                await interaction.reply({ content: 'You cannot have more than 1 of this rule.' });
              });

              if (!rule) return;

              eEmbed.addFields({ name: 'Timeout', value: 'Enabled' });
              await interaction.editReply({ content: '', embeds: [eEmbed] });
            } else {
              rule = await guild.autoModerationRules.create({
                name: 'Prevent mention spam. (TNS)',
                creatorId: client.user.id,
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata: { mentionTotalLimit: limit },
                actions: [
                  { type: 1, metadata: { customMessage: `This message was prevented by ${client.user.username}'s auto mod system.` } },
                  { type: 2, metadata: { channel } },
                ],
              }).catch(async (err) => {
                await interaction.reply({ content: 'You cannot have more than 1 of this rule.' });
              });

              if (!rule) return;

              eEmbed.addFields({ name: 'Timeout', value: 'Disabled' });
              await interaction.editReply({ content: '', embeds: [eEmbed] });
            }
            break;
        }
        break;

      case 'disable':
        switch (sub) {
          case 'all':
            await interaction.reply({ content: '<a:1107120114932924519> | Loading...' });

            const rules = await guild.autoModerationRules.fetch();

            if (rules.size < 1)
              return interaction.reply({ content: 'There are no rules to be deleted.' });

            for (const rule of rules) {
              await rule[1].delete();
            }

            await interaction.editReply({ content: '', embeds: [dEmbed] });
            break;
        }
        break;
    }
  },
};
