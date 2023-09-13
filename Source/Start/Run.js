const {connect} = require("mongoose");

const configuration = require("../../Configuration/Index");

async function Run (server) {
  await connect(configuration.db_url);

  console.log("Connect to DB...");

  server.listen(configuration.port, () => {
    console.log(`Server listening on port: ${configuration.port}`);
  });
};

module.exports = Run;
