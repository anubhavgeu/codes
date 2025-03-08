const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(404).json({
                message: "Please provide token"
            });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            })
        }
        req.username = user;
        next(); 
    }
    else {
        return res.status(404).json({
            message: "Please provide header"
        });
    }
};

module.exports = {
    authMiddleware
}