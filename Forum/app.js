const express = require('express');

const app = express();
app.set('view engine', 'pug');

require('./public/routes/app-route')(app);

app.listen(3001, () => console.log('Magic is running at 3001'));