import mongoose from 'mongoose';

// Logic for connecting to MongoDB database using Mongoose ODM (Object Data Modeling)

// Asynchronous function to establish connection with MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB URI specified in environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Log the successful connection host
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log any connection errors that occur
        console.error(`❌ Error: ${error.message}`);
        // Terminate the process if the database connection fails (crucial for core app functionality)
        process.exit(1);
    }
};

// Export the function to be used in server.js
export default connectDB;