'use client'

import { Button } from '@/components/elements/Button/Button'
import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import Select from '@/components/elements/Select/Select'
import { ALL_SITES, NEXRAD_REGION_CONUS_ID, NEXRAD_REGIONS } from '@/data/nexradVars'
import { useRootStore } from '@/store/useRootStore'
import { useState } from 'react'
import styles from './NexradSidebarPanel.module.scss'

const NexradSidebarPanel = () => {
	const nexradSite = useRootStore.use.nexradSite()
	const setNexradSite = useRootStore.use.setNexradSite()
	const nexradRegion = useRootStore.use.nexradRegion()
	const setNexradRegion = useRootStore.use.setNexradRegion()
	//const nexradProduct = useRootStore.use.nexradProduct()
	const setNexradProduct = useRootStore.use.setNexradProduct()
	const [sectorSelectorOpen, setSectorSelectorOpen] = useState(false)

	const [sectors, setSectors] = useState(NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].sites)
	const [d3config, setD3config] = useState({
		width: 1000,
		height: 600,
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
		setSectors(region.sites)
		setD3config(newD3config)
	}
	const handleSiteChange = (site) => {
		setSectorSelectorOpen(false)
		setNexradSite(site)
	}
	const regionOptions = Object.keys(NEXRAD_REGIONS).map((regionId) => {
		return { value: regionId, label: NEXRAD_REGIONS[regionId].label }
	})
	const sectorArray = Object.keys(sectors).map((key) => {
		return { id: key, ...sectors[key] }
	})
	console.log('productsArray', nexradSite, ALL_SITES[nexradSite])
	const productsArray = Object.keys(ALL_SITES[nexradSite].products).map((key) => {
		return { id: key, ...ALL_SITES[nexradSite].products[key] }
	})

	return (
		<div className={styles.NexradSidebarPanel}>
			<Select value={nexradRegion} options={regionOptions} onChange={handleRegionChange} />
			<Button onClick={() => setSectorSelectorOpen(true)} label="Choose Sector" />
			{sectorSelectorOpen && (
				<div className={styles.siteSelector}>
					<SectorSelector sectors={sectorArray} d3config={d3config} sector={nexradSite} onChange={handleSiteChange} />
				</div>
			)}
			{productsArray &&
				productsArray.map(({ id, title }) => {
					return (
						<div
							key={id}
							onClick={() => {
								setNexradProduct(id)
							}}
						>
							{title}
						</div>
					)
				})}
		</div>
	)
}

export default NexradSidebarPanel
