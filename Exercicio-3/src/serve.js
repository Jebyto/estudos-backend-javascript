const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());

app.use('/api', router);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));