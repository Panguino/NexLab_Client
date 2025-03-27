'use client'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { ALL_UPPERAIR_PRODUCTS } from '@/data/analysis/upper-air/products'
import { ALL_UPPERAIR_SECTORS } from '@/data/analysis/upper-air/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'

import Select from '@/components/elements/Select/Select'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import styles from './UpperAirPanel.module.scss'

interface UpperAirPanelProps {
	basepath: string
}

export const UpperAirPanel = ({ basepath }: UpperAirPanelProps) => {
	const router = useRouter()
	const setUpperAirSite = useRootStore.use.setUpperAirSite()
	const { levelId, productId, siteId, regionId } = useParams()

	const handleSectorChange = (newSectorId) => {
		router.push(`/weather-data/analysis/upper-air/${levelId}/${productId}/${regionId}/${newSectorId}`)
		setUpperAirSite(newSectorId)
	}

	const sectorOptions = Object.keys(ALL_UPPERAIR_SECTORS).map((sectorId) => {
		return { value: sectorId, label: ALL_UPPERAIR_SECTORS[sectorId].name }
	})

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
					<Select value={siteId} options={sectorOptions} onChange={handleSectorChange} />
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
