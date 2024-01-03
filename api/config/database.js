const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error: ", error);
});
