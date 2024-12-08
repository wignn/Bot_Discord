const { gpt3, gemini,kana, bochi, silvia } = require("../../lib/action.js");

module.exports = (client) => {
  client.on("messageCreate", async (arg) => {
    if (arg.author.bot) return;

    const content = arg.content;
    switch (true) {
      case content === "ping":
        await arg.reply("Pong!");
        break;
      case content.startsWith("?gpt"):
        const gptPrompt = content.slice(5).trim();
        try {
          const response = await gpt3(gptPrompt);
          if (!response) {
            await arg.reply("Failed to get response from GPT3");
            return;
          }
          for (let i = 0; i < response.length; i += 2000) {
            await arg.reply(response.slice(i, i + 2000));
          }
        } catch (error) {
          console.error("Error getting response from GPT3:", error);
          await arg.reply("An error occurred while getting the response from GPT3");
        }
        break;

        case content.startsWith("?gemini"):
          const geminiPrompt = content.slice(7).trim();
          try {
            const response = await gemini(geminiPrompt);
            if (!response) {
              await arg.reply("Failed to get response from gemini");
              return;
            }
            for (let i = 0; i < response.length; i += 2000) {
              await arg.reply(response.slice(i, i + 2000));
            }
          } catch (error) {
            console.error("Error getting response from gemini:", error);
            await arg.reply("An error occurred while getting the response from gemini");
          }
          break;

        case content.startsWith("?kana"):
          const kanaPrompt = content.slice(7).trim();
          try {
            const response = await kana(kanaPrompt);
            if (!response) {
              await arg.reply("Failed to get response from kana");
              return;
            }
            for (let i = 0; i < response.length; i += 2000) {
              await arg.reply(response.slice(i, i + 2000));
            }
          } catch (error) {
            console.error("Error getting response from kana:", error);
            await arg.reply("An error occurred while getting the response from kana");
          }
          break;

        case content.startsWith("?bochi"):
          const bochiPrompt = content.slice(7).trim();
          try {
            const response = await bochi(bochiPrompt);
            if (!response) {
              await arg.reply("Failed to get response from bochi");
              return;
            }
            for (let i = 0; i < response.length; i += 2000) {
              await arg.reply(response.slice(i, i + 2000));
            }
          } catch (error) {
            console.error("Error getting response from bochi:", error);
            await arg.reply("An error occurred while getting the response from bochi");
          }
          break;

          case content.startsWith("?silvia"):
            const silviaPrompt = content.slice(8).trim();
            try {
              const response = await silvia(silviaPrompt);
              if (!response) {
                await arg.reply("Failed to get response from silvia");
                return;
              }
              for (let i = 0; i < response.length; i += 2000) {
                await arg.reply(response.slice(i, i + 2000));
              }
            } catch (error) {
              console.error("Error getting response from silvia:", error);
              await arg.reply("An error occurred while getting the response from silvia");
            }
            break;
      default:
        break;
    }
  });
};
