const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



//test route

router.get('/test', async (req, res) => {
    res.json({
        message: "auth route is working"
    })
})

// register

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json(
                { message: 'email already exist' }
            )
        }

        const newUser = new User({
            name,
            password,
            email
        })

        await newUser.save();
        res.status(201).json({
            message: " user register successfully"
        })
    } catch (err) {
        res.status(501).json({
            error: err.message
        })

    }
})

//login

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "user not register"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "invalid password"
            })
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '40m' });

        res.cookie('authToken', authToken, { httpOnly: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.status(200).json({
            message: "login successful"
        })

    } catch (err) {
        res.status(501).json({
            error: err.message
        })
    }
})

module.exports = router;