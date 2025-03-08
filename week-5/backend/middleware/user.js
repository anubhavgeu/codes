//  start writing from here
const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // verify token
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) {
            return res.status(404).json({
                message: "Invalid token"
            });
        }
        req.userId = decodedData.userId;
        next();
    } else {
        return res.status(401).json({
            message: "No Auth header provided"
        })
    }
}

module.exports = {
    authenticateJwt: authenticateJwt
}