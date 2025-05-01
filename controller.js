
const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB connection details
const uri = process.env.MONGODB_URI;
const databaseName = process.env.DATABASE_NAME;
const collectionName = process.env.COLLECTION_NAME;
const hourlyCollectionName = process.env.HOURLY_COLLECTION_NAME;

// Function to create MongoDB client
async function createMongoClient() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB Atlas");
  return client;
}

let handleDNISData = async (req, res) => {
  let client;

  try {
    client = await createMongoClient();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) await client.close();
  }
};

// fetch hourly data for a specific DNIS

let handleHourlyData = async (req, res) => {
  const { dnis } = req.params;
  let client;

  try {
    console.log("Received request for hourly data:", dnis); // Debug log

    client = await createMongoClient();
    const database = client.db(databaseName);
    const collection = database.collection(hourlyCollectionName);

    // Debug: Log available documents for inspection
    const allDocuments = await collection.find({}).toArray();
    console.log("All documents in collection:", allDocuments);

    // Perform the query
    const data = await collection.find({ dnis: dnis }).toArray();

    if (data.length === 0) {
      res
        .status(404)
        .json({ message: `No hourly data found for DNIS: ${dnis}` });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching hourly data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    if (client) await client.close();
  }
};

module.exports = { handleDNISData, handleHourlyData };
