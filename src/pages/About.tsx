import {
  Center,
  Grid,
  GridItem,
  VStack,
  Text,
  List,
  ListItem,
  ListIcon,
  Image,
} from '@chakra-ui/react'
import {
  FiAlertTriangle,
  FiClipboard,
  FiCodepen,
  FiDatabase,
} from 'react-icons/fi'

export default function About() {
  return (
    <Center>
      <VStack px={[5, 25, 50]}>
        <Grid
          templateRows={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
          templateColumns={['repeat(1, 1fr)', 'repeat(5, 1fr)']}
          gap={4}
        >
          <GridItem rowSpan={[1, 2]} colSpan={1}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FiAlertTriangle} color="green.500" />
                Lorem ipsum dolor sit amet
              </ListItem>
              <ListItem>
                <ListIcon as={FiClipboard} color="green.500" />
                eiusmod tempor incididunt
              </ListItem>
              <ListItem>
                <ListIcon as={FiCodepen} color="green.500" />
                enim ad minim veniam
              </ListItem>
              <ListItem>
                <ListIcon as={FiDatabase} color="green.500" />
                eprehenderit in voluptate
              </ListItem>
            </List>
          </GridItem>
          <GridItem colSpan={[1, 2]} bg="papayawhip">
            <Image
              fit="cover"
              w="100%"
              h="100%"
              src={`${process.env.PUBLIC_URL}/images/img1.jpg`}
            />
          </GridItem>
          <GridItem colSpan={[1, 2]} bg="papayawhip">
            <Image
              fit="cover"
              w="100%"
              h="100%"
              src={`${process.env.PUBLIC_URL}/images/img2.jpg`}
            />
          </GridItem>
          <GridItem colSpan={[1, 4]}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </GridItem>
        </Grid>
      </VStack>
    </Center>
  )
}
