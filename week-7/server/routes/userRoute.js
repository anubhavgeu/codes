const express = require('express');
const { User, Course } = require('../database');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userAuthMiddleware } = require('../middlewares/authMiddleware');

userRouter.post('/signup', async(req, res) => {
    const {username,password} = req.body;
    try {   
        const response = await User.findOne({username,password});
        if (response) {
            return res.status(404).json({
                message: "User already exists"
            });
        }
        await User.create({username, password});
        return res.status(202).json({
            message :"User successfully created"
        });
    } catch (error) {
        return res.status(505).json({
            message :"Server error"
        })
    }
});

userRouter.post('/signin', async(req, res) => {
    const {username,password} = req.body;
    try {
        const response = await User.findOne({username,password});
        if (!response) {
            return res.status(404).json({
                message : "Either User doesn't exists or password is wrong"
            });
        }
        const token = jwt.sign({username}, process.env.JWT_SECRET_USER, {expiresIn: '1h'});
        return res.status(202).json({
            message: "User successfully signed in",
            token
        });
    } catch (error) {
        return res.status(505).json({
            message :"Server error"
        });
    }
});

userRouter.get('/courses', async(req, res) => {
    try {
        const courses = await Course.find({});
        return res.status(202).json({
            courses
        });
    } catch (error) {
        return res.status(505).json({
            message :"Server error"
        })
    }
});

userRouter.use(userAuthMiddleware);

userRouter.post('/courses/:courseId', async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.user;
    console.log(req.user);
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course doesn't exist"
            });
        }
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            });
        }
         if (!user.courses.includes(courseId)) {
            user.courses.push(courseId);
            await user.save(); 
        }
        console.log(user);
        return res.status(202).json({message:"Course created successfully"});
    } catch (error) {
        return res.status(505).json({
            message :"Server error"
        })
    }
});

userRouter.get('/purchasedCourses', async(req, res) => {
    const username = req.user;
    try {
        const user = await User.findOne({username}).populate('courses');
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            });
        }
        const courses = user.courses;
        return res.status(200).json({
            message: "Fetched all the courses",
            courses
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message :"Server error"
        });
    }
});

module.exports = {
    userRouter
}