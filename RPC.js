require("dotenv/config");


const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });
const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../../config.json"))
  );

  const clientId = client.user.id;

  DiscordRPC.register(clientId);

  const setActivity = async () => {
    if (!RPC) return;
    const {
      details,
      state,
      largeImageKey,
      largeImageText,
      smallImageKey,
      smallImageText,
      buttons,
      startTimestamp,
      partyMax,
      partySize,
      partyId,
      instance,
    } = config.activity;

    RPC.setActivity({
      details,
      state,
      largeImageKey,
      largeImageText,
      startTimestamp,
      smallImageKey,
      smallImageText,
      partyMax,
      partySize,
      partyId,
      instance,
      buttons,
    });
  };

  RPC.on("ready", () => {
    setActivity();
    setInterval(() => {
      setActivity();
    }, 15 * 1000);
  });

  RPC.login({ clientId })
    .then(() => console.log("Logged in successfully"))
    .catch((err) => {
      console.error("Login error:", err);
    });

  RPC.on("error", (err) => {
    console.error("RPC error:", err);
  });

  console.log(clientId);
};
