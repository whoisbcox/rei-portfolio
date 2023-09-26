import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

const PropertyCardSkeleton = () => {
  return (
    <Box width='100%'>
      <Skeleton height='200px' borderRadius={5} />
      <SkeletonText />
    </Box>
  )
}

export default PropertyCardSkeleton