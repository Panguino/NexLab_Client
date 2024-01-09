import { gql } from '@apollo/client'
import { getClient } from '@/apollo/apollo-client'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'

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
							<SidebarGroup key={index} title={Name}>
								{coursesData.map((course, index) => {
									const { CourseID } = course.attributes
									return <SidebarLink key={index} linkUrl={`/academics/classes/${course.id}`} name={`Earth ${CourseID}`} />
								})}
							</SidebarGroup>
						)
					}
				})}
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
