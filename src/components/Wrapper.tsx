import { Box, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Footer from './Footer'
import GloabalAlert from './GlobalAlert'
import Header from './Header'

export default function Wrapper(props: {
  children: JSX.Element | JSX.Element[]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [alertText, setAlertText] = useState('')

  useEffect(() => {
    window.alert = (text: string) => {
      setAlertText(text)
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <GloabalAlert text={alertText} isOpen={isOpen} onClose={onClose} />
      <Header />
      <Box as="main" padding={25}>
        {props.children}
      </Box>
      <Footer />
    </>
  )
}
