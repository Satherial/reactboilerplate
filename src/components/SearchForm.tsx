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
import { ErrorMessage } from '@hookform/error-message'
import { FiX } from 'react-icons/fi'
import { get, URLS } from '../services/calls'

export default function SearchForm({
  setData,
}: {
  setData: (data: any[]) => void
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm()

  async function onSubmit(values: any) {
    const response = await get({
      url: `${process.env.REACT_APP_DOMAIN}${URLS.SEARCH}${values?.digit}`,
      errorCallback: alert,
    })

    const { drinks } = response?.data || {}

    setData(drinks || [])
  }

  function resetAndSubmit() {
    setValue('digit', null)
    clearErrors()
    onSubmit({ digit: null })
  }

  const digitError = errors && errors['digit'] != null

  return (
    <form onSubmit={handleSubmit(onSubmit as (values: any) => void)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="digit">
          Search cocktail by the first letter
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="digit"
            focusBorderColor={digitError ? 'red.400' : ''}
            errorBorderColor="red.300"
            placeholder="First Cocktail Letter"
            {...register('digit', {
              required: 'This is required',
              maxLength: { value: 1, message: 'Max length is 1' },
            })}
            isInvalid={digitError}
          />

          <InputRightElement width="3rem">
            <IconButton
              h="1.75rem"
              size="sm"
              aria-label="Delete"
              onClick={resetAndSubmit}
              variant="ghost"
              icon={<FiX />}
            />
          </InputRightElement>
        </InputGroup>
        <ErrorMessage
          errors={errors}
          name="digit"
          render={({ message }: { message: string }) => (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}
