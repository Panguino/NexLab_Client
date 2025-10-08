'use client'

import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import SelectGrouped from '@/components/elements/SelectGrouped/SelectGrouped'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_SATRAD_GROUPS, DEFAULT_SATRAD_PRODUCT, SATRAD_GROUPS, SATRAD_PRODUCTS } from '@/data/satrad/products'
import { DEFAULT_SATRAD_REGION, SATRAD_MAP_OPTIONS, SATRAD_SCALE_REGIONS } from '@/data/satrad/scaleRegions'
import { ALL_SATRAD_SECTORS } from '@/data/satrad/sectors'
import { DEFAULT_SATRAD_SECTOR } from '@/data/satrad/sectorsContinental'
import { PRODUCT_INFO_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './SatradSidebarPanel.module.scss'

const SatradSidebarPanel = () => {
	const router = useRouter()
	const resetSatradZoomState = useRootStore.use.resetSatradZoomState()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { satradProductId: productId, satradSectorId: sectorId, satradRegionId: regionId } = useParams()
	const tempRegionIdRef = useRef<string | null>(null)
	const setProductInfoId = useRootStore.use.setProductInfoId()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	const fetchFloaterSectorData = async () => {
		try {
			const response = await fetch('https://weather.cod.edu/datapoints/satrad/get-floaters.php')
			if (!response.ok) {
				throw new Error(`Failed to fetch sector data: ${response.status} ${response.statusText}`)
			}
			return await response.json()
		} catch (error) {
			console.error('Error fetching sector data:', error)
			return null
		}
	}

	useEffect(() => {
		const currentRegionId = regionId as string
		const currentSectorId = sectorId as string
		const currentProductId = productId as string

		// 1. Region sanitization
		const sanitizedRegionId = SATRAD_SCALE_REGIONS[currentRegionId] ? currentRegionId : DEFAULT_SATRAD_REGION

		// 2. Sector sanitization (must belong to sanitizedRegionId's sectors list)
		const regionSectors = SATRAD_SCALE_REGIONS[sanitizedRegionId].sectors
		const sanitizedSectorId = regionSectors.includes(currentSectorId)
			? currentSectorId
			: regionSectors.includes(DEFAULT_SATRAD_SECTOR)
				? DEFAULT_SATRAD_SECTOR
				: regionSectors[0]

		// 3. Product sanitization (must exist inside the sanitized sector's product set)
		const sectorProductsObj = ALL_SATRAD_SECTORS[sanitizedSectorId]?.products || {}
		const sanitizedProductId = sectorProductsObj[currentProductId]
			? currentProductId
			: sectorProductsObj[DEFAULT_SATRAD_PRODUCT]
				? DEFAULT_SATRAD_PRODUCT
				: Object.keys(sectorProductsObj).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))[0]

		// 4. If any param changed, push sanitized route
		if (currentRegionId !== sanitizedRegionId || currentSectorId !== sanitizedSectorId || currentProductId !== sanitizedProductId) {
			resetSatradZoomState()
			router.push(`/weather-data/satellite-mosaic-radar/${sanitizedProductId}/${sanitizedRegionId}/${sanitizedSectorId}`)
			tempRegionIdRef.current = sanitizedRegionId
		} else if (tempRegionIdRef.current !== sanitizedRegionId) {
			// Keep tempRegionIdRef synced for sector selector logic
			tempRegionIdRef.current = sanitizedRegionId
		}
	}, [productId, regionId, sectorId, router, resetSatradZoomState])

	const handleRegionChange = (newRegionId) => {
		tempRegionIdRef.current = newRegionId
		openSectorSelectorPanel()
		resetSatradZoomState()
	}

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/satellite-mosaic-radar/${productId}/${tempRegionIdRef.current}/${sectorId}`)
			resetSatradZoomState()
		})
	}, [productId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler, resetSatradZoomState])

	useEffect(() => {
		if (sectorSelectorPanelIsOpen) {
			const loadSectorData = async () => {
				const region = SATRAD_SCALE_REGIONS[tempRegionIdRef.current as string].region
				const newD3config = {
					rotate: region.rotate,
					scale: region.scale,
				}
				setSectorSelectorD3config(newD3config)
				// Special case: if mesoanalysis region, fetch floater sector data
				const updatedSectorData = await fetchFloaterSectorData()
				console.log('Fetched floater sector data:', updatedSectorData)
				const selectedSectors = SATRAD_SCALE_REGIONS[tempRegionIdRef.current as string].sectors.map((sectorId) => {
					const base = {
						id: sectorId,
						...ALL_SATRAD_SECTORS[sectorId],
					}
					// Only override coordinates for meso floater sectors if updated data is available
					if (
						['meso1', 'meso2', 'meso3', 'meso4'].includes(sectorId) &&
						updatedSectorData &&
						updatedSectorData[sectorId] &&
						updatedSectorData[sectorId].coordinates
					) {
						return {
							...base,
							coordinates: updatedSectorData[sectorId].coordinates,
						}
					}
					return base
				})
				setSectorSelectorSectors(selectedSectors)
			}
			loadSectorData()
		} else {
			if (tempRegionIdRef.current !== regionId) {
				tempRegionIdRef.current = regionId as string
			}
		}
	}, [sectorSelectorPanelIsOpen, regionId, setSectorSelectorD3config, setSectorSelectorSectors])

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
				.map((productId) => {
					const product = satradProducts[productId]
					const base = {
						id: productId,
						label: product.label,
					}
					return product.infoId !== undefined ? { ...base, infoId: product.infoId } : base
				})

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
			<div className={styles.SatradSidebarPanel}>
				<div className={styles.options}>
					<SelectGrouped
						onChange={handleRegionChange}
						value={regionId as string}
						options={SATRAD_MAP_OPTIONS}
						placeholder="Select Region"
					/>
					<SectorChangeButton
						onClick={openSectorSelectorPanel}
						label="Selected Sector:"
						labelValue={ALL_SATRAD_SECTORS[sectorId as string]?.name}
					/>
				</div>
				{panelGroupedProducts.map(({ groupId, label, columns, products }) => (
					<SidebarGroup key={groupId} title={label}>
						<SidebarGrid columns={columns}>
							{products.map((product) => {
								const { id, label } = product
								const sidebarLinkProps: any = {
									name: label,
									active: id === productId,
									linkUrl: `/weather-data/satellite-mosaic-radar/${id}/${regionId}/${sectorId}`,
								}
								if ('infoId' in product && product.infoId && product.infoId !== '') {
									sidebarLinkProps.onInfoClick = () => {
										setProductInfoId(product.infoId)
										openSlideoutPanel(PRODUCT_INFO_SLIDEOUT)
									}
								}

								return <SidebarLink key={id} {...sidebarLinkProps} />
							})}
						</SidebarGrid>
					</SidebarGroup>
				))}
			</div>
		</ScrollArea>
	)
}

export default SatradSidebarPanel
