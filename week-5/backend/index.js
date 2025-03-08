// start writing from here
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { todoRouter } = require('./routes/todo');
const app = express();

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log("Error message: " + error);
    }
})();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/todo', todoRouter);


app.listen(process.env.PORT, () => {
    console.log("Running on port: " + process.env.PORT);
});