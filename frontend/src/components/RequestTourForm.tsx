import { Box, Button, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form';
import { formatDate } from '../utils';
import axios from 'axios';


const RequestTourForm = ({ propertyId }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const today = new Date();
  
  const onSubmit = async (formData: FieldValues) => {
    formData.property = propertyId;
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8080/api/submit-form', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (200 == response.status) {
        alert('Form submitted successfully!');
        reset(); // Reset the form after successful submission
      } else {
        alert('Failed to submit form. Please try again later.');
      }
  
      console.log('Response from the server:', response.data);
    } catch (error) {
      console.error('Error while making the POST request:', error);
    }
    
    // try {
    //   // Include user ID in the form data
    //   formData.propertyId = propertyId;

    //   const response = await fetch('/submit-form', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   if (response.ok) {
    //     alert('Form submitted successfully!');
    //     reset(); // Reset the form after successful submission
    //   } else {
    //     alert('Failed to submit form. Please try again later.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   alert('Failed to submit form. Please try again later.');
    // }
  };

  const minDate = formatDate(today);
  const maxDate = formatDate(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)); // Add 14 days

  return (
    <Box borderWidth={1} borderRadius={5} p={6}>
      <Heading>Schedule Tour</Heading>
      <Text></Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            id="start_date"
            {...register('start_date', { required: true })}
            min={minDate} 
            max={maxDate}
            mt={6}
          />
          {errors.date && <span>Date is required</span>}
          <Input
            type="text"
            id="name"
            placeholder='Full Name'
            {...register('name', { required: true })}
            mt={6}
            />
          {errors.name && <span>Full Name is required</span>}
          <Input
            type='email'
            id="email"
            {...register('email', { required: true })}
            placeholder='Email Address'
            mt={6}
          />
          {errors.email && <span>Email is required</span>}
          <Button
            type='submit'
            variant='solid'
            colorScheme='green'
            w='100%'
            mt={6}
          >Request Showing</Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default RequestTourForm