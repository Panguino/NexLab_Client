'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_SATRAD_GROUPS, DEFAULT_SATRAD_PRODUCT, SATRAD_GROUPS, SATRAD_PRODUCTS } from '@/data/satrad/products'
import { DEFAULT_SATRAD_REGION } from '@/data/satrad/scaleRegions'
import { DEFAULT_SATRAD_SECTOR } from '@/data/satrad/sectorsContinental'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import styles from './SatradSidebarPanel.module.scss'

const SatradSidebarPanel = () => {
	const router = useRouter()
	// const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	// const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	// const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	// const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	// const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { satradProductId: productId, satradSectorId: sectorId, satradRegionId: regionId } = useParams()

	useEffect(() => {
		if (!SATRAD_PRODUCTS[productId as string]) {
			console.log('Invalid productId:', SATRAD_PRODUCTS[productId as string])
			router.push(`/weather-data/satellite-mosaic-radar/${DEFAULT_SATRAD_PRODUCT}/${DEFAULT_SATRAD_REGION}/${DEFAULT_SATRAD_SECTOR}`)
		}
	}, [productId, regionId, sectorId, router])

	const productsArray = Object.keys(SATRAD_PRODUCTS).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)) // Sort prevents the array from being reordered

	const transformData = (productsArray, allSatradGroups, satradGroups, satradProducts) => {
		if (!productsArray) return []
		const transformedData = allSatradGroups.map((groupId) => {
			const group = satradGroups[groupId]
			const products = productsArray
				.filter((productId) => group.products.includes(productId))
				.map((productId) => ({
					id: productId,
					label: satradProducts[productId].shortLabel,
				}))

			return {
				groupId,
				label: group.label,
				columns: group.columns,
				products,
			}
		})

		return transformedData
	}
	const panelGroupedProducts = transformData(productsArray, ALL_SATRAD_GROUPS, SATRAD_GROUPS, SATRAD_PRODUCTS)

	return (
		<ScrollArea>
			<SidebarPanelPad>
				<div className={styles.SatradSidebarPanel}>
					{panelGroupedProducts.map(({ groupId, label, columns, products }) => (
						<SidebarGroup key={groupId} title={label}>
							<SidebarGrid columns={columns}>
								{products.map(({ id, label }) => (
									<SidebarLink
										key={id}
										name={label}
										linkUrl={`/weather-data/satellite-mosaic-radar/${id}/${regionId}/${sectorId}`}
										active={id === productId}
									/>
								))}
							</SidebarGrid>
						</SidebarGroup>
					))}
				</div>
			</SidebarPanelPad>
		</ScrollArea>
	)
}

export default SatradSidebarPanel
