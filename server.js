'use strict';

const express = require('express');
const path = require('path');

const app = express();

// Setup logger
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//app.use(express.static(__dirname + '/dist'));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Always return the main index.html, so react-router render the route in the client
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'favicon.ico'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
