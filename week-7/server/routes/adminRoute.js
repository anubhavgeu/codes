const express = require('express');
const { Admin } = require('../database');
const jwt = require('jsonwebtoken');

adminRouter.post('/signup', async(req, res) => {
    const {username,password} = req.body();
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

    } catch (error) {
        return res.status(505).json({
            message: error.message
        });
    }
});

adminRouter.post('/signin', async(req, res) => {
    const {username, password} = req.body();
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

adminRouter.get('/courses', async(req, res) => {
    
});

adminRouter.post('/courses', async(req, res) => {
    
});

adminRouter.put('/courses/:courseId', async(req, res) => {
    
}); 


module.exports = {
    adminRouter
}