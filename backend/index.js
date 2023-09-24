const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const properties = {
  count: 12,
  results: [
    { id: 1,title: '1234 Main St', background_image: 'https://picsum.photos/300/200?random=1' },
    { id: 2,title: '4321 Washington Ave', background_image: 'https://picsum.photos/300/200?random=2' },
    { id: 3,title: '9876 Mountain St', background_image: 'https://picsum.photos/300/200?random=3' },
    { id: 4,title: '1122 First St', background_image: 'https://picsum.photos/300/200?random=4' },
    { id: 5,title: '3344 Apple Ln', background_image: 'https://picsum.photos/300/200?random=5' },
    { id: 6,title: '5566 Oak Blvd', background_image: 'https://picsum.photos/300/200?random=6' },
    { id: 7,title: '7788 Fairway Dr', background_image: 'https://picsum.photos/300/200?random=7' },
    { id: 8,title: '9900 Cedar Ln', background_image: 'https://picsum.photos/300/200?random=8' },
    { id: 9,title: '1029 Sunset Dr', background_image: 'https://picsum.photos/300/200?random=9' },
    { id: 10,title: '4848 Elm St', background_image: 'https://picsum.photos/300/200?random=10' },
    { id: 11,title: '1212 Ash St', background_image: 'https://picsum.photos/300/200?random=11' },
    { id: 12,title: '3434 Jackson St', background_image: 'https://picsum.photos/300/200?random=12' },
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