import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url'; // Import necessary for handling __dirname in ESM

// Import your database connection and routes
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import mapRoutes from './routes/mapRoutes.js';

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Resolve directory path issues in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Setup logging for development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/map', mapRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Define the port and start listening
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`)
);
