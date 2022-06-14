import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './hooks'
import Routing from './Routing'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Routing />
      </ChakraProvider>
    </AuthProvider>
  )
}
