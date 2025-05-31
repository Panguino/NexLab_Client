'use client'

import { Button } from '@/components/elements/Button/Button'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_SURFACE_REGIONS, SURFACE_REGION_DEFAULT } from '@/data/analysis/surface/regions'
import { ALL_SURFACE_SECTORS, SURFACE_SECTOR_DEFAULT } from '@/data/analysis/surface/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SURFACE_PRODUCT_DEFAULT } from '@/data/analysis/surface/products'
import styles from './SurfaceMapsPanel.module.scss'

interface SurfaceMapsPanelProps {
	basepath: string
	isActive?: boolean
}

export const SurfaceMapsPanel = ({ basepath, isActive }: SurfaceMapsPanelProps) => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const { surfaceProductId: paramProductId, surfaceSiteId: paramSiteId, surfaceRegionId: paramRegionId } = useParams()
	const siteId = paramSiteId ?? SURFACE_SECTOR_DEFAULT
	const regionId = paramRegionId ?? SURFACE_REGION_DEFAULT
	const productId = paramProductId ?? SURFACE_PRODUCT_DEFAULT
	const tempRegionIdRef = useRef<string>(regionId as string)

	useEffect(() => {
		if (isActive) {
			if (!ALL_SURFACE_REGIONS[paramRegionId as string] || !ALL_SURFACE_SECTORS[paramSiteId as string]) {
				// needs testing first, if bad make no assumptions, use default values
				router.push(`/weather-data/analysis/surface-maps/${SURFACE_PRODUCT_DEFAULT}/${SURFACE_REGION_DEFAULT}/${SURFACE_SECTOR_DEFAULT}`)
			} else if (!ALL_SURFACE_SECTORS[paramSiteId as string].products[paramProductId as string]) {
				// both site and region have to be valid to get here, but if product is bad, use default values
				router.push(`/weather-data/analysis/surface-maps/${SURFACE_PRODUCT_DEFAULT}/${paramRegionId}/${paramSiteId}`)
			}
		}
	}, [paramProductId, paramRegionId, paramSiteId, router, isActive])

	useEffect(() => {
		if (isActive) {
			updateOnChangeSectorSelectorSectorHandler((sectorId) => {
				closeSectorSelectorPanel()
				router.push(`/weather-data/analysis/surface-maps/${productId}/${tempRegionIdRef.current}/${sectorId}`)
			})
		}
	}, [productId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler, isActive])

	useEffect(() => {
		if (isActive) {
			if (sectorSelectorPanelIsOpen) {
				const region = ALL_SURFACE_REGIONS[tempRegionIdRef.current as string] ?? ALL_SURFACE_REGIONS[SURFACE_REGION_DEFAULT]
				const newD3config = {
					rotate: region.rotate,
					scale: region.scale,
				}
				const selectedSectors = region.sites.map((siteId) => ({
					id: siteId,
					...ALL_SURFACE_SECTORS[siteId],
				}))
				setSectorSelectorD3config(newD3config)
				setSectorSelectorSectors(selectedSectors)
			} else {
				if (tempRegionIdRef.current && tempRegionIdRef.current !== regionId) {
					tempRegionIdRef.current = regionId as string
				}
			}
		}
	}, [sectorSelectorPanelIsOpen, setSectorSelectorD3config, setSectorSelectorSectors, regionId, isActive])

	const handleRegionChange = (newRegionId) => {
		tempRegionIdRef.current = newRegionId
		openSectorSelectorPanel()
	}

	const regionOptions = useMemo(() => {
		return Object.keys(ALL_SURFACE_REGIONS).map((regionId) => {
			return { value: regionId, label: ALL_SURFACE_REGIONS[regionId].label }
		})
	}, [])

	const productsArray = useMemo(() => {
		if (siteId && ALL_SURFACE_SECTORS[siteId as string]) {
			return Object.keys(ALL_SURFACE_SECTORS[siteId as string].products).map((productId) => {
				return { id: productId, label: ALL_SURFACE_SECTORS[siteId as string].products[productId].label }
			})
		}
		return []
	}, [siteId])

	const getSelectorLabel = (siteId) => {
		if (siteId && ALL_SURFACE_SECTORS[siteId as string]) {
			return `Sector: ${ALL_SURFACE_SECTORS[siteId as string].name}`
		} else {
			return 'Select Sector'
		}
	}

	return (
		<div className={styles.SurfaceMapsPanel}>
			<SidebarSectionHeader name="Surface Maps" linkUrl={`${basepath}`} />
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
						linkUrl={`/weather-data/analysis/surface-maps/${id}/${regionId}/${siteId}`}
					/>
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default SurfaceMapsPanel
