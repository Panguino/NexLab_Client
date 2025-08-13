'use client'

import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_NEXRAD_GROUPS, DEFAULT_NEXRAD_PRODUCT, NEXRAD_GROUPS, NEXRAD_PRODUCTS } from '@/data/nexrad/products'
import { DEFAULT_NEXRAD_REGION, NEXRAD_REGIONS } from '@/data/nexrad/regions'
import { DEFAULT_NEXRAD_SITE, NEXRAD_SITES } from '@/data/nexrad/sites'
import { PRODUCT_INFO_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './NexradSidebarPanel.module.scss'

const NexradSidebarPanel = () => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const resetNexradZoomState = useRootStore.use.resetNexradZoomState()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { nexradProductId: productId, nexradSiteId: siteId, nexradRegionId: regionId } = useParams()
	const setProductInfoId = useRootStore.use.setProductInfoId()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	useEffect(() => {
		if (!NEXRAD_PRODUCTS[productId as string] || !NEXRAD_REGIONS[regionId as string] || !NEXRAD_SITES[siteId as string]) {
			console.log('Invalid productId:', NEXRAD_PRODUCTS[productId as string])
			console.log('Invalid regionId:', NEXRAD_REGIONS[regionId as string])
			console.log('Invalid siteId:', NEXRAD_SITES[siteId as string])
			resetNexradZoomState()
			router.push(`/weather-data/nexrad-dual-pol-radar/${DEFAULT_NEXRAD_PRODUCT}/${DEFAULT_NEXRAD_REGION}/${DEFAULT_NEXRAD_SITE}`)
		}
	}, [productId, regionId, siteId, router, resetNexradZoomState])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			resetNexradZoomState()
			router.push(`/weather-data/nexrad-dual-pol-radar/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler, resetNexradZoomState])

	useEffect(() => {
		if (!regionId) return
		const region = NEXRAD_REGIONS[regionId as string]
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = region.sites.map((siteId) => ({
			id: siteId,
			...NEXRAD_SITES[siteId],
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/nexrad-dual-pol-radar/${productId}/${newRegionId}/${siteId}`)
		resetNexradZoomState()
		openSectorSelectorPanel()
	}

	const regionOptions = Object.keys(NEXRAD_REGIONS).map((regionId) => {
		return { value: regionId, label: NEXRAD_REGIONS[regionId].label }
	})
	const productsArray = NEXRAD_SITES[siteId as string]?.products

	const transformData = (productsArray, allNexradGroups, nexradGroups, nexradProducts, NEXRAD_SITES, nexradSite) => {
		if (!productsArray) return []
		const transformedData = allNexradGroups.map((groupId) => {
			const group = nexradGroups[groupId]
			const products = productsArray
				.filter((productId) => group.products.includes(productId))
				.map((productId) => {
					const product = nexradProducts[productId]
					const base = {
						id: productId,
						label: product.label,
						limited: NEXRAD_SITES[nexradSite].limited === true ? product.limited : false,
					}
					return product.infoId !== undefined ? { ...base, infoId: product.infoId } : base
				})

			return {
				groupId,
				label: group.label,
				sublabel: group.sublabel,
				columns: group.columns,
				products,
			}
		})

		return transformedData
	}
	const panelGroupedProducts = transformData(productsArray, ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS, NEXRAD_SITES, siteId)

	return (
		<ScrollArea>
			<div className={styles.NexradSidebarPanel}>
				<div className={styles.options}>
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<SectorChangeButton label="Selected Site:" labelValue={NEXRAD_SITES[siteId as string]?.name} onClick={openSectorSelectorPanel} />
				</div>
				{panelGroupedProducts.map(({ groupId, label, sublabel, columns, products }) => (
					<SidebarGroup key={groupId} title={label} extraInfo={sublabel && `(${sublabel})`}>
						<SidebarGrid columns={columns}>
							{products.map((product) => {
								const { id, label, limited } = product
								const sidebarLinkProps: any = {
									key: id,
									name: label,
									active: id === productId,
									limited: limited,
									linkUrl: `/weather-data/nexrad-dual-pol-radar/${id}/${regionId}/${siteId}`,
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

export default NexradSidebarPanel
