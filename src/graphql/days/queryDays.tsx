import { useQuery, useLazyQuery,gql, useApolloClient } from '@apollo/client'
import { useContext } from 'react'

export const GET_DAYS = gql`
query getDaysquery {
    gen3_species: pokemon_v2_pokemonspecies(where: {}, order_by: {id: asc}) {
        name
        id
    }
    generations: pokemon_v2_generation {
        name
        pokemon_species: pokemon_v2_pokemonspecies_aggregate {
            aggregate {
                count
            }
        }
    }
}`

const GetDays = () =>{

    const client = useApolloClient()
    
    getDays: async () => {
        const response = await client.query({
            query: GET_DAYS,
        })

        console.log(response)
        return response
    }

    
}

export default GetDays