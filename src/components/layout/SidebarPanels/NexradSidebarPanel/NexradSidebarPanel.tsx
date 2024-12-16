'use client'

import { Button } from '@/components/elements/Button/Button'
import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import { NEXRAD_REGION_CONUS_ID, NEXRAD_REGIONS, SITE_ILX } from '@/data/nexradVars'
import { useState } from 'react'
import styles from './NexradSidebarPanel.module.scss'

const NexradSidebarPanel = () => {
	const basepath = '/weather-data/text-hazards-outlooks'

	const [selectedSector, setSelectedSector] = useState(SITE_ILX)
	const [selectedRegion, setSelectedRegion] = useState(NEXRAD_REGION_CONUS_ID)
	const [sectors, setSectors] = useState({})
	const [d3config, setD3config] = useState({
		width: 1000,
		height: 600,
		rotate: NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].rotate,
		scale: NEXRAD_REGIONS[NEXRAD_REGION_CONUS_ID].scale,
	})

	const handleRegionChange = (regionId) => {
		const region = NEXRAD_REGIONS[regionId]
		setSelectedRegion(regionId)
		setSelectedSector('')
		const newD3config = {
			...d3config,
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectors(region.sites)
		setD3config(newD3config)
	}

	const regionOptions = Object.keys(NEXRAD_REGIONS).map((regionId) => {
		return { value: regionId, label: NEXRAD_REGIONS[regionId].label }
	})
	const sectorArray = Object.keys(sectors).map((key) => {
		return { id: key, ...sectors[key] }
	})

	return (
		<div className={styles.NexradSidebarPanel}>
			<Select value={selectedRegion} options={regionOptions} onChange={handleRegionChange} />
			<Button onClick={() => setSelectedSector('')}>Clear Sector</Button>
			<SectorSelector sectors={sectorArray} d3config={d3config} sector={selectedSector} onChange={setSelectedSector} />
			<SidebarSectionLink name="Space" linkUrl={`${basepath}/swpc-space-weather`} />
		</div>
	)
}

export default NexradSidebarPanel
