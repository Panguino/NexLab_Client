'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SPACE_TEXT_PRODUCT_IDS, SPACE_TEXT_PRODUCTS } from '@/data/text/space/products'
import { getSpaceTextProducts } from '@/util/dataCalls/text/query-space'

interface SpacePanelProps {
	basepath: string
}

interface SpaceProductEntry {
	location: string
	office: string
	title: string
	url: string
}

interface SpaceProductCategory {
	[productKey: string]: SpaceProductEntry
}

interface SpaceData {
	[productTypeId: string]: SpaceProductCategory
}

const SpacePanel = ({ basepath }: SpacePanelProps) => {
	const { spaceOfficeId, spaceProdId } = useParams()
	const [spaceData, setSpaceData] = useState<SpaceData | null>(null)

	// Full path to Space section
	const spaceBasePath = `${basepath}/swpc-space-weather`

	// Fetch space products on mount
	useEffect(() => {
		const fetchSpaceProducts = async () => {
			try {
				const data = await getSpaceTextProducts()
				setSpaceData(data)
			} catch (error) {
				console.error('Failed to fetch space products:', error)
				setSpaceData(null)
			}
		}

		fetchSpaceProducts()
	}, [])

	return (
		<>
			<SidebarSectionHeader name="Space" linkUrl={basepath} />
			{SPACE_TEXT_PRODUCT_IDS.map((productId) => {
				const productCategory = spaceData?.[productId]
				return (
					<SidebarGroup key={productId} title={SPACE_TEXT_PRODUCTS[productId].name}>
						<SidebarGrid columns={2}>
							{productCategory ? (
								Object.entries(productCategory)
									.sort(([, a], [, b]) => a.location.localeCompare(b.location))
									.map(([productKey, entry]) => (
										<SidebarLink
											key={productKey}
											name={`${entry.location} - (${entry.office})`}
											linkUrl={`${spaceBasePath}/${entry.office}/${productKey}/latest`}
											active={spaceOfficeId === entry.office && spaceProdId === productKey}
										/>
									))
							) : (
								<SidebarLink name="Loading..." linkUrl="" />
							)}
						</SidebarGrid>
					</SidebarGroup>
				)
			})}
		</>
	)
}

export default SpacePanel
