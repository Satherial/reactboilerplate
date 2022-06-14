import { SimpleGrid, Text, Center } from '@chakra-ui/react'
import Card from './Card'

export default function Results(props: { data: any[] }) {
  const { data } = props || {}
  return (
    <Center>
      {(!data || (data && data.length === 0)) && (
        <Text>Please insert a letter to start the cocktail search</Text>
      )}
      {data && data.length > 0 && (
        <SimpleGrid columns={[1, 2]} spacing={10}>
          {data.map((ctl, index) => {
            const ingredients = Object.keys(ctl)
              .filter((k) => k.includes('strIngredient'))
              .map((k) => ctl[k] || null)
              .filter((i) => i != null)

            return (
              <Card
                key={index}
                summary={ctl.strInstructions}
                longLine={ingredients.join(', ')}
                product={ctl.strDrink}
                imageUrl={ctl.strDrinkThumb}
              />
            )
          })}
        </SimpleGrid>
      )}
    </Center>
  )
}
