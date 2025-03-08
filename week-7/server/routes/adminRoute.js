const express = require('express');
const { adminSchema } = require('../zodSchema/adminSchema');
const { Admin, Course } = require('../database');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcryptjs');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { courseSchema } = require('../zodSchema/courseSchema');
const adminRouter = express.Router();

adminRouter.post('/signup', async(req, res) => {
    const parsedResult = adminSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(404).json({
            message: "Enter data in correct format"
        })
    }

    const {username, password} = req.body;
    const response = await Admin.findOne({username});
    if (response) {
        return res.status(404).json({
            message: "User Exists"
        });
    }
    const hashedPassword = bcrpyt.hashSync(password,10);
    await Admin.create({
        username: username,
        password: hashedPassword
    });

    return res.status(202).json({
        message: "Admin created Successfully"
    })
});

adminRouter.post('/signin', async(req, res) => {
    const parsedResult = adminSchema.safeParse(req.body);
    if (!parsedResult.success) {
        return res.status(404).json({
            message: "Enter data in correct format"
        })
    }

    const {username, password} = req.body;
    const user = await Admin.findOne({username});
    if (!user) {
        return res.status(404).json({
            message: "User doesn't Exists"
        });
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

adminRouter.get('/courses', async(req, res) => {
    const course = await Course.find({});
    return res.status(202).json({
        message: "Fetched all the courses",
        courses: course
    })
});

adminRouter.use(authMiddleware);

adminRouter.post('/courses', async(req, res) => {
    const parsedData = courseSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(404).json({
            message: "Incorrect format of data"
        })
    }
    try {
        const { title, price, description, imageUrl, published } = req.body;

        const newCourse = await Course.create({ title, price, description, imageUrl, published });

        return res.status(201).json({
            message: "Course added successfully",
            course: newCourse
        });
    } catch (error) {
        console.log(error)
        return res.status(505).json({
            message: "Server error"
        })
    }
});

adminRouter.put('/courses/:courseId', async(req, res) => {
    const {courseId} = req.params;
    const {title, description, price, imageUrl, published} = req.body;
    const parsedData = courseSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(404).json({
            message: "Incorrect format"
        })
    }
    try {
        const course = await Course.updateOne({
            _id: courseId
        }, {
            $set: {
                title: title,
                price: price,
                description: description,
                imageUrl: imageUrl,
                price: price,
                published: published
            }
        });
        return res.status(202).json({
            message: "Course with given id updated successfully",
            course: course
        })
    } catch (error) {
        return res.status(505).json({
            message: "Server error"
        })
    }
}); 


module.exports = {
    adminRouter
}