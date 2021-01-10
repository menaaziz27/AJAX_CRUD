const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname));
var products = [
  {
    id: 1,
    name: 'laptop',
  },
  {
    id: 2,
    name: 'microwave',
  },
];

var currentId = 2;

app.use(bodyParser.json());

app.get('/products', (req, res) => {
  res.send({ products: products });
});

app.post('/products', (req, res) => {
  const name = req.body.name;
  currentId++;

  const obj = { id: currentId, name: name };
  products.push(obj);
  res.send('successfully created product!');
});

app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;

  let found = false;

  products.forEach((product) => {
    if (!found && product.id === Number(id)) {
      product.name = newName;
      found = false;
    }
  });

  res.send('successfuly updated record!');
});

app.delete('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = false;

  products.forEach((product, index) => {
    if (!found && product.id === id) {
      products.splice(index, 1);
    }
  });

  res.send('Deleted record successfully!');
});
app.listen(3000);
