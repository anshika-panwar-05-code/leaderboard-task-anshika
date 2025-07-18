require('dotenv').config();
const express= require('express');
const mongoose=require('mongoose');
const cors = require('cors');

const connectDB= require('./config/db')
const userRoutes = require('./routes/userRoutes');
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api',userRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
