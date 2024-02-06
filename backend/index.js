const pool = require('./config/db');
const express = require('express');
const app = express();
const router = require('./routes/routes');
const cors = require('cors');
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});