const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        try {
            token = token.split(' ')[1];
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) {
                return res.status(401).json({ message: 'Invalid token / Authorization denied' });
            }
            req.user = decodedToken;
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(401).json({ message: 'No JWT token found' });
    }
}