const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const properties = {
  count: 12,
  results: [
    { id: 1,title: '1234 Main St' },
    { id: 2,title: '4321 Washington Ave' },
    { id: 3,title: '9876 Mountain St' },
    { id: 4,title: '1122 First St' },
    { id: 5,title: '3344 Apple Ln' },
    { id: 6,title: '5566 Oak Blvd' },
    { id: 7,title: '7788 Fairway Dr' },
    { id: 8,title: '9900 Cedar Ln' },
    { id: 9,title: '1029 Sunset Dr' },
    { id: 10,title: '4848 Elm St' },
    { id: 11,title: '1212 Ash St' },
    { id: 12,title: '3434 Jackson St' },
  ]
};

app.get('/api/properties', (req, res) => {
  res.status(200).send(properties);
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.results.find(p => p.id === parseInt(req.params.id));
  if (!property) return res.status(400).send('The property with the given ID was not found');
  res.status(200).send(property);
});

app.post('/api/properties', (req, res) => {
  const property = {
    id: properties.results.length + 1,
    title: req.body.title
  }

  properties.results.push(property);
  res.send(property);
});

app.delete('/api/properties/:id', (req, res) => {
  const property = properties.results.find(p => p.id === parseInt(req.params.id));
  if (!property) return res.status(400).send('The property with the given ID was not found');

  const index = properties.results.indexOf(property);
  properties.results.splice(index, 1);
  res.send(properties);
});

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);