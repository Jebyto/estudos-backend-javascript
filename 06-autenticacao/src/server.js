const express = require('express');
const path = require('path');
const router = require('./router');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false }
}));

app.use(router);

app.listen(3000, () => {
    console.log('Servidor rodando na porta http://localhost:3000/');
});