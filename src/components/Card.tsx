import { Box, Image, Text, Stack, Heading } from '@chakra-ui/react'

function Card(props: {
  product: string
  summary: string
  longLine: string
  imageUrl: string
}) {
  const { product, summary, longLine, imageUrl } = props

  return (
    <Box
      p={4}
      display={{ md: 'flex' }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      height={'100%'}
    >
      {/* <AspectRatio ratio={1 / 1}> */}
      <Image
        width="100px"
        height="100px"
        margin="auto"
        loading="lazy"
        src={`${imageUrl}/preview`}
        alt="Woman paying for a purchase"
      />
      {/* </AspectRatio> */}
      <Stack
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {product}
        </Text>
        <Heading size="md">{summary}</Heading>
        <Text my={2} color="gray.500">
          {longLine}
        </Text>
      </Stack>
    </Box>
  )
}

export default Card
