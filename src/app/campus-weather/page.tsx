import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

const Page = async () => {
	const response = await getClient().query({
		query: gql`
			query {
				campuses {
					data {
						id
						attributes {
							Name
							Latitude
							Longitude
							Logo {
								data {
									id
									attributes {
										url
									}
								}
							}
							uniqueWeatherConditions
						}
					}
				}
			}
		`,
	})
	console.log(response.data.campuses.data)
	const campuses = response.data.campuses.data
	return (
		<div>
			{campuses.map((campus) => (
				<div key={campus.id}>
					<h2>{campus.attributes.Name}</h2>
					<img src={campus.attributes.Logo.data.attributes.url} alt={campus.attributes.Name} />
					<p>Lat: {campus.attributes.Latitude}</p>
					<p>Lon: {campus.attributes.Longitude}</p>
				</div>
			))}
		</div>
	)
}

export default Page
