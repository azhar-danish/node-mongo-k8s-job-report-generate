const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME || "movies";
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();

    console.log("Connected to MongoDB");

    return client.db(dbName);
}

module.exports = connectDB;