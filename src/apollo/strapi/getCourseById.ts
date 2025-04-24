'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCourseById = async (id: string) => {
	const courseResponse = await getClient().query({
		query: gql`
			query getCourseById{
				course(id: ${id}) {
					data {
						id
						attributes {							
							Title
							CourseID
							Description
							MaterialGroup {
								id
								Name
								Materials {
									id
									Name
									Link
									File {
										data {
											attributes {
												url
												size
												ext
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
	return courseResponse.data.course.data.attributes
}
