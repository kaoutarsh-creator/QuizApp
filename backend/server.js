// server.js (or index.js)
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// JSON Middleware
app.use(express.json());
// Cookie Parser
app.use(cookieParser());
// Routes
app.use('/api', userRoutes);


// Database & server setup (suite)
const startServer = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/AuthApp');
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB: ', error);
        process.exit(1); // Exit the process with error
        }
};

await startServer();
