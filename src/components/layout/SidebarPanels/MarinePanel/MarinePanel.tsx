'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { MARINE_TEXT_PRODUCT_IDS, MARINE_TEXT_PRODUCTS } from '@/data/text/marine/products'
import { getMarineTextProducts } from '@/util/dataCalls/text/query-marine'

interface MarinePanelProps {
	basepath: string
}

interface MarineProductEntry {
	location: string
	office: string
	title: string
	url: string
}

interface MarineProductCategory {
	[productKey: string]: MarineProductEntry
}

interface MarineData {
	[productTypeId: string]: MarineProductCategory
}

const MarinePanel = ({ basepath }: MarinePanelProps) => {
	const { marineOfficeId, marineProdId } = useParams()
	const [marineData, setMarineData] = useState<MarineData | null>(null)

	// Full path to Marine section
	const marineBasePath = `${basepath}/marine-opc-nhc`

	// Fetch marine products on mount
	useEffect(() => {
		const fetchMarineProducts = async () => {
			try {
				const data = await getMarineTextProducts()
				setMarineData(data)
			} catch (error) {
				console.error('Failed to fetch marine products:', error)
				setMarineData(null)
			}
		}

		fetchMarineProducts()
	}, [])

	return (
		<>
			<SidebarSectionHeader name="Marine" linkUrl={basepath} />
			<SidebarGroup title="Hazards">
				<SidebarLink name="Marine Hazards Map & Table" linkUrl={`${marineBasePath}/hazards`} />
			</SidebarGroup>
			{MARINE_TEXT_PRODUCT_IDS.map((productId) => {
				const productCategory = marineData?.[productId]
				return (
					<SidebarGroup key={productId} title={MARINE_TEXT_PRODUCTS[productId].name}>
						<SidebarGrid columns={2}>
							{productCategory ? (
								Object.entries(productCategory)
									.sort(([, a], [, b]) => a.location.localeCompare(b.location))
									.map(([productKey, entry]) => (
										<SidebarLink
											key={productKey}
											name={`${entry.location} - (${entry.office})`}
											linkUrl={`${marineBasePath}/${entry.office}/${productKey}/latest`}
											active={marineOfficeId === entry.office && marineProdId === productKey}
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

export default MarinePanel
