// db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Properly encoded connection string
const username = encodeURIComponent("mindwell");
const password = encodeURIComponent("QnQh3xdQWTcz2POm");
const uri = `mongodb+srv://${username}:${password}@mindwell.7b4fdp5.mongodb.net/?retryWrites=true&w=majority&appName=mindwell`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("Connection URI:", uri.replace(/:([^@]+)@/, ':*****@')); // Mask password
    
    await client.connect();
    console.log("MongoDB client connected");
    
    db = client.db("mindwell");
    console.log("Using database:", db.databaseName);
    
    // Test connection with a ping
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error("- Error name:", error.name);
    console.error("- Error code:", error.code);
    console.error("- Error message:", error.message);
    console.error("- Full error:", error);
    throw error; // Re-throw to prevent server from starting
  }
}

function getDB() {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };