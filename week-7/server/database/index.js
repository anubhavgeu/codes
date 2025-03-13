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
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
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