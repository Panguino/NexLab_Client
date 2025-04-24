import { getCampusLinks } from '@/apollo/strapi/getCampusLinks'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default async function Layout({ children }) {
	const campusLinks = await getCampusLinks()

	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ScrollArea>
					<div style={{ padding: '10px 20px 30px 20px' }}>
						{campusLinks.map(({ id, Heading, Links }) => {
							return (
								<SidebarGroup title={Heading} styleType="dot" key={id}>
									{Links.map(({ id, text, url, target }) => (
										<SidebarLink key={id} name={text} linkUrl={url} target={target} />
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
