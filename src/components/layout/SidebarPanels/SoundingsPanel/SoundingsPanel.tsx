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
import { useEffect, useState } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './SoundingsPanel.module.scss'

interface soundingsPanelProps {
	basepath: string
}

export const SoundingsPanel = ({ basepath }: soundingsPanelProps) => {
	const router = useRouter()
	const soundingSite = useRootStore.use.soundingSite()
	const setSoundingSite = useRootStore.use.setSoundingSite()
	const soundingRegion = useRootStore.use.soundingRegion()
	const setSoundingRegion = useRootStore.use.setSoundingRegion()
	const soundingProduct = useRootStore.use.soundingProduct()
	const setSoundingProduct = useRootStore.use.setSoundingProduct()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const sectorSelectorD3config = useRootStore.use.sectorSelectorD3config()
	const sectorSelectorCurrentSector = useRootStore.use.sectorSelectorCurrentSector()
	const params = useParams()

	useEffect(() => {
		// need to find a better way to handle this
		if (sectorSelectorCurrentSector) {
			setSoundingSite(sectorSelectorCurrentSector)
		}
	}, [sectorSelectorCurrentSector, setSoundingSite])

	useEffect(() => {
		const { productId, siteId } = params
		if (productId && siteId) {
			setSoundingProduct(productId)
			setSoundingSite(siteId)
		}
	}, [params, setSoundingSite, setSoundingProduct])

	useEffect(() => {
		closeSectorSelectorPanel()
		router.push(`/weather-data/analysis/soundings/${soundingProduct}/${soundingSite}`)
	}, [soundingSite, soundingProduct, closeSectorSelectorPanel, router])

	const [sites, setSites] = useState(ALL_SOUNDING_REGIONS[SOUNDING_REGION_CONUS].sites)

	const handleRegionChange = (regionId) => {
		const region = ALL_SOUNDING_REGIONS[regionId]
		const sites = Object.entries(region.sites).map(([id, site]) => ({ id, ...site })) // code debt - data isnt in the right format
		const newD3config = {
			...d3config,
			rotate: region.rotate,
			scale: region.scale,
		}
		setSoundingRegion(regionId)
		setSectorSelectorD3config(newD3config)
		openSectorSelectorPanel()
		const selectedSectors = sites.map((siteId) => ({
			id: siteId,
			name: ALL_SOUNDING_SITES[siteId].name,
			type: ALL_SOUNDING_SITES[siteId].type,
			coordinates: ALL_SOUNDING_SITES[siteId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}
	const handleSiteChange = (site) => {
		closeSectorSelectorPanel()
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

	const sectorArray = Object.keys(ALL_SOUNDING_SITES).map((value) => {
		return { id: value, ...ALL_SOUNDING_SITES[value] }
	})
	const productsArray = Object.keys(ALL_SOUNDING_SITES[soundingSite].products).map((id) => {
		return { id, label: ALL_SOUNDING_SITES[soundingSite].products[id].label }
	})

	return (
		<div className={styles.soundingsPanel}>
			{sectorSelectorOpen && (
				<div ref={sectorSelectorRef} className={styles.siteSelector}>
					<SectorSelector sectors={sectorArray} d3config={d3config} sector={soundingSite} onChange={handleSiteChange} />
				</div>
			)}
			<SidebarSectionHeader name="Soundings" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={soundingRegion} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={() => setSectorSelectorOpen(true)} label={`Site:  ${soundingSite} - ${ALL_SOUNDING_SITES[soundingSite].name}`} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink
						key={id}
						name={label}
						linkUrl={`/weather-data/analysis/soundings/${soundingRegion}/${soundingProduct}/${soundingSite}`}
					/>
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SoundingsPanel
