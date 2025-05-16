'use client'

import { Button } from '@/components/elements/Button/Button'
import SelectGrouped from '@/components/elements/SelectGrouped/SelectGrouped'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_SATRAD_GROUPS, DEFAULT_SATRAD_PRODUCT, SATRAD_GROUPS, SATRAD_PRODUCTS } from '@/data/satrad/products'
import { DEFAULT_SATRAD_REGION, SATRAD_MAP_OPTIONS, SATRAD_SCALE_REGIONS } from '@/data/satrad/scaleRegions'
import { ALL_SATRAD_SECTORS } from '@/data/satrad/sectors'
import { DEFAULT_SATRAD_SECTOR } from '@/data/satrad/sectorsContinental'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import styles from './SatradSidebarPanel.module.scss'

const SatradSidebarPanel = () => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { satradProductId: productId, satradSectorId: sectorId, satradRegionId: regionId } = useParams()

	useEffect(() => {
		if (!SATRAD_PRODUCTS[productId as string] || !SATRAD_SCALE_REGIONS[regionId as string] || !ALL_SATRAD_SECTORS[sectorId as string]) {
			console.log('Invalid productId:', SATRAD_PRODUCTS[productId as string])
			console.log('Invalid regionId:', SATRAD_SCALE_REGIONS[regionId as string])
			console.log('Invalid sectorId:', ALL_SATRAD_SECTORS[sectorId as string])
			router.push(`/weather-data/satellite-mosaic-radar/${DEFAULT_SATRAD_PRODUCT}/${DEFAULT_SATRAD_REGION}/${DEFAULT_SATRAD_SECTOR}`)
		}
	}, [productId, regionId, sectorId, router])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/satellite-mosaic-radar/${productId}/${newRegionId}/${sectorId}`)
		openSectorSelectorPanel()
	}

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/satellite-mosaic-radar/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		if (!regionId) return
		const region = SATRAD_SCALE_REGIONS[regionId as string].region
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = SATRAD_SCALE_REGIONS[regionId as string].sectors.map((sectorId) => ({
			id: sectorId,
			name: ALL_SATRAD_SECTORS[sectorId].name,
			type: ALL_SATRAD_SECTORS[sectorId].type,
			coordinates: ALL_SATRAD_SECTORS[sectorId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const productsArray =
		sectorId !== undefined
			? Object.keys(ALL_SATRAD_SECTORS[sectorId as string].products).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
			: false

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
					<div className={styles.options}>
						<SelectGrouped
							onChange={handleRegionChange}
							value={regionId as string}
							options={SATRAD_MAP_OPTIONS}
							placeholder="Select Region"
						/>
						<Button onClick={openSectorSelectorPanel} label={`Sector: ${ALL_SATRAD_SECTORS[sectorId as string]?.name}`} />
					</div>
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
