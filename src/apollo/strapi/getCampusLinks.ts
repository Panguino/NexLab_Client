'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const campusLinksResponse = await getClient().query({
		query: gql`
			query {
				menusMenu(id: "2") {
					data {
						attributes {
							title
							slug
							items(pagination: { limit: 1000 }) {
								data {
									id
									attributes {
										title
										url
										target
										parent {
											data {
												id
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`,
	})
	return campusLinksResponse.data.menusMenu.data.attributes.items.data
}
