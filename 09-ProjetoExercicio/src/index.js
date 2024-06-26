require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/auth');
const apiRouter = require('./routes/api');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api', apiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});