import { useState } from 'react'
import { Center, Heading, Text, VStack } from '@chakra-ui/react'
import HookForm from '../components/SearchForm'
import Results from '../components/Results'

export default function Home() {
  const [data, setData] = useState([] as any[])
  return (
    <Center>
      <VStack px={[5, 25, 50]}>
        <Heading pb={25} size="2xl">
          Home
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <HookForm setData={setData} />
        <Results data={data} />
      </VStack>
    </Center>
  )
}
