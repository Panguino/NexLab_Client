'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_SOUNDING_REGIONS, SOUNDING_REGION_DEFAULT } from '@/data/analysis/soundings/regions'
import { ALL_SOUNDING_SITES, SOUNDING_SITE_DEFAULT } from '@/data/analysis/soundings/sites'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SOUNDING_PRODUCT_DEFAULT } from '@/data/analysis/soundings/products'
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

	const { productSoundingId: paramProductId, siteSoundingId: paramSiteId, regionSoundingId: paramRegionId } = useParams()
	const siteSoundingId = paramSiteId ?? SOUNDING_SITE_DEFAULT
	const regionSoundingId = paramRegionId ?? SOUNDING_REGION_DEFAULT
	const productSoundingId = paramProductId ?? SOUNDING_PRODUCT_DEFAULT

	useEffect(() => {
		// need to debug why this doesn't work
		console.log('region?', ALL_SOUNDING_REGIONS[regionSoundingId as string], !ALL_SOUNDING_REGIONS[regionSoundingId as string])
		if (
			!ALL_SOUNDING_SITES[siteSoundingId as string] ||
			!ALL_SOUNDING_REGIONS[regionSoundingId as string] ||
			!ALL_SOUNDING_SITES[siteSoundingId as string].products[productSoundingId as string]
		) {
			console.log('pushing to default route')
			router.push(`/weather-data/analysis/soundings/${SOUNDING_PRODUCT_DEFAULT}/${SOUNDING_REGION_DEFAULT}/${SOUNDING_SITE_DEFAULT}`)
		}
	}, [siteSoundingId, regionSoundingId, productSoundingId, router])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/analysis/soundings/${productSoundingId}/${regionSoundingId}/${sectorId}`)
		})
	}, [productSoundingId, regionSoundingId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		const region =
			regionSoundingId && ALL_SOUNDING_REGIONS[regionSoundingId as string]
				? ALL_SOUNDING_REGIONS[regionSoundingId as string]
				: ALL_SOUNDING_REGIONS[SOUNDING_REGION_DEFAULT]
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
	}, [regionSoundingId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (newRegionId) => {
		console.log('region changed')
		router.push(`/weather-data/analysis/soundings/${productSoundingId}/${newRegionId}/${siteSoundingId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = useMemo(() => {
		return Object.keys(ALL_SOUNDING_REGIONS).map((regionId) => {
			return { value: regionId, label: ALL_SOUNDING_REGIONS[regionId].label }
		})
	}, [])

	const productsArray = useMemo(() => {
		if (siteSoundingId && ALL_SOUNDING_SITES[siteSoundingId as string]) {
			return Object.keys(ALL_SOUNDING_SITES[siteSoundingId as string].products).map((productId) => {
				return { id: productId, label: ALL_SOUNDING_SITES[siteSoundingId as string].products[productId].label }
			})
		}
		return []
	}, [siteSoundingId])

	const getSelectorLabel = (siteId) => {
		if (siteId && ALL_SOUNDING_SITES[siteId as string]) {
			return `Site:  ${siteId} - ${ALL_SOUNDING_SITES[siteId as string].name}`
		} else {
			return 'Select Site'
		}
	}

	return (
		<div className={styles.soundingsPanel}>
			<SidebarSectionHeader name="Soundings" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={regionSoundingId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={getSelectorLabel(siteSoundingId)} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink key={id} name={label} linkUrl={`/weather-data/analysis/soundings/${id}/${regionSoundingId}/${siteSoundingId}`} />
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SoundingsPanel
