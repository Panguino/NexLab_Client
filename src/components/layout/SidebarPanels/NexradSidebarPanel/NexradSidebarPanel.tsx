'use client'

import { Button } from '@/components/elements/Button/Button'
import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import Select from '@/components/elements/Select/Select'
import { ALL_NEXRAD_GROUPS, NEXRAD_GROUPS, NEXRAD_PRODUCTS, NEXRAD_REGION_CONUS_ID, NEXRAD_REGIONS, NEXRAD_SITES } from '@/data/nexradVars'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useRef, useState } from 'react'
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

	return (
		<div className={styles.NexradSidebarPanel}>
			<Select value={nexradRegion} options={regionOptions} onChange={handleRegionChange} />
			<Button onClick={() => setSectorSelectorOpen(true)} label={`Site:  ${nexradSite} - ${NEXRAD_SITES[nexradSite].name}`} />
			{sectorSelectorOpen && (
				<div ref={sectorSelectorRef} className={styles.siteSelector}>
					<SectorSelector sectors={sectorArray} d3config={d3config} sector={nexradSite} onChange={handleSiteChange} />
				</div>
			)}
			{productsArray &&
				ALL_NEXRAD_GROUPS.map((groupId) => {
					return (
						<div key={groupId}>
							<div>{NEXRAD_GROUPS[groupId].label}</div>
							{productsArray.map((productId) => {
								return NEXRAD_GROUPS[groupId].products.map((groupProductId) => {
									if (productId === groupProductId) {
										return (
											<div
												key={productId}
												onClick={() => {
													setNexradProduct(productId)
												}}
												style={{ paddingLeft: 10, color: productId === nexradProduct ? 'red' : 'grey' }}
											>
												{NEXRAD_PRODUCTS[productId].label}
											</div>
										)
									}
									return <></>
								})
							})}
						</div>
					)
				})}
		</div>
	)
}

export default NexradSidebarPanel
