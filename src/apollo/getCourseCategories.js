'use server'
import { gql } from '@apollo/client'
import { getClient } from '@/apollo/apollo-client'

export const getCourseCategories = async () => {
	const response = await getClient().query({
		query: gql`
			query {
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
		`
	})
	return response.data.courseCategories.data
}
