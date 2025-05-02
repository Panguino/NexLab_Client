'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCourseCategories = async () => {
	const response = await getClient().query({
		query: gql`
			query getCourseCategories {
				courseCategories {
					documentId
					Name
					courses {
						documentId
						CourseID
					}
				}
			}
		`,
	})
	return response.data.courseCategories
}
