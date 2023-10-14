const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const properties = require('./data/properties.json');
const propertyTypes = require('./data/propertyTypes.json');
app.use(cors());
app.use(express.json());

// Properties
app.get('/api/properties', (req, res) => {
  // Parse query parameters for propertyTypes
  const selectedPropertyTypes = parseInt(req.query.propertyTypes);
  
  // Store sorting option if provided
  const ordering = req.query.ordering ? req.query.ordering : undefined;
  
  // Store sorting option if provided
  const search = req.query.search ? req.query.search : undefined;

  // Parse bedroom and bathroom filters if provided
  const min_bedrooms = req.query.min_bedrooms ? parseInt(req.query.min_bedrooms) : undefined;
  const max_bedrooms = req.query.max_bedrooms ? parseInt(req.query.max_bedrooms) : undefined;
  const min_bathrooms = req.query.min_bathrooms ? parseInt(req.query.min_bathrooms) : undefined;
  const max_bathrooms = req.query.max_bathrooms ? parseInt(req.query.max_bathrooms) : undefined;

  // Start with all properties
  let filteredResults = properties.results;

  // Filter based on selected property types, if provided
  if (selectedPropertyTypes) {
    filteredResults = filteredResults.filter((property) => property.propertyTypes === selectedPropertyTypes);
  }

  // Filter based on bedrooms, if filter parameters are provided
  if (min_bedrooms !== undefined || max_bedrooms !== undefined) {
    filteredResults = filteredResults.filter((property) => {
      const bedrooms = property.bedrooms || 0;
      return (
        (min_bedrooms === undefined || bedrooms >= min_bedrooms) &&
        (max_bedrooms === undefined || bedrooms <= max_bedrooms)
      );
    });
  }

  // Filter based on bathrooms, if filter parameters are provided
  if (min_bathrooms !== undefined || max_bathrooms !== undefined) {
    filteredResults = filteredResults.filter((property) => {
      const bathrooms = property.bathrooms || 0;
      return (
        (min_bathrooms === undefined || bathrooms >= min_bathrooms) &&
        (max_bathrooms === undefined || bathrooms <= max_bathrooms)
      );
    });
  }
  
  // Sorting
  if (typeof ordering !== 'undefined' && filteredResults) {
    const sortFunctions = {
      'name': (a, b) => a.name.localeCompare(b.name),
      'availability': (a, b) => a.days_booked - b.days_booked,
    };
  
    filteredResults.sort(sortFunctions[ordering]);
  } else {
    filteredResults.sort((a, b) => a.id - b.id);
  }

  if (search) {
    console.log(search);
    filteredResults = filteredResults.filter((property) => {
      const addressMatch = property.address.toLowerCase().includes(search.toLowerCase());
      const nameMatch = property.name.toLowerCase().includes(search.toLowerCase());
      return addressMatch || nameMatch;
    });
  }
  
  res.status(200).send({ ...properties, results: filteredResults });
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.results.find(p => p.id === parseInt(req.params.id));
  if (!property) return res.status(400).send('The property with the given ID was not found');
  res.status(200).send(property);
});

app.post('/api/properties', (req, res) => {
  const property = {
    id: properties.results.length + 1,
    name: req.body.name
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

// Property Types
app.get('/api/property-types', (req, res) => {
  res.status(200).send(propertyTypes);
});

app.get('/api/property-types/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');
  res.status(200).send(propertyType);
});

app.post('/api/property-types', (req, res) => {
  const propertyType = {
    id: propertyTypes.results.length + 1,
    name: req.body.name
  }

  propertyTypes.results.push(propertyType);
  res.send(propertyType);
});

app.delete('/api/property-types/:id', (req, res) => {
  const propertyType = propertyTypes.results.find(p => p.id === parseInt(req.params.id));
  if (!propertyType) return res.status(400).send('The property type with the given ID was not found');

  const index = propertyTypes.results.indexOf(propertyType);
  propertyTypes.results.splice(index, 1);
  res.send(propertyTypes);
});

app.listen(
  PORT,
  () => console.log(`Listening on http://localhost:${PORT}`)
);