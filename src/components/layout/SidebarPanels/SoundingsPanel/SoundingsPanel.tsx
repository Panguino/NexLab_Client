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
	isActive: boolean
}

export const SoundingsPanel = ({ basepath, isActive }: soundingsPanelProps) => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()

	const { soundingProductId: paramProductId, soundingSiteId: paramSiteId, soundingRegionId: paramRegionId } = useParams()
	const siteId = paramSiteId ?? SOUNDING_SITE_DEFAULT
	const regionId = paramRegionId ?? SOUNDING_REGION_DEFAULT
	const productId = paramProductId ?? SOUNDING_PRODUCT_DEFAULT

	useEffect(() => {
		if (
			isActive &&
			(!ALL_SOUNDING_SITES[paramSiteId as string] ||
				!ALL_SOUNDING_REGIONS[paramRegionId as string] ||
				!ALL_SOUNDING_SITES[paramSiteId as string].products[paramProductId as string])
		) {
			router.push(`/weather-data/analysis/soundings/${SOUNDING_PRODUCT_DEFAULT}/${SOUNDING_REGION_DEFAULT}/${SOUNDING_SITE_DEFAULT}`)
		}
	}, [paramSiteId, paramProductId, paramRegionId, router, isActive])

	useEffect(() => {
		if (isActive) {
			updateOnChangeSectorSelectorSectorHandler((sectorId) => {
				closeSectorSelectorPanel()
				router.push(`/weather-data/analysis/soundings/${productId}/${regionId}/${sectorId}`)
			})
		}
	}, [productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler, isActive])

	useEffect(() => {
		if (isActive) {
			const region =
				regionId && ALL_SOUNDING_REGIONS[regionId as string]
					? ALL_SOUNDING_REGIONS[regionId as string]
					: ALL_SOUNDING_REGIONS[SOUNDING_REGION_DEFAULT]
			const newD3config = {
				rotate: region.rotate,
				scale: region.scale,
			}
			setSectorSelectorD3config(newD3config)
			const selectedSectors = region.sites.map((siteId) => ({
				id: siteId,
				...ALL_SOUNDING_SITES[siteId],
			}))
			setSectorSelectorSectors(selectedSectors)
		}
	}, [regionId, setSectorSelectorD3config, setSectorSelectorSectors, isActive])

	const handleRegionChange = (newRegionId) => {
		router.push(`/weather-data/analysis/soundings/${productId}/${newRegionId}/${siteId}`)
		openSectorSelectorPanel()
	}

	const regionOptions = useMemo(() => {
		return Object.keys(ALL_SOUNDING_REGIONS).map((regionId) => {
			return { value: regionId, label: ALL_SOUNDING_REGIONS[regionId].label }
		})
	}, [])

	const productsArray = useMemo(() => {
		if (siteId && ALL_SOUNDING_SITES[siteId as string]) {
			return Object.keys(ALL_SOUNDING_SITES[siteId as string].products).map((productId) => {
				return { id: productId, label: ALL_SOUNDING_SITES[siteId as string].products[productId].label }
			})
		}
		return []
	}, [siteId])

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
					<Select value={regionId} options={regionOptions} onChange={handleRegionChange} />
					<Button onClick={openSectorSelectorPanel} label={getSelectorLabel(siteId)} />
				</div>
				{productsArray.map(({ id, label }) => (
					<SidebarLink
						key={id}
						name={label}
						active={id === productId}
						linkUrl={`/weather-data/analysis/soundings/${id}/${regionId}/${siteId}`}
					/>
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SoundingsPanel
