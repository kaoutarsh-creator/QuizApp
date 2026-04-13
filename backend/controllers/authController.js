// authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import 'dotenv/config';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create user
        const user = await userModel.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', userId: user._id });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ error: 'User not found' });

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Wrong password' });
        
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        );
        
        res.cookie('token', token);
        
        res.json({ message: `Hello ${user.name}`, token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsers = async (req, res) => {
  try {
    //const users = await userModel.find().select('-password'); // exclude passwords
    const users = await userModel.find()
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // req.user comes from isAuthenticated middleware
    res.status(200).json({
      message: 'User profile',
      user: req.user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
