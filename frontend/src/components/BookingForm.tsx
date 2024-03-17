import { Box, Button, FormControl, Input, Text } from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form'
import { formatDate } from '../utils'


const BookingForm = ({ propertyId }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const today = new Date();
  today.setDate(today.getDate() + 1);
  
  const onSubmit = async (formData: FieldValues) => {
    try {
      // Include user ID in the form data
      formData.property = propertyId;

      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Form submitted successfully!');
        reset(); // Reset the form after successful submission
      } else {
        alert('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  const minDate = formatDate(today);
  const maxDate = formatDate(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)); // Add 14 days

  return (
    <Box borderWidth={1} borderRadius={5} p={6}>
      <Text fontSize="2xl">$180/night</Text>
      <Text></Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            placeholder="Check-in"
            size="md"
            type="date"
            id="startdate"
            {...register('startdate', { required: true })}
            min={minDate} 
            max={maxDate}
            mt={6}
          />
          {errors.date && <span>Check-in date is required</span>}
          <Input
            placeholder="Checkout"
            size="md"
            type="date"
            id="enddate"
            {...register('enddate', { required: true })}
            min={minDate} 
            max={maxDate}
            mt={6}
          />
          {errors.date && <span>Checkout date is required</span>}
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            {...register('name', { required: true })}
            mt={6}
            />
          {errors.name && <span>Full Name is required</span>}
          <Input
            type="email"
            id="email"
            {...register('email', { required: true })}
            placeholder="Email Address"
            mt={6}
          />
          {errors.email && <span>Email is required</span>}
          <Button
            type="submit"
            variant="solid"
            colorScheme="green"
            w="100%"
            mt={6}
          >Reserve</Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default BookingForm