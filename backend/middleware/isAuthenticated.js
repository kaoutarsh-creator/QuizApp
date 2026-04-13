import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const isAuthenticated = async (req, res, next) => {
  try {
    
    // 1. Get token from cookie
    let token = req.cookies.token;
    
    // Or from Authorization header
    /*const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }*/

    // 2. If no token → reject
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated. Please login.' });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 4. Find user in DB
    const user = await userModel.findById(decoded.id)//.select('-password');

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // 5. Attach user to request
    req.user = user;

    next(); // continue to controller
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default isAuthenticated;
