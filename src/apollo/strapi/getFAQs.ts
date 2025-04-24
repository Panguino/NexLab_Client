'use server'
import { getClient } from '@/apollo/apollo-client'
import { convertStrapiFAQsData } from '@/util/faqs'
import { gql } from '@apollo/client'

export const getFAQs = async () => {
	const getFAQsResponse = await getClient().query({
		query: gql`
			query {
				faqs(pagination: { limit: 1000 }) {
					data {
						id
						attributes {
							Question
							Answer
						}
					}
				}
			}
		`,
	})

	return convertStrapiFAQsData(getFAQsResponse.data.faqs.data)
}
