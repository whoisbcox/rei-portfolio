import { Spinner, Heading, Box, Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import useProperty from '../hooks/useProperty';
import usePropertyTypes from '../hooks/usePropertyTypes';
import states from '../data/states.json';
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";

const DashboardListingsEdit = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id!);
  const { data: propertyTypes } = usePropertyTypes();
  const thisPropertyType = propertyTypes?.find(p => p._id === property?.propertyTypes);
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (!property) return;
    // Fetch data from the database and set the initial values
    setStreet1(property.address.street_1);
    setStreet2(property.address.street_2);
    setCity(property.address.city);
    setState(property.address.state);
    setZip(property.address.zip);
    setSlug(property.slug);
  }, [property]);

  useEffect(() => {
    const address = `${street1} ${street2} ${city} ${state} ${zip}`;
    const newSlug = slugify(address, {
      replacement: '-',
      lower: true,
    });
    setSlug(newSlug);
  }, [street1, street2, city, state, zip]);

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  if (isLoading) return <Spinner />;

  if (error || !property) throw error;

  const domain = window.location.host;
  const protocol = location.protocol;

  return (
    <>
      <Heading>Edit Listing</Heading>
      <p>Generated Slug: {slug}</p>
      <Box w="600px">
        <form>
          <FormLabel mt={4}>Name</FormLabel>
          <Input id="name" type="text" defaultValue={property.name}/>
          <FormLabel mt={4}>Slug</FormLabel>
          <InputGroup>
            <InputLeftAddon children="Permalink" />
            <Input
              id="slug"
              type="text"
              defaultValue={`${protocol}//${domain}/properties//${property._id}`}
              isReadOnly
            />
          </InputGroup>
          <FormLabel mt={4}>Street 1</FormLabel>
          <Input
            id="street1"
            type="text"
            value={street1}
            onChange={(e) => setStreet1(e.target.value)}
            />
          <FormLabel mt={4}>Street 2</FormLabel>
          <Input
            id="street2"
            type="text"
            value={street2}
            onChange={(e) => setStreet2(e.target.value)}
          />
          <FormLabel mt={4}>City</FormLabel>
          <Input
            id="city"
            type="text"
            defaultValue={property.address.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormLabel mt={4}>State</FormLabel>
          <Select
            id="state"
            defaultValue={property.address.state}
            onChange={handleStateChange}
          >
            {states.map(state => <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>)}
          </Select>
          <FormLabel mt={4}>Zip</FormLabel>
          <Input
            id="zip"
            type="text"
            defaultValue={property.address.zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <FormLabel mt={4}>Property Type</FormLabel>
          <Select id="property-type" defaultValue={thisPropertyType?._id}>
            {propertyTypes?.map(propertyType => <option key={propertyType._id} value={propertyType._id}>{propertyType.name}</option>)}
          </Select>
          <FormLabel mt={4}>Description</FormLabel>
          <Textarea id="desc" defaultValue={property.description}/>
          <FormLabel mt={4}>Bedrooms</FormLabel>
          <NumberInput id="bedrooms" step={1} defaultValue={property.bedrooms} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt={4}>Bathrooms</FormLabel>
          <NumberInput id="bathrooms" step={1} defaultValue={property.bathrooms} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt={4}>Image</FormLabel>
          <Input id="background-image" type="file" accept="image/*" variant="unstyled" />
          <Button type="submit" variant="solid" mt={8}>Save</Button>
        </form>
      </Box>
    </>
  )
}

export default DashboardListingsEdit