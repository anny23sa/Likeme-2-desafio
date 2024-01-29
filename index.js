const express = require('express');
const cors = require('cors');
const app = express();
const pool =require('./db');

const routes = require("./routes/routes.js")
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());


// milddlenare
app.use('/', routes)

app.listen(PORT, ()=> console.log(`servidos corriendo en el puerto ${PORT}`))