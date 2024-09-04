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
	const essentialLinks = campusLinks[0]
	const helpfulLinks = campusLinks[1]
	const safetyLinks = campusLinks[2]
	useEffect(() => {
		const fetchData = async () => {
			const res = await getCampusLinks()
			setCampusLinks(res)
		}
		fetchData().catch(console.error)
	}, [])
	console.log(essentialLinks, helpfulLinks, safetyLinks)
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						<LinkAccordian title="Important Essentials">
							{essentialLinks.map((campusLink, index) => {
								const { title, url } = campusLink.attributes
								return <LinkAccordianItem key={index} link={url} name={title} />
							})}
						</LinkAccordian>
						<LinkAccordian title="Helpful Information">
							{helpfulLinks.map((campusLink, index) => {
								const { title, url } = campusLink.attributes
								return <LinkAccordianItem key={index} link={url} name={title} />
							})}
						</LinkAccordian>
						<LinkAccordian title="Weather Safety">
							{safetyLinks.map((campusLink, index) => {
								const { title, url } = campusLink.attributes
								return <LinkAccordianItem key={index} link={url} name={title} />
							})}
						</LinkAccordian>
					</div>
				</ScrollArea>
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
