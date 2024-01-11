import { gql } from '@apollo/client'

import { getClient } from '@/apollo/apollo-client'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'
import { ClassInfo } from '@/components/blocks/ClassInfo/ClassInfo'

const Page = async ({ params }) => {
	const response = await getClient().query({
		query: gql`
			query {
				course(id: ${params.id}) {
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
		`
	})
	//console.log('res', response.data.course.data.attributes)
	const { Title, CourseID, Description, MaterialGroup } = response.data.course.data.attributes
	return (
		<PageContentWrapper>
			<ClassInfo Title={Title} CourseID={CourseID} Description={Description} MaterialGroup={MaterialGroup} />
		</PageContentWrapper>
	)
}

export default Page
