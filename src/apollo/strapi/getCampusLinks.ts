'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const essentialsResponse = await getClient().query({
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
	const helpfulResponse = await getClient().query({
		query: gql`
			query {
				menusMenu(id: "3") {
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
	const safetyResponse = await getClient().query({
		query: gql`
			query {
				menusMenu(id: "4") {
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
	return [
		essentialsResponse.data.menusMenu.data.attributes.items.data,
		helpfulResponse.data.menusMenu.data.attributes.items.data,
		safetyResponse.data.menusMenu.data.attributes.items.data,
	]
}
