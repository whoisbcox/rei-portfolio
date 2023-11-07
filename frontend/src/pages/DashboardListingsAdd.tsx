import { Heading, FormLabel, Input, Button, Select, Textarea, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Box } from '@chakra-ui/react'
import states from '../data/states.json'
import usePropertyTypes from '../hooks/usePropertyTypes';
import { FieldValues, useForm } from 'react-hook-form';

const DashboardListingsAdd = () => {
  const { data: propertyTypes } = usePropertyTypes();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <>
      <Heading >Add New Listing</Heading>
      <Box w="600px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="name" mt={4}>Name</FormLabel>
          <Input { ...register('name', { required: true, minLength: 5, maxLength: 255 }) } id="name" type="text" />
          <FormLabel htmlFor="street1" mt={4}>Street 1</FormLabel>
          <Input { ...register('street1') } id="street1" type="text" />
          <FormLabel htmlFor="street2" mt={4}>Street 2</FormLabel>
          <Input { ...register('street2') } id="street2" type="text" />
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
          <FormLabel htmlFor="propertyTypes" mt={4}>Property Type</FormLabel>
          <Select { ...register('propertyTypes') } id="propertyTypes">
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