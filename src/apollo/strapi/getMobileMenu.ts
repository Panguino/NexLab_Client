'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getMobileMenu = async () => {
	const resMenu = await getClient().query({
		query: gql`
			query {
				menusMenu(id: "1") {
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
	return resMenu.data.menusMenu.data.attributes.items.data
}
