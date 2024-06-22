const express = require('express')
const midwareC = require('./middlewares/midware-C')
const uploadMiddleware = require('./middlewares/upload')
const app = express()

app.use(express.static('public'));

app.use(function (req, res, next) {
  req.middlewareA = 'OK'
  next()
})

function middlewareB(req, res, next) {
  req.middlewareB = 'OK'
  next()
}

app.get('/testeA', (req, res) => {
  console.log({ a: req.middlewareA, b: req.middlewareB })
  res.end()
})

app.get('/testeB', midwareC, middlewareB, (req, res) => {
  console.log({ a: req.middlewareA, b: req.middlewareB })
  res.end()
})

app.post('/upload', uploadMiddleware.single('image'), (req, res) => {
    req.file.filename = "imagem.jpg";
    console.log(req.file, req.body);
    res.json({ message: 'Arquivo enviado com sucesso' });
})

app.use(function (err, req, res, next) {
    if(err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`))