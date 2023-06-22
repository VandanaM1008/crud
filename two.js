const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://vandanam:vandana10m@cluster0.dzpk0vm.mongodb.net/?retryWrites=true&w=majority';

// Database and collection names
const dbName = 'your_database_name';
const collectionName = 'route';

// Connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // CRUD operations
    // Create a route document
    const route = {
      legs: [
        { city1: 'City A', city2: 'City B', cost: 100 },
        { city1: 'City B', city2: 'City C', cost: 150 },
        { city1: 'City C', city2: 'City D', cost: 200 }
      ]
    };
    const insertResult = await collection.insertOne(route);
    console.log('Inserted document:', insertResult.insertedId);

    // Read the route document
    const findResult = await collection.findOne({});
    console.log('Route document:', findResult);

    // Update the cost of a leg
    const legToUpdate = findResult.legs[0];
    legToUpdate.cost = 120;
    const updateResult = await collection.updateOne({ _id: findResult._id }, { $set: { 'legs.0': legToUpdate } });
    console.log('Updated document:', updateResult.modifiedCount);

    // Delete the route document
    const deleteResult = await collection.deleteOne({ _id: findResult._id });
    console.log('Deleted document:', deleteResult.deletedCount);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Call the function to perform CRUD operations
connectToMongoDB();
