const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require("cors")
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const loggerRouter = require('./routes/logger');
require('dotenv').config();
const app = express();
//const port = 3002;
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.DB)

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use('/logger', loggerRouter);
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
});