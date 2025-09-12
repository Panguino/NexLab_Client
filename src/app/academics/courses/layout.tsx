'use client'
import { getCourseCategories } from '@/apollo/strapi/getCourseCategories'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
	const [courseCategories, setCourseCategories] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await getCourseCategories()
			setCourseCategories(res)
		}
		fetchData().catch(console.error)
	}, [])

	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						{courseCategories.map((courseCategory, index) => {
							const { Name, courses } = courseCategory
							console.log('courses', courses)
							// only return category if it has courses inside it
							if (courses.length > 0) {
								return (
									<SidebarGroup key={index} title={Name}>
										{courses.map(({ CourseID, documentId, Title }, index) => {
											return (
												<SidebarLink
													key={index}
													linkUrl={`/academics/courses/${documentId}`}
													name={`E${CourseID} | ${Title}`}
												/>
											)
										})}
									</SidebarGroup>
								)
							}
							return null
						})}
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
