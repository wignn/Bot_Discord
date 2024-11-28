const { ActivityType, PresenceUpdateStatus } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity("Playing Discord.js", { type: ActivityType.Custom });
  client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
};
