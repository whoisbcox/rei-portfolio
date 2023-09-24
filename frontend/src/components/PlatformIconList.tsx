import { SiZillow, SiAirbnb } from 'react-icons/si';
import { GiHouse } from 'react-icons/gi';
import { HStack, Icon } from '@chakra-ui/react';
import { Platform } from '../hooks/useProperties';
import { IconType } from 'react-icons';

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({platforms}: Props) => {
  const iconMap: { [key: string]: IconType} = {
    airbnb: SiAirbnb,
    zillow: SiZillow,
    realtor: GiHouse,
  }
  return (
    <HStack mt={2}>
    {platforms.map(platform => <Icon key={platform.slug} as={iconMap[platform.slug]} color='gray.500'/>)}
    </HStack>
  )
}

export default PlatformIconList