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

	useEffect(() => {
		if (!SATRAD_PRODUCTS[productId as string] || !SATRAD_SCALE_REGIONS[regionId as string] || !ALL_SATRAD_SECTORS[sectorId as string]) {
			resetSatradZoomState()
			router.push(`/weather-data/satellite-mosaic-radar/${DEFAULT_SATRAD_PRODUCT}/${DEFAULT_SATRAD_REGION}/${DEFAULT_SATRAD_SECTOR}`)
		} else if (tempRegionIdRef.current !== regionId) {
			tempRegionIdRef.current = regionId as string
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
			const region = SATRAD_SCALE_REGIONS[tempRegionIdRef.current as string].region
			const newD3config = {
				rotate: region.rotate,
				scale: region.scale,
			}
			setSectorSelectorD3config(newD3config)
			const selectedSectors = SATRAD_SCALE_REGIONS[tempRegionIdRef.current as string].sectors.map((sectorId) => ({
				id: sectorId,
				...ALL_SATRAD_SECTORS[sectorId],
			}))
			setSectorSelectorSectors(selectedSectors)
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
									key: id,
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

								return <SidebarLink {...sidebarLinkProps} />
							})}
						</SidebarGrid>
					</SidebarGroup>
				))}
			</div>
		</ScrollArea>
	)
}

export default SatradSidebarPanel
