const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');

app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));

app.use(morgan('tiny'));


app.get('/api/products', (req, res) => {
  axios.get('http://localhost:3002/api/products', {
    params: req.query,
  })
  .then(product => {
    res.status(200).send(product.data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/PRODUCTS'));
});

// GET request for specific item 
// app.get('/api/items/:itemId', (req, res) => {
//   console.log(`the request is looking for ${ req.params.itemId }`);
//   axios.get(`http://localhost:8888/api/items/${ req.params.itemId }`)
//   .then(items => {
//     console.log('data sent to api/items!')
//     res.status(200).send(items.data);
//   })
//   .catch(() => console.log(`ERROR IN PROXY SERVER /API/ITEMS/${ req.params.itemId }`));

// });
app.get('/api/items/:itemId', (req, res) => {
  axios.get(`http://localhost:8888/api/items/${req.params.itemId}`)
  .then(item => {
    res.send(item.data);
  })
  .catch((err) => {
    throw err;
  })
});

// GET request for related items
app.get('/api/related/:itemId', (req, res) => {
  axios.get(`http://localhost:8888/api/related/${ req.params.itemId }`)
  .then((relatedItems) => {
    // console.log('DATADATADATA: ', relatedItems.data);
    res.status(200).send(relatedItems.data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/RELATED/:ITEMID'));

});

// GET request for frequentlyTogetherItems
app.get('/api/frequent/:itemId', (req, res) => {
  axios.get(`http://localhost:8888/api/frequent/${ req.params.itemId }`)
  .then((frequentItems) => {
    res.status(200).send(frequentItems.data);
  })
  .catch(() => console.log('ERROR IN PROXY SERVER /API/FREQUENT'));

});

// POST request for messages
// app.post('/api/messages', (req, res) => {
//   axios.post('http://localhost:8888/api/messages', {
    
//   })
// });

app.get('/reviews/:productId', (req, res) => {
  axios.get(`http://localhost:3003/reviews/${ req.params.productId }`)
  .then(reviewsData => res.status(200).send(reviewsData.data))
  .catch(() => console.log('ERROR IN PROXY SERVER /REVIEWS/:PRODUCTID'))
});

app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log('Now listening on port ' + port + ' for product');
});
