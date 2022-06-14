import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Text,
  Flex,
  Spacer,
  Image,
  useColorMode,
  VStack,
} from '@chakra-ui/react'

export default function Footer() {
  const { colorMode } = useColorMode()
  return (
    <Flex
      as="footer"
      backgroundColor={colorMode === 'dark' ? 'gray.600' : 'green.200'}
      alignItems="center"
      paddingX={5}
    >
      <VStack>
        <Link as={RouterLink} to="/topics">
          <Text paddingX={10} fontSize="xl">
            Topics
          </Text>
        </Link>
        <Link as={RouterLink} to="/about">
          <Text paddingX={10} fontSize="xl">
            About
          </Text>
        </Link>
      </VStack>
      <Spacer />
      <Image
        width={125}
        src={`${process.env.PUBLIC_URL}/logo-${colorMode}.png`}
      />
    </Flex>
  )
}
