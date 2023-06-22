const express = require('express');
const mongoose = require('mongoose');

// Define the Leg Schema
const legSchema = new mongoose.Schema({
  city1: String,
  city2: String,
  cost: Number
});

// Define the Route Schema
const routeSchema = new mongoose.Schema({
  legs: [legSchema]
});

// Define the Route model
const Route = mongoose.model('Route', routeSchema);

// Create an Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
  try {
    const uri = 'mongodb+srv://vandanam:vandana10m@cluster0.dzpk0vm.mongodb.net/?retryWrites=true&w=majority/trip_db'; // Replace with your MongoDB connection URI
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Create a new route
app.post('/routes', async (req, res) => {
  try {
    const routeData = req.body;
    const route = new Route(routeData);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).json({ error: 'Failed to create route' });
  }
});

// Calculate the total cost of a trip
app.get('/routes/:id/totalCost', async (req, res) => {
  try {
    const routeId = req.params.id;
    const route = await Route.findById(routeId);

    let totalCost = 0;
    for (const leg of route.legs) {
      totalCost += leg.cost;
    }

    res.json({ totalCost });
  } catch (error) {
    console.error('Error calculating total cost:', error);
    res.status(500).json({ error: 'Failed to calculate total cost' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectToDatabase();
});