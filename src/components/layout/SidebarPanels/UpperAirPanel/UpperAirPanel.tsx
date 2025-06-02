'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_UPPERAIR_PRODUCTS, UPPERAIR_PRODUCT_DEFAULT } from '@/data/analysis/upper-air/products'
import { ALL_UPPERAIR_SECTORS, UPPERAIR_SECTOR_DEFAULT } from '@/data/analysis/upper-air/sectors'
import { useParams, useRouter } from 'next/navigation'

import Select from '@/components/elements/Select/Select'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { UPPERAIR_LEVEL_DEFAULT } from '@/data/analysis/upper-air/levels'
import { ALL_UPPERAIR_REGIONS, UPPERAIR_REGION_DEFAULT } from '@/data/analysis/upper-air/regions'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useMemo } from 'react'
import styles from './UpperAirPanel.module.scss'

interface UpperAirPanelProps {
	basepath: string
	isActive?: boolean
}

export const UpperAirPanel = ({ basepath, isActive }: UpperAirPanelProps) => {
	const router = useRouter()
	const resetAnalysisZoomState = useRootStore.use.resetAnalysisZoomState()
	const {
		upperairLevelId: paramLevelId,
		upperairProductId: paramProductId,
		upperairSiteId: paramSiteId,
		upperairRegionId: paramRegionId,
	} = useParams()
	const siteId = paramSiteId ?? UPPERAIR_SECTOR_DEFAULT
	const regionId = paramRegionId ?? UPPERAIR_REGION_DEFAULT
	const levelId = paramLevelId ?? UPPERAIR_LEVEL_DEFAULT
	const productId = paramProductId ?? UPPERAIR_PRODUCT_DEFAULT

	useEffect(() => {
		if (
			isActive &&
			(!ALL_UPPERAIR_REGIONS[paramRegionId as string] ||
				!ALL_UPPERAIR_SECTORS[paramSiteId as string] ||
				!ALL_UPPERAIR_SECTORS[paramSiteId as string].levels[paramLevelId as string] ||
				!ALL_UPPERAIR_SECTORS[paramSiteId as string].levels[paramLevelId as string].products.includes(paramProductId as string))
		) {
			resetAnalysisZoomState()
			router.push(
				`/weather-data/analysis/upper-air/${UPPERAIR_LEVEL_DEFAULT}/${UPPERAIR_PRODUCT_DEFAULT}/${UPPERAIR_REGION_DEFAULT}/${UPPERAIR_SECTOR_DEFAULT}`,
			)
		}
	}, [paramLevelId, paramProductId, paramRegionId, paramSiteId, router, isActive, resetAnalysisZoomState])

	const handleSectorChange = (newSectorId) => {
		resetAnalysisZoomState()
		router.push(`/weather-data/analysis/upper-air/${levelId}/${productId}/${regionId}/${newSectorId}`)
	}

	const sectorOptions = useMemo(() => {
		return Object.keys(ALL_UPPERAIR_SECTORS).map((sectorId) => {
			return { value: sectorId, label: ALL_UPPERAIR_SECTORS[sectorId].name }
		})
	}, [])

	const productsArray = useMemo(() => {
		if (ALL_UPPERAIR_SECTORS[siteId as string]) {
			return Object.keys(ALL_UPPERAIR_SECTORS[siteId as string].levels).map((levelId) => {
				const thisLevel = ALL_UPPERAIR_SECTORS[siteId as string].levels[levelId]
				return {
					levelIdArr: levelId,
					label: thisLevel.label,
					columns: thisLevel.columns,
					products: thisLevel.products.map((productId) => ({
						productIdArr: productId,
						label: ALL_UPPERAIR_PRODUCTS[productId].label,
					})),
				}
			})
		}
		return []
	}, [siteId])
	return (
		<div className={styles.UpperAirPanel}>
			<SidebarSectionHeader name="Upper Air Maps" linkUrl={`${basepath}`} />
			<SidebarPanelPad>
				<div className={styles.options}>
					<Select value={siteId} options={sectorOptions} onChange={handleSectorChange} />
				</div>
				{productsArray.map(({ levelIdArr, label, columns, products }) => (
					<SidebarGroup key={levelIdArr} title={label}>
						<SidebarGrid columns={columns}>
							{products.map(({ productIdArr, label }) => (
								<SidebarLink
									key={productIdArr}
									name={label}
									active={productIdArr === productId && levelIdArr === levelId}
									linkUrl={`/weather-data/analysis/upper-air/${levelIdArr}/${productIdArr}/${regionId}/${siteId}`}
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
