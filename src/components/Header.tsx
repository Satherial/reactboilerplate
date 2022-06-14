import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Text,
  Flex,
  Image,
  Spacer,
  Center,
  useColorMode,
  Button,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../themes/colorModeSwitcher'
import { useAuth } from '../hooks'
import { logout } from '../services/auth'

export default function Header() {
  const { colorMode } = useColorMode()
  const { token, setToken, refreshToken, setUser, user } = useAuth()

  return (
    <Flex
      as="header"
      backgroundColor={colorMode === 'dark' ? 'gray.600' : 'green.200'}
      alignItems="center"
      paddingX={5}
    >
      <Link as={RouterLink} to="/">
        <Image
          width={75}
          src={`${process.env.PUBLIC_URL}/logo-${colorMode}.png`}
        />
      </Link>
      <Spacer />
      <ColorModeSwitcher />
      <Center>
        {token && (
          <Link as={RouterLink} to="/profile">
            <Text paddingX={10} fontSize="xl">
              Profile
            </Text>
          </Link>
        )}
        {token && (
          <Button
            onClick={() =>
              logout({
                setToken,
                setUser,
                refreshToken,
              })
            }
          >
            Logout ({user?.name || 'missing-name'})
          </Button>
        )}
      </Center>
    </Flex>
  )
}
