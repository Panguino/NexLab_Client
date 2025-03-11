'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_SOUNDING_REGIONS } from '@/data/analysis/soundings/regions'
import { ALL_SOUNDING_SITES } from '@/data/analysis/soundings/sites'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './SoundingsPanel.module.scss'

interface soundingsPanelProps {
	basepath: string
}

export const SoundingsPanel = ({ basepath }: soundingsPanelProps) => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { productId, siteId, regionId } = useParams()

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/analysis/soundings/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		const region = ALL_SOUNDING_REGIONS[regionId as string]
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = region.sites.map((siteId) => ({
			id: siteId,
			name: ALL_SOUNDING_SITES[siteId].name,
			type: ALL_SOUNDING_SITES[siteId].type,
			coordinates: ALL_SOUNDING_SITES[siteId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/analysis/soundings/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = Object.keys(ALL_SOUNDING_REGIONS).map((regionId) => {
		return { value: regionId, label: ALL_SOUNDING_REGIONS[regionId].label }
	})

	const productsArray = Object.keys(ALL_SOUNDING_SITES[siteId as string].products).map((productId) => {
		return { id: productId, label: ALL_SOUNDING_SITES[siteId as string].products[productId].label }
	})

	return (
		<div className={styles.soundingsPanel}>
			<SidebarSectionHeader name="Soundings" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={`Site:  ${siteId} - ${ALL_SOUNDING_SITES[siteId as string].name}`} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/soundings/${regionId}/${productId}/${siteId}`} />
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SoundingsPanel
