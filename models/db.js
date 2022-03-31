const { MongoClient, ExplainVerbosity } = require("mongodb");
// Connection URI
const uri = process.env.MONGO_URL;
// Create a new MongoClient
const client = new MongoClient(uri);

async function connect() {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      console.log("Connected successfully to server");
}

exports.connect = connect;

exports.db = () => {
    return client.db();
}
