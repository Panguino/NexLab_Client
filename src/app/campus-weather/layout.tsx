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
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>sidebar</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
