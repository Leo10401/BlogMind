const express = require('express');
const app = express();
require('dotenv').config();
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const compRouter = require('./routers/compRouter');
const participationRouter = require('./routers/participationRouter');
const utilRouter = require('./routers/utilRouter');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({
    origin: CORS_ORIGIN
}));

app.use(express.json());

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comp', compRouter);
app.use('/part', participationRouter);
app.use('/util', utilRouter);

app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});