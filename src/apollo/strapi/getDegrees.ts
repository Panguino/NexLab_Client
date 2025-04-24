'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getDegrees = async () => {
	const getDegreesResponse = await getClient().query({
		query: gql`
			query getDegrees {
				degrees {
					data {
						id
						attributes {
							Title
							Description
							Buttons {
								Label
								Link
								Style
							}
							Schools {
								SchoolList
								SchoolLinks {
									School
									Link
								}
							}
						}
					}
				}
			}
		`,
	})
	return getDegreesResponse.data.degrees.data
}
