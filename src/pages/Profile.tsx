import { Center, Heading, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import { ErrorMessage } from '@hookform/error-message'
import { patch, URLS } from '../services/calls'
import { useAuth } from '../hooks'
import { useState } from 'react'

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    setFocus,
  } = useForm()
  const { user, setUser, token, setRefreshToken, setToken, refreshToken } =
    useAuth()
  const [updateError, setUpdateError] = useState<null | string>(null)

  async function onSubmit(values: any) {
    setUpdateError(null)
    const response = await patch({
      url: `${process.env.REACT_APP_AUTH_DOMAIN}${URLS.USERS}`,
      id: user.id,
      body: {
        name: values?.name,
      },
      errorCallback: setUpdateError,
      context: {
        setRefreshToken,
        setToken,
        setUser,
        token,
        refreshToken,
      },
      isAuthenticated: true,
    })

    if (response) {
      setUser(response?.data)
    }
  }

  function reset(value: string) {
    setValue(value, null)
    clearErrors(value)
    setFocus(value)
  }

  const nameError = errors && errors['name'] != null

  return (
    <Center>
      <VStack mt="16">
        <Text>Your current name is {user.name}</Text>
        <Heading size="lg">Change your name</Heading>
        <form onSubmit={handleSubmit(onSubmit as (values: any) => void)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputGroup size="md">
              <Input
                id="name"
                focusBorderColor={nameError ? 'red.400' : ''}
                errorBorderColor="red.300"
                placeholder="Enter your name"
                {...register('name', {
                  required: 'This is required',
                })}
                isInvalid={nameError}
                type="text"
                w="80"
              />

              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  aria-label="Delete"
                  onClick={() => reset('name')}
                  variant="ghost"
                  icon={<FiX />}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }: { message: string }) => (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            />
          </FormControl>
          {updateError && (
            <Alert status="error" mt="5">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{updateError}</AlertDescription>
            </Alert>
          )}
          <Button
            mt="5"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </form>
      </VStack>
    </Center>
  )
}
