const express = require('express');
const adminRouter = express.Router();
const { Admin, Course } = require('../database');
const jwt = require('jsonwebtoken');
const { adminAuthMiddleware } = require('../middlewares/authMiddleware');

adminRouter.post('/signup', async(req, res) => {
    const {username,password} = req.body;
    try {
        const response = await Admin.findOne({username});
        if (response) {
            return res.status(404).json({
                message:"Admin already exists"
            });
        }
        await Admin.create({
            username,
            password
        });
        return res.status(202).json({
            message: "Admin created"
        })
    } catch (error) {
        return res.status(505).json({
            message: error.message
        });
    }
});

adminRouter.post('/signin', async(req, res) => {
    const {username, password} = req.body;
    try {
        const response = await Admin.findOne({username, password});
        if (!response) {
            return res.status(404).json({
                message: "Admin doesn't exists"
            });
        }
        const token = jwt.sign({username}, process.env.JWT_SECRET_ADMIN, {expiresIn: '1h'});
        return res.status(202).json({
            message: "Signed in successfully",
            token: token
        });

    } catch (error) {
        return res.status(505).json({
            message: error.message
        });
    }
});



adminRouter.use(adminAuthMiddleware);

adminRouter.post('/courses', async(req, res) => {
    const {title, description, price, imageLink, published} = req.body;
    try {
        const response = await Course.create({title, description, price, imageLink,published});
        console.log(response);
        return res.status(202).json({
            message: "Course created successfully",
            id: response._id
        });
    } catch (error) {   
        console.log(error.message)
        return res.status(505).json({
            message: "server problem"
        });
    }
});

adminRouter.put('/courses/:courseId', async(req, res) => {
    const courseId = req.params.courseId;
    console.log(typeof courseId)
    const {title, description, price, imageLink, published} = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course doesn't exist"
            });
        }
        await Course.updateOne(
            { _id: courseId },
            {
                $set: {
                    title: title,
                    description: description,
                    price: price,
                    imageLink: imageLink,
                    published: published
                }
            }
        );
        return res.status(202).json({
            message: "Updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(505).json({
            message: "Server error"
        });
    }
}); 


module.exports = {
    adminRouter
}