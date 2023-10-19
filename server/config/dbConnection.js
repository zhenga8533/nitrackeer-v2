const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        await mongoose.connect(process.env.DATABASE_URI, connectionParams);
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;
