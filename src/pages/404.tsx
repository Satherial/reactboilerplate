import { Center, Text, Heading, VStack } from '@chakra-ui/react'

export default function NotFound() {
  return (
    <Center h="100%">
      <VStack>
        <Heading size="4xl">404</Heading>
        <Text fontSize="2xl">You may be lost...</Text>
      </VStack>
    </Center>
  )
}
