module.exports = (client) => {
  client.on("messageCreate", (arg) => {
    if (arg.author.bot) return;
    if (arg.content === "!ping") {
      arg.channel.send("Pong!");
  }});
};
