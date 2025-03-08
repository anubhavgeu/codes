//  start writing your code from here
const {Router} = require('express');
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { userSchema } = require('../Schemas/userSchema');


userRouter.post('/signup', async(req, res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let parseResult = userSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(404).json({
            message: "Enter the credentials in correct format"
        });
    }
    let response = await User.findOne({username: username});
    if (response) {
        return res.status(404).json(
            {message: "User already exists"}
        )
    } 
    password = bcrypt.hashSync(password,10);
    const newUser = new User({username,password});
    await newUser.save();

    return res.status(202).json({
        message: "User created successfully"
    });
});

userRouter.post('/signin', async (req, res) => {
    const {username, password} = req.body;
    const parseResult = userSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(404).json({
            message: "Enter the credentials in correct format"
        });
    }
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }
        // check if user provided correct password;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                message: "Password is incorrect"
            });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(202).json({
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
});


module.exports = {
    userRouter: userRouter
}