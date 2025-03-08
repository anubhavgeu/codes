const express = require('express');
const { userSchema } = require('../zodSchema/userSchema');
const { User, Course } = require('../database');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');
const { authMiddleware } = require('../middlewares/authMiddleware');
const userRouter = express.Router();

userRouter.post('/signup', async(req, res) => {
    const parsedResult = userSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(404).json({
            message: "Enter data in correct format"
        })
    }
    const {username, password} = req.body;
    const response = await User.findOne({username});
    if (response) {
        return res.status(404).json({
            message: "User already exists"
        })
    }
    const hashedPassword = bcrpyt.hashSync(password,10);
    await User.create({
        username: username,
        password: hashedPassword
    });
    return res.status(202).json({
        message: "Admin created Successfully"
    })
});

userRouter.post('/signin', async(req, res) => {
    const parsedResult = userSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(404).json({
            message: "Enter data in correct format"
        })
    }

    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(404).json({
            message: "User doesn't exists"
        })
    }
    const result = bcrpyt.compareSync(password, user.password);
    if (!result) {
        return res.status(404).json({
            message: "Password doesn't match"
        });
    }
    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.status(202).json({
        message: "User successfully logged in",
        token
    })
});

userRouter.get('/courses', async(req, res) => {
    const course = await Course.find({});
    return res.status(202).json({
        message: "Fetched all the courses",
        course
    });
});

userRouter.post('/courses/:courseId',authMiddleware, async(req, res) => {
    try {
        const username = req.username.username; 
        const { courseId } = (req.params);

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course doesn't exist" });
        }

        await User.updateOne(
            { username: username },
            { $addToSet: { purchasedCourses: courseId } } 
        );


        return res.status(202).json({
            message: "Added the course successfully",
            user: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.get('/purchasedCourses', authMiddleware, async(req, res) => {
    const username = req.username.username;
    const user = await User.findOne({username: username});
    return res.status(202).json({
        message: "Retrieved all the courses",
        purchasedCourses: user.purchasedCourses
    })
});

module.exports = {
    userRouter
}