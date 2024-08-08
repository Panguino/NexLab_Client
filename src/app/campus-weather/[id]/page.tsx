import { gql } from '@apollo/client'

import { getClient } from '@/apollo/apollo-client'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = async ({ params }) => {
	const response = await getClient().query({
		query: gql`
			query {
				campus(id: ${params.id}) {
					data {
						id
						attributes {							
							Name
							Latitude
							Longitude
							Logo {
								data {
									attributes {
										url
									}
								}
							}
						}
					}
				}
			}
		`
	})
	console.log({ response })
	// return <>Campus {params.id}</>
	const { Name, Latitude, Longitude } = response.data.campus.data.attributes
	return (
		<PageContentWrapper>
			{Name}, {Latitude}, {Longitude}
		</PageContentWrapper>
	)
}

export default Page
