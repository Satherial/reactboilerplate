import {
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Box,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export default function Topics() {
  const location = useLocation()

  return (
    <VStack>
      <Heading size="2xl">Topics</Heading>
      <Box style={{ marginTop: '25px' }}>
        <List spacing={5}>
          <ListItem>
            <ListIcon as={FaArrowRight} color="green.500" />
            <Link to={`${location.pathname}/subpage1`}>Sub Page 1</Link>
          </ListItem>
          <ListItem>
            <ListIcon as={FaArrowRight} color="green.500" />
            <Link to={`${location.pathname}/subpage2`}>Sub Page 2</Link>
          </ListItem>
        </List>
      </Box>
    </VStack>
  )
}
