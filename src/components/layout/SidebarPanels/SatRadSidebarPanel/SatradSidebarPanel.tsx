'use client'

import SelectGrouped from '@/components/elements/SelectGrouped/SelectGrouped'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_SATRAD_GROUPS, DEFAULT_SATRAD_PRODUCT, SATRAD_GROUPS, SATRAD_PRODUCTS } from '@/data/satrad/products'
import {
	DEFAULT_SATRAD_REGION,
	SATRAD_REGION_ALASKA_ID,
	SATRAD_REGION_GOES_EAST_ID,
	SATRAD_REGION_GOES_WEST_ID,
	SATRAD_REGION_HAWAII_ID,
	SATRAD_REGION_NAMER_ID,
	SATRAD_REGIONS,
	SATRAD_SCALE_REGION_CONTINENTAL_EAST_ID,
	SATRAD_SCALE_REGION_CONTINENTAL_WEST_ID,
	SATRAD_SCALE_REGION_GLOBAL_EAST_ID,
	SATRAD_SCALE_REGION_GLOBAL_WEST_ID,
	SATRAD_SCALE_REGION_LOCAL_ALASKA_ID,
	SATRAD_SCALE_REGION_LOCAL_HAWAII_ID,
	SATRAD_SCALE_REGION_LOCAL_NAMER_ID,
	SATRAD_SCALE_REGION_REGIONAL_ALASKA_ID,
	SATRAD_SCALE_REGION_REGIONAL_HAWAII_ID,
	SATRAD_SCALE_REGION_REGIONAL_NAMER_ID,
	SATRAD_SCALE_REGION_SUBREGIONAL_ALASKA_ID,
	SATRAD_SCALE_REGION_SUBREGIONAL_HAWAII_ID,
	SATRAD_SCALE_REGION_SUBREGIONAL_NAMER_ID,
	SATRAD_SCALE_REGIONS,
} from '@/data/satrad/scaleRegions'
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
	const handleRegionChange = (newRegionId) => {
		console.log('newRegionId', newRegionId)
		router.push(`/weather-data/satellite-mosaic-radar/${productId}/${newRegionId}/${sectorId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = [
		{
			label: SATRAD_REGIONS[SATRAD_REGION_GOES_EAST_ID].label,
			options: [
				{
					label: 'Global',
					value: SATRAD_SCALE_REGION_GLOBAL_EAST_ID,
				},
				{
					label: 'Continental',
					value: SATRAD_SCALE_REGION_CONTINENTAL_EAST_ID,
				},
			],
		},
		{
			label: SATRAD_REGIONS[SATRAD_REGION_GOES_WEST_ID].label,
			options: [
				{
					label: 'Global',
					value: SATRAD_SCALE_REGION_GLOBAL_WEST_ID,
				},
				{
					label: 'Continental',
					value: SATRAD_SCALE_REGION_CONTINENTAL_WEST_ID,
				},
			],
		},
		{
			label: SATRAD_REGIONS[SATRAD_REGION_NAMER_ID].label,
			options: [
				{
					label: 'Regional',
					value: SATRAD_SCALE_REGION_REGIONAL_NAMER_ID,
				},
				{
					label: 'Subregional',
					value: SATRAD_SCALE_REGION_SUBREGIONAL_NAMER_ID,
				},
				{
					label: 'Local',
					value: SATRAD_SCALE_REGION_LOCAL_NAMER_ID,
				},
			],
		},
		{
			label: SATRAD_REGIONS[SATRAD_REGION_ALASKA_ID].label,
			options: [
				{
					label: 'Regional',
					value: SATRAD_SCALE_REGION_REGIONAL_ALASKA_ID,
				},
				{
					label: 'Subregional',
					value: SATRAD_SCALE_REGION_SUBREGIONAL_ALASKA_ID,
				},
				{
					label: 'Local',
					value: SATRAD_SCALE_REGION_LOCAL_ALASKA_ID,
				},
			],
		},
		{
			label: SATRAD_REGIONS[SATRAD_REGION_HAWAII_ID].label,
			options: [
				{
					label: 'Regional',
					value: SATRAD_SCALE_REGION_REGIONAL_HAWAII_ID,
				},
				{
					label: 'Subregional',
					value: SATRAD_SCALE_REGION_SUBREGIONAL_HAWAII_ID,
				},
				{
					label: 'Local',
					value: SATRAD_SCALE_REGION_LOCAL_HAWAII_ID,
				},
			],
		},
	]

	useEffect(() => {
		if (!regionId) return
		const region = SATRAD_SCALE_REGIONS[regionId as string].region
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = region.sectors.map((sectorId) => ({
			id: sectorId,
			name: SATRAD_SITES[sectorId].name,
			type: SATRAD_SITES[sectorId].type,
			coordinates: SATRAD_SITES[sectorId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])
	const panelGroupedProducts = transformData(productsArray, ALL_SATRAD_GROUPS, SATRAD_GROUPS, SATRAD_PRODUCTS)

	return (
		<ScrollArea>
			<SidebarPanelPad>
				<div className={styles.SatradSidebarPanel}>
					<div className={styles.options}>
						<SelectGrouped onChange={handleRegionChange} value={regionId as string} options={regionOptions} placeholder="Select Region" />
						{/* <Button onClick={openSectorSelectorPanel} label={`Sector:  ${sectorId} - ${NEXRAD_SITES[sectorId as string]?.name}`} /> */}
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
