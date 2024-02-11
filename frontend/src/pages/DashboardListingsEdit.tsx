import { Heading, FormLabel, Input, Button, Select, Textarea, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Box, Image, Spinner } from '@chakra-ui/react'
import states from '../data/states.json'
import usePropertyTypes from '../hooks/usePropertyTypes';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useProperty from '../hooks/useProperty';
import { useEffect, useState } from 'react';

const DashboardListingsEdit = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id!);
  const { data: propertyTypes } = usePropertyTypes();
  const { register, handleSubmit, setValue } = useForm();
  const [featImage, setFeatImage] = useState('');

  useEffect(() => {
    if (!property) return;

    setValue('name', property.name);
    setValue('street_1', property.address.street_1);
    setValue('street_2', property.address.street_2);
    setValue('city', property.address.city);
    setValue('state', property.address.state);
    setValue('zip', property.address.zip);
    setValue('description', property.description);
    setValue('property_types', property.propertyTypes);

    if (property.featured_image_url){
      setFeatImage(property.featured_image_url);
    }
  }, [property, setValue, setFeatImage]);

  if (isLoading) return <Spinner />;

  if (error || !property) throw error;

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    
    // Append non-file fields to FormData
    formData.append('user', '12234567890');
    formData.append('name', data.name);
    formData.append('address[street_1]', data.street_1);
    formData.append('address[street_2]', data.street_2);
    formData.append('address[city]', data.city);
    formData.append('address[state]', data.state);
    formData.append('address[zip]', data.zip);
    formData.append('description', data.description);
    formData.append('bedrooms', data.bedrooms);
    formData.append('bathrooms', data.bathrooms);
    formData.append('propertyTypes', data.property_types);
    formData.append('featured_image_url', featImage);
  
    // Append the file to FormData
    if (data.featured_image[0]) {
      formData.append('featured_image', data.featured_image[0]);
    }
  
    try {
      const response = await axios.put(`http://localhost:8080/api/properties/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
  
      window.location.reload();
    } catch (error) {
      console.error('Error while making the PUT request:', error);
    }
  };

  const handleCLick = () => {
    setFeatImage('');
  };
  

  return (
    <>
      <Heading>Edit Listing</Heading>
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
          <NumberInput id="bedrooms" step={1} defaultValue={property?.bedrooms} min={0}>
            <NumberInputField { ...register('bedrooms', {valueAsNumber: true}) } />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="bathrooms" mt={4}>Bathrooms</FormLabel>
          <NumberInput id="bathrooms" step={1} defaultValue={property?.bathrooms} min={0}>
            <NumberInputField { ...register('bathrooms', {valueAsNumber: true}) } />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="featured_image" mt={4}>Image</FormLabel>
          <Input { ...register('featured_image') } id="featured_image" type="file" accept="image/*" variant="unstyled" />
          { featImage && (
              <Box mt={4}>
                <Image src={featImage} boxSize='200px' objectFit='cover' />
                <Button variant='outline' mt={4} onClick={handleCLick}>Remove</Button>
              </Box>
            )
          }
          <Button id="submit" type="submit" variant="solid" mt={8}>Update</Button>
        </form>
      </Box>
    </>
  )
}

export default DashboardListingsEdit