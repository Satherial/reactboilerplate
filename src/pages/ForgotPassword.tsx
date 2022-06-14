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
import { FiX } from 'react-icons/fi'
import isEmail from 'validator/lib/isEmail'
import { ErrorMessage } from '@hookform/error-message'
import { post, URLS } from '../services/calls'
import { useState } from 'react'

export default function ForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    setFocus,
  } = useForm()
  const [forgotPasswordError, setForgotPasswordError] = useState<null | string>(
    null,
  )
  const [success, setSuccess] = useState<null | boolean>(null)

  async function onSubmit(values: any) {
    setForgotPasswordError(null)
    const response = await post({
      url: `${process.env.REACT_APP_AUTH_DOMAIN}${URLS.FORGOT_PASSWORD}`,
      body: {
        email: values?.email,
      },
      errorCallback: setForgotPasswordError,
    })

    if (response?.status === 204) {
      reset('email')
      setSuccess(true)
    }
  }

  function reset(value: string) {
    setValue(value, null)
    clearErrors(value)
    setFocus(value)
    setSuccess(null)
  }

  const emailError = errors && errors['email'] != null

  return (
    <Center>
      <VStack mt="16">
        {success === true && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Please check you email to reset your password
            </AlertDescription>
          </Alert>
        )}
        <Heading size="lg">Forgot Password</Heading>
        <form onSubmit={handleSubmit(onSubmit as (values: any) => void)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="email">
              Please insert your account's email
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="email"
                focusBorderColor={emailError ? 'red.400' : ''}
                errorBorderColor="red.300"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'This is required',
                  validate: (value) => {
                    return isEmail(value)
                  },
                })}
                isInvalid={emailError}
                type="email"
              />

              <InputRightElement width="3rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  aria-label="Delete"
                  onClick={() => reset('email')}
                  variant="ghost"
                  icon={<FiX />}
                />
              </InputRightElement>
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }: { message: string }) => (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            />
          </FormControl>
          {forgotPasswordError && (
            <Alert status="error" mt="5">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{forgotPasswordError}</AlertDescription>
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
