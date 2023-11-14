import { Heading, FormLabel, Input, Button, Select, Textarea, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Box } from '@chakra-ui/react'
import states from '../data/states.json'
import usePropertyTypes from '../hooks/usePropertyTypes';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';

const DashboardListingsAdd = () => {
  const { data: propertyTypes } = usePropertyTypes();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  const onSubmit = (data: FieldValues) => {
    const property = {
      user: '12234567890',
      name: data.name,
      address: {
        street_1: data.street_1,
        street_2: data.street_2,
        city: data.city,
        state: data.state,
        zip: data.zip,
      },
      description: data.description,
      featured_image: data.featured_image[0]?.name,
      // platforms: Joi.array().items(Joi.object({
      //   name: Joi.string(),
      //   slug: Joi.string(),
      //   url: Joi.string().uri(),
      // })).allow(null, ''),
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      // days_booked: Joi.number().integer().min(0).max(100).allow(null, ''),
      propertyTypes: data.property_types
    }
    console.log(property);
    return axios
    .post('http://localhost:8080/api/properties', {...property})
    .then((response) => {
      console.log('Response from the server:', response.data);
    })
    .catch((error) => {
      console.error('Error while making the POST request:', error);
    });
  };

  return (
    <>
      <Heading >Add New Listing</Heading>
      <Box w="600px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="name" mt={4}>Name</FormLabel>
          <Input { ...register('name', { required: true, minLength: 5, maxLength: 255 }) } id="name" type="text" />
          <FormLabel htmlFor="street_1" mt={4}>Street 1</FormLabel>
          <Input { ...register('street_1') } id="street_1" type="text" />
          <FormLabel htmlFor="street_2" mt={4}>Street 2</FormLabel>
          <Input { ...register('street_2') } id="street_2" type="text" />
          <FormLabel htmlFor="city" mt={4}>City</FormLabel>
          <Input { ...register('city') } id="city" type="text" />
          <FormLabel htmlFor="state" mt={4}>State</FormLabel>
          <Select { ...register('state') } id="state" defaultValue="">
            {states.map((state) => {
              const isDefault = '' === state.name;
              return isDefault ?
              <option key={state.abbreviation} value="" disabled>{state.abbreviation}</option>:
              <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>;
            })}
          </Select>
          <FormLabel htmlFor="zip" mt={4}>Zip</FormLabel>
          <Input { ...register('zip') } id="zip" type="text" />
          <FormLabel htmlFor="property_types" mt={4}>Property Type</FormLabel>
          <Select { ...register('property_types') } id="property_types">
            {propertyTypes?.map(propertyType => <option key={propertyType._id} value={propertyType._id}>{propertyType.name}</option>)}
          </Select>
          <FormLabel htmlFor="description" mt={4}>Description</FormLabel>
          <Textarea { ...register('description') } id="description" />
          <FormLabel htmlFor="bedrooms" mt={4}>Bedrooms</FormLabel>
          <NumberInput id="bedrooms" step={1} defaultValue={0} min={0}>
            <NumberInputField { ...register('bedrooms', {valueAsNumber: true}) } />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="bathrooms" mt={4}>Bathrooms</FormLabel>
          <NumberInput id="bathrooms" step={1} defaultValue={0} min={0}>
            <NumberInputField { ...register('bathrooms', {valueAsNumber: true}) } />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="featured_image" mt={4}>Image</FormLabel>
          <Input { ...register('featured_image') } id="featured_image" type="file" accept="image/*" variant="unstyled" />
          <Button id="submit" type="submit" variant="solid" mt={8}>Save</Button>

        </form>
      </Box>
    </>
  )
}

export default DashboardListingsAdd