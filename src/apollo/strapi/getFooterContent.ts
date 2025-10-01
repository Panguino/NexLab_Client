'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getFooterContent = async () => {
	const getFooterContentResponse = await getClient().query({
		query: gql`
			query {
				footer {
					Group {
						Heading
						Links {
							text
							target
							url
						}
					}
				}
			}
		`,
	})

	return getFooterContentResponse.data.footer
}
