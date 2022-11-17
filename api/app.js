const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config({ path: '../.env' });
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/error-middleware')

connectDB()

// routes
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')


const port = process.env.PORT || 5000;
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Access']
}))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', userRouter);
app.use('/admin', adminRouter);


app.use(errorHandler)

// Listen
app.listen(port, () => console.log(`Server connected to port ${port}`))
