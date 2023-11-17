const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authtokenHandler = require('../Middlewares/checkAuthToken')



//test route

router.get('/test', async (req, res) => {
    res.json({
        message: "auth route is working"
    })
})

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data
    }
}

// register

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json(
                createResponse(false, 'email already exists')
            )
        }

        const newUser = new User({
            name,
            password,
            email
        })

        await newUser.save();
        res.status(201).json(
            createResponse(true, 'user registered successfully')

        )
    } catch (err) {
        res.status(501).json({
            message: err
        })

    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json(
            createResponse(false, 'Invalid credentials')
        )



        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json(
                createResponse(false, 'Invalid credentials')
            )
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '40m' });

        res.cookie('authToken', authToken, { httpOnly: true })
        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.status(200).json(
            createResponse(true, "login successful", {
                authToken,
                refreshToken
            })

        )

    } catch (err) {
        res.status(501).json({
            error: err.message()
        })
    }
})

router.get('/checklogin', authtokenHandler, async (req, res) => {

    res.status(201).json({
        ok: true,
        message: 'user authenticated suceesfully'
    })
})

module.exports = router;