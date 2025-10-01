'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const campusLinksResponse = await getClient().query({
		query: gql`
			query {
				campusweatherLink {
					LinkGroup {
						id
						Heading
						Links {
							id
							target
							text
							url
						}
					}
				}
			}
		`,
	})
	console.log(campusLinksResponse)
	return campusLinksResponse.data.campusweatherLink.LinkGroup
}
