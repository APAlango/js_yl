// index.js
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});