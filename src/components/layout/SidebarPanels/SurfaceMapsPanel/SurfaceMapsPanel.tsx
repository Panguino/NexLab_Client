'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_SURFACE_REGIONS } from '@/data/analysis/surface/regions'
import { ALL_SURFACE_SECTORS } from '@/data/analysis/surface/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './SurfaceMapsPanel.module.scss'

interface SurfaceMapsPanelProps {
	basepath: string
}

export const SurfaceMapsPanel = ({ basepath }: SurfaceMapsPanelProps) => {
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
			router.push(`/weather-data/analysis/surface-maps/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		const region = ALL_SURFACE_REGIONS[regionId as string]
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = Object.entries(region.sites).map(([siteId]) => ({
			id: siteId,
			name: ALL_SURFACE_SECTORS[siteId].name,
			type: ALL_SURFACE_SECTORS[siteId].type,
			coordinates: ALL_SURFACE_SECTORS[siteId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/analysis/surface-maps/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = Object.keys(ALL_SURFACE_REGIONS).map((regionId) => {
		return { value: regionId, label: ALL_SURFACE_REGIONS[regionId].label }
	})

	const productsArray = Object.keys(ALL_SURFACE_SECTORS[siteId as string].products).map((productId) => {
		return { id: productId, label: ALL_SURFACE_SECTORS[siteId as string].products[productId].label }
	})

	return (
		<div className={styles.soundingsPanel}>
			<SidebarSectionHeader name="Surface Maps" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={`Site:  ${siteId} - ${ALL_SURFACE_SECTORS[siteId as string].name}`} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/surface-maps/${id}/${regionId}/${siteId}`} />
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SurfaceMapsPanel
