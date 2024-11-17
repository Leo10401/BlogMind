const express = require('express');
const app = express();
const port = 5000;
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const compRouter = require('./routers/compRouter');
const participationRouter = require('./routers/participationRouter');
const utilRouter = require('./routers/utilRouter');

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});