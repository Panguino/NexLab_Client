'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_UPPERAIR_REGIONS } from '@/data/analysis/upper-air/regions'
import { ALL_UPPERAIR_SECTORS } from '@/data/analysis/upper-air/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './UpperAirPanel.module.scss'

interface UpperAirPanelProps {
	basepath: string
}

export const UpperAirPanel = ({ basepath }: UpperAirPanelProps) => {
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
			router.push(`/weather-data/analysis/upper-air/${productId}/${regionId}/${sectorId}`)
		})
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		const region = ALL_UPPERAIR_REGIONS[regionId as string]
		const newD3config = {
			rotate: region.rotate,
			scale: region.scale,
		}
		setSectorSelectorD3config(newD3config)
		const selectedSectors = region.sites.map((siteId) => ({
			id: siteId,
			name: ALL_UPPERAIR_SECTORS[siteId].name,
			type: ALL_UPPERAIR_SECTORS[siteId].type,
			coordinates: ALL_UPPERAIR_SECTORS[siteId].coordinates,
		}))
		setSectorSelectorSectors(selectedSectors)
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/analysis/upper-air/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = Object.keys(ALL_UPPERAIR_REGIONS).map((regionId) => {
		return { value: regionId, label: ALL_UPPERAIR_REGIONS[regionId].label }
	})

	const productsArray = Object.keys(ALL_UPPERAIR_SECTORS[siteId as string].products).map((productId) => {
		return { id: productId, label: ALL_UPPERAIR_SECTORS[siteId as string].products[productId].label }
	})

	return (
		<div className={styles.UpperAirPanel}>
			<SidebarSectionHeader name="Upper Air Maps" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={`Sector: ${ALL_UPPERAIR_SECTORS[siteId as string].name}`} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/upper-air/${id}/${regionId}/${siteId}`} />
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default UpperAirPanel
