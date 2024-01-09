import { gql } from '@apollo/client'
import { getClient } from '@/apollo/apollo-client'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import Link from 'next/link'

export default async function asyncLayout({ children }) {
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
	const courseCategories = response.data.courseCategories.data

	return (
		<SidebarWrapper>
			<SidebarNavigation>
				{courseCategories.map((courseCategory, index) => {
					const { Name, courses } = courseCategory.attributes
					const coursesData = courses.data
					// only return category if it has courses inside it
					if (coursesData.length > 0) {
						return (
							<div key={index}>
								<div>{Name}</div>
								{coursesData.map((course, index) => {
									const { CourseID } = course.attributes
									return (
										<Link key={index} href={`/academics/classes/${course.id}`}>
											<div>Earth {CourseID}</div>
										</Link>
									)
								})}
							</div>
						)
					}
				})}
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
