import { Heading, Button, Square, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export default function Topic() {
  const { topicId } = useParams()

  return (
    <VStack>
      <Text>Requested topic ID</Text>
      <Heading size="xl">{topicId}</Heading>
      <Square size={['50px', '150px']}> </Square>
      <Button leftIcon={<FaArrowLeft />} as={RouterLink} to={-1 as any}>
        Back
      </Button>
    </VStack>
  )
}
