const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports =  (client) => {
  const interactionFolders = getAllFiles(
    path.join(__dirname, "..", "interactions"),
    true
  );

  for (const interactionFolder of interactionFolders) {
    const interactionFiles = getAllFiles(interactionFolder);
    interactionFiles.sort((a, b) => a > b);

    const interactionName = interactionFolder
      .replace(/\\/g, "/")
      .split("/")
      .pop();

    for (const interactionFile of interactionFiles) {
      const interactionFunction = require(interactionFile);
       interactionFunction(client);
    }
  }
};
