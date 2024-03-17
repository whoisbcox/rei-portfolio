import { AspectRatio, Box, Skeleton, SkeletonText } from '@chakra-ui/react'

const PropertyCardSkeleton = () => {
  return (
    <Box width="100%">
      <AspectRatio maxW="100%" ratio={4 / 3}>
        <Skeleton width="100%" borderRadius={5} />
      </AspectRatio>
      <SkeletonText />
    </Box>
  )
}

export default PropertyCardSkeleton