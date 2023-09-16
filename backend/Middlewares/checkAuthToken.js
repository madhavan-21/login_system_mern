const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    console.log("check auth token middleware called");

    if (!authToken || !refreshToken) {
        return res.status(401).json({
            message: "authentication failed : NO AUTH AND REFRESH TOKEN PROVIDED"

        })
    }


    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (refreshErr, refreshDecoded) => {
                if (refreshErr) {
                    return res.status(400).json({
                        message: "both token are expired , please relogin"
                    })
                } else {
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' })
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '10d' })

                    res.cookie('authToken', newAuthToken, { httponly: true });
                    res.cookie('refreshToken', newRefreshToken, { httponly: true })

                    req.userId = refreshDecoded.userId;
                    next();
                }
            })
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
}

module.exports = checkAuthToken;