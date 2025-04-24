'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCourseCategories = async () => {
	const response = await getClient().query({
		query: gql`
			query getCourseCategories {
				courseCategories {
					data {
						id
						attributes {
							Name
							courses {
								data {
									id
									attributes {
										CourseID
									}
								}
							}
						}
					}
				}
			}
		`,
	})
	return response.data.courseCategories.data
}
