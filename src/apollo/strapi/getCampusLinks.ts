'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const campusLinkResponse = await getClient().query({
		query: gql`
			query {
				menusMenu(id: "2") {
					data {
						attributes {
							title
							slug
							items {
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
	return campusLinkResponse.data.menusMenu.data.attributes.items.data
}
