const express = require('express');
const router = express.Router();
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');


router.get('/test', authTokenHandler, async (req, res) => {
    res.json({
        message: "home",
        userId: req.userId
    })
})

module.exports = router;