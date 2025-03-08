const express = require('express');
const dotenv = require("dotenv");
const { connectDB } = require('./database');
const { adminRouter } = require('./routes/adminRoute');
const { userRouter } = require('./routes/userRoute');
dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT;

connectDB();

app.use('/admin',adminRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});