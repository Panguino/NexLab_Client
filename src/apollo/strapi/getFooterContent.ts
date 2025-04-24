'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getFooterContent = async () => {
	const getFooterContentResponse = await getClient().query({
		query: gql`
			query {
				footer {
					data {
						attributes {
							Group {
								Heading
								Links {
									text
									url
									target
								}
							}
						}
					}
				}
			}
		`,
	})

	return getFooterContentResponse.data.footer.data.attributes
}
