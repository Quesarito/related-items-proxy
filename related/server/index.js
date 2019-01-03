const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8889;

app.use(bodyParser());
app.use(express.static(__dirname + '/../public'));

app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log('Now listening on port ' + port + ' for product');
});