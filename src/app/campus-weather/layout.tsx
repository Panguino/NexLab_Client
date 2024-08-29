'use client'

import { getCampusLinks } from '@/apollo/strapi/getCampusLinks'
import { LinkAccordian } from '@/components/elements/LinkAccordian/LinkAccordian'
import { LinkAccordianItem } from '@/components/elements/LinkAccordian/LinkAccordianItem/LinkAccordianItem'
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
					<div style={{ padding: '10px 20px 30px 20px' }}>
						<LinkAccordian title="Important Essentials">
							{campusLinks.map((campusLink, index) => {
								const { title, url } = campusLink.attributes
								return <LinkAccordianItem key={index} link={url} name={title} />
							})}
						</LinkAccordian>
						<LinkAccordian title="Helpful Infromation">// build into strapi</LinkAccordian>
						<LinkAccordian title="Weather Safety">// build into strapi</LinkAccordian>
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
