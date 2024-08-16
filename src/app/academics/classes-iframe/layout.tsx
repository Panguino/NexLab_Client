'use client'
import { useEffect, useState } from 'react'

import { getCourseCategories } from '@/apollo/strapi/getCourseCategories'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	const [courseCategories, setCourseCategories] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await getCourseCategories()
			setCourseCategories(res)
		}
		fetchData().catch(console.error)
	}, [])
	const css = `
		.Navigation, .SubNavigation, .NavigationSpacer, .SubNavigationSpacer {
			display:none;
		}
	`

	return (
		<SidebarWrapper>
			<style>{css}</style>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						{courseCategories.map((courseCategory, index) => {
							const { Name, courses } = courseCategory.attributes
							const coursesData = courses.data
							if (coursesData.length > 0) {
								return (
									<SidebarGroup key={index} title={Name}>
										{coursesData.map((course, index) => {
											const { CourseID } = course.attributes
											return (
												<SidebarLink
													key={index}
													linkUrl={`/academics/classes-iframe/${course.id}`}
													name={`Earth ${CourseID}`}
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
