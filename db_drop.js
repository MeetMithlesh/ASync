// dropCollection.js
const mongoose = require('mongoose');
require('dotenv').config(); // If you're using .env for MongoDB URI

const mongoURI = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"; // Replace with your DB name

const dropCollection = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    const collectionName = 'labs'; // Replace with your collection name

    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`✅ Collection '${collectionName}' dropped successfully.`);
    } else {
      console.log(`⚠️ Collection '${collectionName}' does not exist.`);
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error dropping collection:', err.message);
  }
};

dropCollection();
