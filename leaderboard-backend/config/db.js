const mongoose = require('mongoose');
const seedUsers = require('../utils/seedUsers');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected");

        await seedUsers(); 
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;
