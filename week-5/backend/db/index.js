//  start writing from here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const todoSchema = new Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    completed: {
        type: Boolean
    },
    userId: {
        type: ObjectId
    }
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    User,
    Todo
}