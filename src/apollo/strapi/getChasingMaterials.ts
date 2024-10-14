'use server'
import { getClient } from '@/apollo/apollo-client'
import { convertStrapiChasingMaterialsData } from '@/util/stormChasing'
import { gql } from '@apollo/client'

export const getChasingMaterials = async () => {
	const getChasingMaterialsResponse = await getClient().query({
		query: gql`
			query {
				stormChasingMaterialsPage {
					data {
						attributes {
							Title
							body
							leftGroupTitle
							leftGroupMaterials {
								id
								Name
								Materials {
									id
									Name
									File {
										data {
											attributes {
												url
											}
										}
									}
									Link
								}
							}
							rightGroupTitle
							rightGroupMaterials {
								id
								Name
								Materials {
									id
									Name
									File {
										data {
											attributes {
												url
											}
										}
									}
									Link
								}
							}
						}
					}
				}
			}
		`,
	})

	return convertStrapiChasingMaterialsData(getChasingMaterialsResponse.data.stormChasingMaterialsPage.data)
}
