require('./config/db');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();


// middlewares
app.use(express.json());
app.use(cors());

// errors
app.use((error, req, res, next) => {
	res.status(500).send('Error en el servidor');
});

// routes
app.use('/', routes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log('iS RUNNING' + PORT);
});


module.exports = app;
