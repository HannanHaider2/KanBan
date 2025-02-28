const express = require('express');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const app = express();
const port = 3009;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/")

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});