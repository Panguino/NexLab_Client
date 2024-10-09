'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getFAQOverview = async () => {
	const getFAQOverviewResponse = await getClient().query({
		query: gql`
			query {
				faqOverview {
					data {
						attributes {
							Title
							Body
						}
					}
				}
			}
		`,
	})

	return getFAQOverviewResponse.data.faqOverview.data
}
