const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Successfully connected to db");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const userSchema = new mongoose.Schema({
    
});

const adminSchema = new mongoose.Schema({
    
});

const courseSchema = new mongoose.Schema({
    
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    User,
    Admin,
    Course,
    connectDB
}