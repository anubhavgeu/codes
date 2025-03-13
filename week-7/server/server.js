const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { connectDB, Course } = require('./database');
const { adminRouter } = require('./routes/adminRoute');
const { userRouter } = require('./routes/userRoute');
dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
const port = process.env.PORT;

connectDB();

app.use('/admin',adminRouter);
app.use('/users', userRouter);
app.get('/courses',async(req, res) => {
    const courses = await Course.find({});
    return res.status(202).json({
        courses
    });
})

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});