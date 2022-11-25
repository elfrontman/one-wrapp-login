import { useQuery, gql } from '@apollo/client'


const GET_LOCATIONS = gql`
  query GetLocations{
    latestReviews{
      id,
      comment
      rating
    }
  }
`

const DisplayLocations: React.FC = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS)

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    console.log(data.latestReviews)

    return data.latestReviews.map(({id, comment, rating} : any) => (
      <div key={id}>
         <h3>{rating}</h3>
         {/*<img width="400" height="250" alt="location-reference" src={`${photo}`} />*/}
          <br />
          <b>About this location:</b>
          <p>{comment}</p>
          <br />
      </div>
    ))
}

export default DisplayLocations;