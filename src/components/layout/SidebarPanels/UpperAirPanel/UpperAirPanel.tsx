'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_UPPERAIR_PRODUCTS, UPPERAIR_PRODUCT_DEFAULT } from '@/data/analysis/upper-air/products'
import { ALL_UPPERAIR_SECTORS, UPPERAIR_SECTOR_DEFAULT } from '@/data/analysis/upper-air/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'

import Select from '@/components/elements/Select/Select'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { UPPERAIR_LEVEL_DEFAULT } from '@/data/analysis/upper-air/levels'
import { ALL_UPPERAIR_REGIONS, UPPERAIR_REGION_DEFAULT } from '@/data/analysis/upper-air/regions'
import { useEffect, useMemo } from 'react'
import styles from './UpperAirPanel.module.scss'

interface UpperAirPanelProps {
	basepath: string
	isActive?: boolean
}

export const UpperAirPanel = ({ basepath, isActive }: UpperAirPanelProps) => {
	const router = useRouter()
	const setUpperAirSite = useRootStore.use.setUpperAirSite()
	const { levelUpperId: paramLevelId, productUpperId: paramProductId, siteUpperId: paramSiteId, regionUpperId: paramRegionId } = useParams()
	const siteUpperId = paramSiteId ?? UPPERAIR_SECTOR_DEFAULT
	const regionUpperId = paramRegionId ?? UPPERAIR_REGION_DEFAULT
	const levelUpperId = paramLevelId ?? UPPERAIR_LEVEL_DEFAULT
	const productUpperId = paramProductId ?? UPPERAIR_PRODUCT_DEFAULT

	useEffect(() => {
		if (
			isActive &&
			(!ALL_UPPERAIR_REGIONS[regionUpperId as string] ||
				!ALL_UPPERAIR_SECTORS[siteUpperId as string] ||
				!ALL_UPPERAIR_SECTORS[siteUpperId as string].levels[levelUpperId as string] ||
				!ALL_UPPERAIR_SECTORS[siteUpperId as string].levels[levelUpperId as string].products[productUpperId as string])
		) {
			console.log('upper air route attempt from undefined parms')
			router.push(
				`/weather-data/analysis/upper-air/${UPPERAIR_LEVEL_DEFAULT}/${UPPERAIR_PRODUCT_DEFAULT}/${UPPERAIR_REGION_DEFAULT}/${UPPERAIR_SECTOR_DEFAULT}`,
			)
		}
	}, [siteUpperId, regionUpperId, levelUpperId, productUpperId, router, isActive])

	const handleSectorChange = (newSectorId) => {
		console.log('upper air route attempt from sector change')
		router.push(`/weather-data/analysis/upper-air/${levelUpperId}/${productUpperId}/${regionUpperId}/${newSectorId}`)
		setUpperAirSite(newSectorId)
	}

	const sectorOptions = useMemo(() => {
		return Object.keys(ALL_UPPERAIR_SECTORS).map((sectorId) => {
			return { value: sectorId, label: ALL_UPPERAIR_SECTORS[sectorId].name }
		})
	}, [])

	const productsArray = useMemo(() => {
		if (ALL_UPPERAIR_SECTORS[siteUpperId as string]) {
			return Object.keys(ALL_UPPERAIR_SECTORS[siteUpperId as string].levels).map((levelId) => {
				const thisLevel = ALL_UPPERAIR_SECTORS[siteUpperId as string].levels[levelId]
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
		}
		return []
	}, [siteUpperId])
	return (
		<div className={styles.UpperAirPanel}>
			<SidebarSectionHeader name="Upper Air Maps" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={siteUpperId} options={sectorOptions} onChange={handleSectorChange} />
				</div>
				{productsArray.map(({ levelId, label, columns, products }) => (
					<SidebarGroup key={levelId} title={label}>
						<SidebarGrid columns={columns}>
							{products.map(({ productId, label }) => (
								<SidebarLink
									key={productId}
									name={label}
									linkUrl={`/weather-data/analysis/upper-air/${levelId}/${productId}/${regionUpperId}/${siteUpperId}`}
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
