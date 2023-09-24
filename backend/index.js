const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const properties = require('./data/properties.json');
app.use(cors());
app.use(express.json());

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