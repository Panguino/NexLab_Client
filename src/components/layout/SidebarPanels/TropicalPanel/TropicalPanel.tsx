'use client'

import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { TROPICAL_PRODUCTS } from '@/data/text/tropical/products'
import { useCallback, useState } from 'react'
import styles from './TropicalPanel.module.scss'

interface TropicalPanelProps {
	basepath: string
}

const TropicalPanel = ({ basepath }: TropicalPanelProps) => {
	const [selectedStorm, setSelectedStorm] = useState<string | null>(null)

	const handleProductClick = useCallback((productKey: string, productName: string) => {
		console.log(`Tropical product clicked: ${productKey} - ${productName}`)
	}, [])

	const handleStormProductClick = useCallback((productKey: string, productName: string, stormId: string) => {
		console.log(`Storm-specific product clicked: ${productKey} - ${productName} for storm: ${stormId}`)
	}, [])

	const handleStormChange = useCallback((stormValue: string) => {
		console.log(`Storm selected: ${stormValue}`)
		setSelectedStorm(stormValue)
	}, [])

	// Filter products that don't require a storm
	const basinProducts = Object.entries(TROPICAL_PRODUCTS)
		.filter(([, product]) => !product.requiresStorm)
		.map(([key, product]) => ({ key, ...product }))

	// Filter products that require a storm
	const stormProducts = Object.entries(TROPICAL_PRODUCTS)
		.filter(([, product]) => product.requiresStorm)
		.map(([key, product]) => ({ key, ...product }))

	// Mock storm options - will be fetched later
	const stormOptions = [
		{ label: 'Storm One', value: 'st1' },
		{ label: 'Storm Two', value: 'st2' },
	]

	return (
		<>
			<SidebarSectionHeader name="Tropical" linkUrl={basepath} />
			<SidebarPanelPad>
				<div className={styles.productsGroup}>
					<div className={styles.sectionTitle}>General Products</div>
					{basinProducts.map((product) => (
						<SidebarLink key={product.key} name={product.name} linkUrl="" onClick={() => handleProductClick(product.key, product.name)} />
					))}
				</div>

				<div className={styles.stormSelector}>
					<Select value={selectedStorm} options={stormOptions} onChange={handleStormChange} placeholder="Select Active Storm" />
				</div>

				{selectedStorm && (
					<div className={styles.productsGroup}>
						<div className={styles.sectionTitle}>Storm Products</div>
						{stormProducts.map((product) => (
							<SidebarLink
								key={product.key}
								name={product.name}
								linkUrl=""
								onClick={() => handleStormProductClick(product.key, product.name, selectedStorm)}
							/>
						))}
					</div>
				)}
			</SidebarPanelPad>
		</>
	)
}

export default TropicalPanel
