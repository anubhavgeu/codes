const jwt = require('jsonwebtoken');
const adminAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(404).json({
            message: "Please send auth header"
        })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(404).json({
            message: "Please send token"
        })
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET_ADMIN);
    if (!decodedData) {
        return res.status(404).json({
            message: "Please sign in first"
        });
    }
    req.user = decodedData.username;
    next();
}
const userAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(404).json({
            message: "Please send auth header"
        })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(404).json({
            message: "Please send token"
        })
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET_USER);
    if (!decodedData) {
        return res.status(404).json({
            message: "Please sign in first"
        });
    }
    req.user = decodedData.username;
    next();
}
module.exports = {
    userAuthMiddleware,
    adminAuthMiddleware
}