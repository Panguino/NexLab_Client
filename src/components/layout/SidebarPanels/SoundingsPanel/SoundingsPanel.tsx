'use client'

import { Button } from '@/components/elements/Button/Button'
import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_SOUNDING_REGIONS, SOUNDING_REGION_CONUS } from '@/data/analysis/soundings/regions'
import { ALL_SOUNDING_SITES } from '@/data/analysis/soundings/sites'
import { useRootStore } from '@/store/useRootStore'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './SoundingsPanel.module.scss'

interface soundingsPanelProps {
	basepath: string
}

export const SoundingsPanel = ({ basepath }: soundingsPanelProps) => {
	const router = useRouter()
	const sectorSelectorRef = useRef(null)
	const soundingSite = useRootStore.use.soundingSite()
	const soundingRegion = useRootStore.use.soundingRegion()
	const setSoundingRegion = useRootStore.use.setSoundingRegion()
	const soundingProduct = useRootStore.use.soundingProduct()
	const [sectorSelectorOpen, setSectorSelectorOpen] = useState(false)

	const [sites, setSites] = useState(ALL_SOUNDING_REGIONS[SOUNDING_REGION_CONUS].sites)
	const [d3config, setD3config] = useState({
		width: 800,
		height: 600,
		rotate: ALL_SOUNDING_REGIONS[SOUNDING_REGION_CONUS].rotate,
		scale: ALL_SOUNDING_REGIONS[SOUNDING_REGION_CONUS].scale,
	})

	const handleRegionChange = (regionId) => {
		const region = ALL_SOUNDING_REGIONS[regionId]
		setSoundingRegion(regionId)
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
		router.push(`/weather-data/analysis/soundings/${soundingRegion}/${soundingProduct}/${site}`)
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

	const regionOptions = Object.keys(ALL_SOUNDING_REGIONS).map((regionId) => {
		return { value: regionId, label: ALL_SOUNDING_REGIONS[regionId].label }
	})

	const sectorArray = Object.keys(sites).map((value) => {
		return { id: value, ...ALL_SOUNDING_SITES[value] }
	})
	const productsArray = Object.keys(ALL_SOUNDING_SITES[soundingSite].products).map((id) => {
		return { id, label: ALL_SOUNDING_SITES[soundingSite].products[id].label }
	})

	return (
		<>
			{sectorSelectorOpen && (
				<div ref={sectorSelectorRef} className={styles.siteSelector}>
					<SectorSelector sectors={sectorArray} d3config={d3config} sector={soundingSite} onChange={handleSiteChange} />
					<Button onClick={() => setSectorSelectorOpen(true)} label={`Site:  ${soundingSite} - ${ALL_SOUNDING_SITES[soundingSite].name}`} />
				</div>
			)}
			<SidebarSectionHeader name="Soundings" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={soundingRegion} options={regionOptions} onChange={handleRegionChange} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink
						key={id}
						name={label}
						linkUrl={`/weather-data/analysis/soundings/${soundingRegion}/${soundingProduct}/${soundingSite}`}
					/>
				))}
			</SidebarPanelPad>
		</>
	)
}

export default SoundingsPanel
