'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getStaff = async () => {
	const getStaffResponse = await getClient().query({
		query: gql`
			query {
				staffMembers {
					Name
					Photo {
						url
					}
					Position
					ShortBio
					documentId
				}
			}
		`,
	})
	return getStaffResponse.data.staffMembers
}
