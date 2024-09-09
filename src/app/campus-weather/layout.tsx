'use client'

import { getCampusLinks } from '@/apollo/strapi/getCampusLinks'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
	const [campusLinks, setCampusLinks] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const res = await getCampusLinks()
			setCampusLinks(res)
		}
		fetchData().catch(console.error)
	}, [])

	const [menuId] = useState(null)

	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						{campusLinks
							.filter((item) => item.attributes.parent.data?.id === menuId || item.attributes.parent.data === menuId)
							.map((item) => {
								return (
									<SidebarGroup title={item.attributes.title} key={item.id}>
										{campusLinks
											.filter((childItem) => childItem.attributes.parent.data?.id === item.id)
											.map((childItem) => (
												<SidebarLink
													key={childItem.id}
													name={childItem.attributes.title}
													linkUrl={childItem.attributes.url}
													target={childItem.attributes.target}
												/>
											))}
									</SidebarGroup>
								)
							})}
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
