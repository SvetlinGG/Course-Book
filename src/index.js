const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(routes);


app.listen(1000, () => console.log('Server is listen on http://localhost:1000'));