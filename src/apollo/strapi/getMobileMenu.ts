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

	const items = resMenu.data.menusMenu.data.attributes.items.data.map((item) => {
		return {
			id: item.id,
			parentId: item.attributes.parent.data?.id || null,
			title: item.attributes.title,
			url: item.attributes.url,
			target: item.attributes.target,
		}
	})

	return items
}
