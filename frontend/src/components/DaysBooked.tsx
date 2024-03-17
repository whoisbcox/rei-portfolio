import { Badge } from '@chakra-ui/react';

interface Props {
  days_booked: number;
}

const DaysBooked = ({ days_booked }: Props) => {
  const color = days_booked > 99 ? 'red' : days_booked > 75 ? 'orange' : days_booked > 60 ? 'yellow' : 'green';
  const fullyBooked = 100 === days_booked;
  const fullyVacant = 0 === days_booked;
  return (
    <>
    {
      fullyVacant ? <Badge colorScheme="green">Book Now</Badge>:
      fullyBooked ? <Badge colorScheme="red">Fully Booked</Badge>
      : <Badge colorScheme={color}>{days_booked}% booked</Badge>
    }
    </>
  )
}

export default DaysBooked