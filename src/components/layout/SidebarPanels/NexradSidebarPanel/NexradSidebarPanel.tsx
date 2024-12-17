'use client'

import { Button } from '@/components/elements/Button/Button'
import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import Select from '@/components/elements/Select/Select'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS, NEXRAD_REGION_CONUS_ID, NEXRAD_REGIONS, NEXRAD_SITES } from '@/data/nexradVars'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useRef, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './NexradSidebarPanel.module.scss'

const NexradSidebarPanel = () => {
	const sectorSelectorRef = useRef(null)
	const nexradSite = useRootStore.use.nexradSite()
	const setNexradSite = useRootStore.use.setNexradSite()
	const nexradRegion = useRootStore.use.nexradRegion()
	const setNexradRegion = useRootStore.use.setNexradRegion()
	const nexradProduct = useRootStore.use.nexradProduct()
	const setNexradProduct = useRootStore.use.setNexradProduct()
	const [sectorSelectorOpen, setSectorSelectorOpen] = useState(false)

	const [sites, setSites] = useState(NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].sites)
	const [d3config, setD3config] = useState({
		width: 900,
		height: 900,
		rotate: NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].rotate,
		scale: NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].scale,
	})

	const handleRegionChange = (regionId) => {
		const region = NEXRAD_REGIONS[regionId]
		setNexradRegion(regionId)
		setSectorSelectorOpen(true)
		const newD3config = {
			...d3config,
			rotate: region.rotate,
			scale: region.scale,
		}
		setSites(region.sites)
		setD3config(newD3config)
	}
	const handleSiteChange = (site) => {
		setSectorSelectorOpen(false)
		setNexradSite(site)
	}
	useEffect(() => {
		const handleClickOutsideSectorSelector = (event) => {
			if (sectorSelectorRef.current && !sectorSelectorRef.current.contains(event.target)) {
				setSectorSelectorOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutsideSectorSelector)
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSectorSelector)
		}
	}, [setSectorSelectorOpen])

	const regionOptions = Object.keys(NEXRAD_REGIONS).map((regionId) => {
		return { value: regionId, label: NEXRAD_REGIONS[regionId].label }
	})
	const sectorArray = sites.map((value) => {
		return { id: value, ...NEXRAD_SITES[value] }
	})
	const productsArray = NEXRAD_SITES[nexradSite].products

	const transformData = (productsArray, allNexradGroups, nexradGroups, nexradProducts) => {
		const transformedData = allNexradGroups.map((groupId) => {
			const group = nexradGroups[groupId]
			const products = productsArray
				.filter((productId) => group.products.includes(productId))
				.map((productId) => ({
					id: productId,
					label: nexradProducts[productId].label,
				}))

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
	const panelGroupedProducts = transformData(productsArray, ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS)

	return (
		<>
			{sectorSelectorOpen && (
				<div ref={sectorSelectorRef} className={styles.siteSelector}>
					<SectorSelector sectors={sectorArray} d3config={d3config} sector={nexradSite} onChange={handleSiteChange} />
				</div>
			)}
			<ScrollArea>
				<div className={styles.NexradSidebarPanel}>
					<div className={styles.options}>
						<Select value={nexradRegion} options={regionOptions} onChange={handleRegionChange} />
						<Button onClick={() => setSectorSelectorOpen(true)} label={`Site:  ${nexradSite} - ${NEXRAD_SITES[nexradSite].name}`} />
					</div>
					{panelGroupedProducts.map(({ groupId, label, sublabel, columns, products }) => (
						<SidebarGroup key={groupId} title={label} extraInfo={sublabel && `(${sublabel})`}>
							<SidebarGrid columns={columns}>
								{products.map(({ id, label }) => (
									<SidebarLink key={id} name={label} onClick={() => setNexradProduct(id)} active={id === nexradProduct} />
								))}
							</SidebarGrid>
						</SidebarGroup>
					))}
				</div>
			</ScrollArea>
		</>
	)
}

export default NexradSidebarPanel
