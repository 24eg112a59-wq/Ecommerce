const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  if (
    mongoUri === 'your_mongodb_atlas_connection_string' ||
    mongoUri.includes('USERNAME:PASSWORD@CLUSTER.mongodb.net') ||
    (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://'))
  ) {
    throw new Error(
      'MONGO_URI must be a real MongoDB connection string. Replace USERNAME, PASSWORD, and CLUSTER with your Atlas values.'
    );
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
