import { Spinner, Heading, Box, Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import useProperty from '../hooks/useProperty';
import usePropertyTypes from '../hooks/usePropertyTypes';
import states from '../data/states.json';

const DashboardListingsEdit = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id!);
  const { data: propertyTypes } = usePropertyTypes();
  const thisPropertyType = propertyTypes?.find(p => p._id === property?.propertyTypes);

  if (isLoading) return <Spinner />;

  if (error || !property) throw error;

  return (
    <>
      <Heading>Edit Listing</Heading>
      <Box w="600px">
        <form>
          <FormLabel mt={4}>Name</FormLabel>
          <Input id="name" type="text" defaultValue={property.name}/>
          <FormLabel mt={4}>Street 1</FormLabel>
          <Input
            id="street1"
            type="text"
            defaultValue={property.address.street_1}
            />
          <FormLabel mt={4}>Street 2</FormLabel>
          <Input
            id="street2"
            type="text"
            defaultValue={property.address.street_2}
          />
          <FormLabel mt={4}>City</FormLabel>
          <Input
            id="city"
            type="text"
            defaultValue={property.address.city}
          />
          <FormLabel mt={4}>State</FormLabel>
          <Select
            id="state"
            defaultValue={property.address.state}
          >
            {states.map(state => <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>)}
          </Select>
          <FormLabel mt={4}>Zip</FormLabel>
          <Input
            id="zip"
            type="text"
            defaultValue={property.address.zip}
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