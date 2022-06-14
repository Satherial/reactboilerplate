import { Center, Heading, VStack, Link } from '@chakra-ui/react'
import { useNavigate, useLocation, Link as ReactLink } from 'react-router-dom'
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
import { useAuth } from '../hooks'
import { useState } from 'react'
import { login } from '../services/auth'

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    setFocus,
  } = useForm()
  const { setToken, setRefreshToken, setUser } = useAuth()
  const [loginError, setLoginError] = useState<null | string>(null)
  const location = useLocation()
  const from = (location as any).state?.from?.pathname || '/'
  const navigate = useNavigate()

  async function onSubmit(values: any) {
    setLoginError(null)
    const response = await post({
      url: `${process.env.REACT_APP_AUTH_DOMAIN}${URLS.LOGIN}`,
      body: {
        email: values?.email,
        password: values?.password,
      },
      errorCallback: setLoginError,
    })

    if (response) {
      const { user, tokens } = response.data || {}
      login({
        setToken,
        setRefreshToken,
        setUser,
        user,
        tokens,
      })

      navigate(from, { replace: true })
    }
  }

  function reset(value: string) {
    setValue(value, null)
    clearErrors(value)
    setFocus(value)
  }

  const emailError = errors && errors['email'] != null
  const passwordError = errors && errors['password'] != null

  return (
    <Center>
      <VStack mt="16">
        <Heading size="lg">Sign in</Heading>
        <form onSubmit={handleSubmit(onSubmit as (values: any) => void)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="email">Email</FormLabel>
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
          <FormControl isInvalid={errors.name} mt="3">
            <FormLabel htmlFor="password">Password</FormLabel>
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
          {loginError && (
            <Alert status="error" mt="5">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <Button
            w="100%"
            mt="5"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Login
          </Button>
        </form>

        <Link color="orange" as={ReactLink} to="/forgot-password">
          Forgot your password?
        </Link>
      </VStack>
    </Center>
  )
}
