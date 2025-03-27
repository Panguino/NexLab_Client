'use client'

import { Button } from '@/components/elements/Button/Button'
import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_UPPERAIR_PRODUCTS } from '@/data/analysis/upper-air/products'
import { ALL_UPPERAIR_REGIONS } from '@/data/analysis/upper-air/regions'
import { ALL_UPPERAIR_SECTORS } from '@/data/analysis/upper-air/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
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
	const { levelId, productId, siteId, regionId } = useParams()

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/analysis/upper-air/${levelId}/${productId}/${regionId}/${sectorId}`)
		})
	}, [levelId, productId, regionId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

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

	const productsArray = Object.keys(ALL_UPPERAIR_SECTORS[siteId as string].levels).map((levelId) => {
		const thisLevel = ALL_UPPERAIR_SECTORS[siteId as string].levels[levelId]
		return {
			levelId: levelId,
			label: thisLevel.label,
			columns: thisLevel.columns,
			products: thisLevel.products.map((productId) => ({
				productId: productId,
				label: ALL_UPPERAIR_PRODUCTS[productId].label,
			})),
		}
	})

	return (
		<div className={styles.UpperAirPanel}>
			<SidebarSectionHeader name="Upper Air Maps" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Button onClick={openSectorSelectorPanel} label={`Sector: ${ALL_UPPERAIR_SECTORS[siteId as string].name}`} />
				</div>
				{productsArray.map(({ levelId, label, columns, products }) => (
					<SidebarGroup key={levelId} title={label}>
						<SidebarGrid columns={columns}>
							{products.map(({ productId, label }) => (
								<SidebarLink
									key={productId}
									name={label}
									linkUrl={`/weather-data/analysis/upper-air/${levelId}/${productId}/${regionId}/${siteId}`}
								/>
							))}
						</SidebarGrid>
					</SidebarGroup>
				))}
			</SidebarPanelPad>
		</div>
	)
}

export default UpperAirPanel
