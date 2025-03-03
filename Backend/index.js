const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require("cors")
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = express();
const port = 3002;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/KanBan")

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});