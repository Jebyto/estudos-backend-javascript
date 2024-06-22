const express = require('express');
const protectedRouter = require('./routes/protected');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/protected', protectedRouter);

app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:3000');
})