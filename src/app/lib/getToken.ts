import jwt from 'jsonwebtoken';

const generateToken = (email) => {
    // Secret key for signing the token. In a real application, use a long, random, and secure key.
    // Store this key in your environment variables for production.
    const secretKey = process.env.JWT_SECRET_KEY;

    // Token payload
    const payload = {
        email: email,
        // You can add more user-related data here if needed
    };

    // Token expiration time
    const expiresIn = '1h'; // Token expires in 1 hour

    // Generate the token
    const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

    return token;
};
