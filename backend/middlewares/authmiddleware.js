import jwt from 'jsonwebtoken'; // Import jsonwebtoken to verify access tokens

/**
 * Middleware to protect routes that require authentication.
 * It checks for a 'Bearer' token in the Authorization header.
 */
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            // Split the 'Bearer <token>' string to get only the token part
            const token = authHeader.split(' ')[1];

            // Check if token itself is the string "undefined"
            if (!token || token === "undefined") {
                return res.status(401).json({ message: 'No valid token provided' });
            }

            // Verify the token using the secret key from environment variables
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // If verification fails, return an unauthorized status
            if (!decodedToken) {
                return res.status(401).json({ message: 'Invalid token / Authorization denied' });
            }

            // Attach the decoded user data to the request object for use in controllers
            req.user = decodedToken;
            console.log(req.user);

            // Move on to the next middleware or request handler
            next();
        } catch (error) {
            // Log the error and return a server error status
            console.log(error);
            res.status(401).json({ error: error.message });
        }
    } else {
        // Return unauthorized if no valid token structure is provided
        return res.status(401).json({ message: 'No JWT token found' });
    }
}