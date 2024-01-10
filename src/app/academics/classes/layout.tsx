'use client'
import { useEffect, useState } from 'react'

import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { getCourseCategories } from '@/apollo/getCourseCategories'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

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
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
