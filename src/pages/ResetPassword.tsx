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
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { ErrorMessage } from '@hookform/error-message'
import { post, URLS } from '../services/calls'
import { useState } from 'react'

export default function ResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    setFocus,
  } = useForm()

  const location = useLocation()
  const [success, setSuccess] = useState<null | boolean>(null)
  const [resetPasswordError, setResetPasswordError] = useState<null | string>(
    null,
  )

  async function onSubmit(values: any) {
    setResetPasswordError(null)

    const searchAsObject = Object.fromEntries(
      new URLSearchParams(location?.search || ''),
    )

    if (!searchAsObject?.token) {
      alert('Token query param missing')
      return
    }

    if (values?.password !== values?.checkpassword) {
      setResetPasswordError('Passwords are different')
      return
    }

    const response = await post({
      url: `${process.env.REACT_APP_AUTH_DOMAIN}${URLS.RESET_PASSWORD}?token=${searchAsObject.token}`,
      body: {
        password: values?.password,
      },
      errorCallback: setResetPasswordError,
    })

    if (response?.status === 204) {
      reset('password')
      reset('checkpassword')
      setSuccess(true)
    }
  }

  function reset(value: string) {
    setValue(value, null)
    clearErrors(value)
    setFocus(value)
  }

  const passwordError = errors && errors['password'] != null
  const checkPasswordError = errors && errors['checkpassword'] != null

  return (
    <Center>
      <VStack mt="16">
        {success === true && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Now you can login with the new credentials
            </AlertDescription>
          </Alert>
        )}
        <Heading size="lg">Reset password</Heading>
        <form onSubmit={handleSubmit(onSubmit as (values: any) => void)}>
          <FormControl isInvalid={errors.name} mt="3">
            <FormLabel htmlFor="password">Write the new password</FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                focusBorderColor={passwordError ? 'red.400' : ''}
                errorBorderColor="red.300"
                placeholder="Enter your passwrod"
                {...register('password', {
                  required: 'This is required',
                  minLength: { value: 8, message: 'Min length is 8' },
                })}
                isInvalid={passwordError}
                type="password"
              />

              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  aria-label="Delete"
                  onClick={() => reset('password')}
                  variant="ghost"
                  icon={<FiX />}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }: { message: string }) => (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            />
          </FormControl>

          <FormControl isInvalid={errors.name} mt="3">
            <FormLabel htmlFor="checkpassword">
              Write again the new password
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="checkpassword"
                focusBorderColor={checkPasswordError ? 'red.400' : ''}
                errorBorderColor="red.300"
                placeholder="Enter again your passwrod"
                {...register('checkpassword', {
                  required: 'This is required',
                  minLength: { value: 8, message: 'Min length is 8' },
                })}
                isInvalid={checkPasswordError}
                type="password"
              />

              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  aria-label="Delete"
                  onClick={() => reset('checkpassword')}
                  variant="ghost"
                  icon={<FiX />}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="checkpassword"
              render={({ message }: { message: string }) => (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            />
          </FormControl>
          {resetPasswordError && (
            <Alert status="error" mt="5">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{resetPasswordError}</AlertDescription>
            </Alert>
          )}
          <Button
            mt="5"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Send
          </Button>
        </form>
      </VStack>
    </Center>
  )
}
