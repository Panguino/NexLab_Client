'use client'

import { getCampusLinks } from '@/apollo/strapi/getCampusLinks'
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
	console.log(campusLinks)

	const [menuId, setMenuId] = useState(null)

	const ifMenuItemHasChildren = (menuItemId) => {
		return campusLinks.some((campusLink) => campusLink.attributes.parent.data?.id === menuItemId)
	}
	// const getParentIdByChildMenuId = (childMenuId) => {
	// 	return campusLinks.find((campusLink) => campusLink.id === childMenuId).attributes.parent.data?.id || null
	// }
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						{campusLinks
							.filter((item) => item.attributes.parent.data?.id === menuId || item.attributes.parent.data === menuId)
							.map((item) => {
								return (
									<div
										key={item.id}
										onClick={() => {
											// I know i dont need this but it works
											// need to output links right away and start using SidebarGroup/Link
											if (ifMenuItemHasChildren(item.id)) {
												setMenuId(item.id)
											}
										}}
									>
										{item.attributes.title} - {item.attributes.url} ---- {ifMenuItemHasChildren(item.id) && 'has children'}
									</div>
								)
							})}
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
