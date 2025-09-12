import express from 'express';
import connectDB from './lib/connectDB.js';
import jobRoute from './routes/jobRoute.js';
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const __dirname = path.resolve();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/auth', userRoute);
app.use('/api/job', jobRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`💻 Server is running on http://localhost:${PORT}/`);
  connectDB();
});
