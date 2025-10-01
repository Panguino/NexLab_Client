'use server'
import { getDataClient } from '@/apollo/apollo-client'
import { GetRegionShapesQuery } from '@/gql/generated/graphql'
import { gql } from '@apollo/client'

export const getRegionShapes = async (): Promise<GetRegionShapesQuery> => {
	const getRegionsResponse = await getDataClient().query({
		query: gql`
			query getRegionShapes {
				getRegions(
					regions: [
						CANADA
						PANAMA
						MEXICO
						CUBA
						GUATEMALA
						BELIZE
						HONDURAS
						EL_SALVADOR
						DOMINICAN_REPUBLIC
						HAITI
						JAMAICA
						BAHAMAS
						NICARAGUA
						COSTA_RICA
					]
				) {
					name
					states {
						type
						geometry
					}
				}
			}
		`,
	})
	return getRegionsResponse.data as GetRegionShapesQuery
}
