require('dotenv').config();
const express= require('express');
const mongoose=require('mongoose');
const cors = require('cors');

const connectDB= require('./config/db')
const userRoutes = require('./routes/userRoutes');
connectDB();

const app=express();
const allowedOrigins = [
  'https://leaderboard-task-anshika-1.onrender.com', // frontend render URL
  'http://localhost:3000' // for local testing
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api',userRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
